const { User, Category, Ambitions, Identity } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        user: async (parent, args, context) => { // requires resolver context and the use of the JWT to verify the user is using their account
            if (context.user) {
                return User.findOne({
                    _id: context.user._id
                }).populate("ambitions");
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        categories: async () => {
            return await Category.find();
        },
        identities: async () => {
            return await Identity.find();
        },
        ambitions: async () => { // assuming it will find all public ambitions that are true
            return await Ambitions.find()
        }
        // will have to consider querying ambitions when displaying them publicly
        // see redux store for reference: products
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Invalid credentials");
            };

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Invalid credentials");
            };
            console.log(user);
            const token = signToken(user); // creates a JWT and assigns it to the user
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user); // creates a JWT and assigns it to the user

            return { user, token };
        },
        addAmbition: async (parent, { name, identity, timeLimit, category }, context) => {
            if (context.user) {
                const createAmbition = await Ambitions.create(
                    { identity, timeLimit, category }
                );
                    console.log(createAmbition);
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { ambitions: createAmbition._id } }
                  );

                return createAmbition;
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        addEvent: async (parent, { ambitionId, dataInput, notes }, context) => {
            if (context.user) {
                const addEvent = await Ambitions.findOneAndUpdate(
                    { _id: ambitionId },
                    { $addToSet: {
                        events: { dataInput, notes },
                        },
                    },
                    { new: true, runValidators: true }
                );

                return addEvent;
            }
            throw new AuthenticationError("Session expired, login again.");
        },

    },
};

module.exports = resolvers;
