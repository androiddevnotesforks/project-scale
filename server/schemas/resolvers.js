const { User, Category } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { identity } = require("rxjs");

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

            const token = signToken(user); // creates a JWT and assigns it to the user
            return { user, token };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user); // creates a JWT and assigns it to the user

            return { user, token };
        },
        addIdentity: async (parent, { name }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { identity: { name } } }, // ensure object keys are the same
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        addAmbition: async (parent, { name, timeLimit, category }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { 
                        identity: { 
                            ambitions: { name, timeLimit, category } } } }, // ensure object keys are the same
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        addCalendar: async (parent, { createdAt, dataInput, notes }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { 
                        identity: { 
                            ambitions: { 
                                calendar: { createdAt, dataInput, notes } } } } }, // ensure object keys are the same
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError("Session expired, login again.");
        },

    },
};

module.exports = resolvers;
