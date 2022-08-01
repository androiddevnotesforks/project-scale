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
        username: async (parent, args, context) => { // requires resolver context and the use of the JWT to verify the user is using their account
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
        identities: async () => {
            return await Identity.find();
        },
        ambitions: async () => { // assuming it will find all public ambitions that are true
            return await Ambitions.find();
        },
        searchEvents: async (parent, { ambitionId }, context) => {
            return await Ambitions.findOne({
                _id: ambitionId
            });
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
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({username, email, password});
            const token = signToken(user); // creates a JWT and assigns it to the user

            return { user, token };
        },
        addAmbition: async (parent, { identity, category, dailyPlan, endValue }, context) => {
            if (context.user) {
                const createAmbition = await Ambitions.create(
                    { identity, category, dailyPlan, endValue }
                );
                    
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
        updateAmbition: async (parent, { ambitionId, identity, dailyPlan, endValue }, context) => {
            if (context.user) {
                const updateAmbition = await Ambitions.findOneAndUpdate(
                    { _id: ambitionId },
                    { $set: {
                        identity: identity, 
                        dailyPlan: dailyPlan, 
                        endValue: endValue,
                    }},
                    { new: true, runValidators: true }
                );
                return updateAmbition;
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        deleteAmbition: async (parent, { ambitionId }, context) => {
            if (context.user) {
                const ambition = await Ambitions.findOneAndDelete({
                    _id: ambitionId
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { ambitions: ambitionId }}
                );

                return ambition;
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        updateUser: async (parent, { username, email }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $set: {
                        username: username,
                        email: email,
                    }},
                    { new: true, runValidators: true }
                );
                return updateUser;
            }
            throw new AuthenticationError("Session expired, login again.");
        },
        deleteUser: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id}) // this needs to be done to get the ambitions ids
                
                await User.findOneAndDelete({ // putting const user at this method returns null making it not possible to delete the user's ambitions
                    _id: context.user._id
                });
                
                await Ambitions.deleteMany( // with const user = await User.findOne() the ambition ids belonging to the user can be retrieved to delete them from the database
                    { _id: { $in: user.ambitions } }
                );
                
                
                return user;
            }
            throw new AuthenticationError("Session expired, login again.");
        }, 
    },
};

module.exports = resolvers;
