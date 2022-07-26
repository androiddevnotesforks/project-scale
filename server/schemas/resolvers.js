const { User, Category, Ambitions } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        user: async (parent, args, context) => { // requires resolver context and the use of the JWT to verify the user is using their account
            if (context.user) {
                return User.findOne({
                    _id: context.user._id
                })
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        categories: async () => {
            return await Category.find();
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
                    { name, identity, timeLimit, category, user: context.user._id }
                );

                return createAmbition;
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        addEvent: async (parent, { _id, dataInput, notes }, context) => {
            if (context.user) {
                const addEvent = await Ambitions.findOneAndUpdate(
                    { _id: _id },
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
