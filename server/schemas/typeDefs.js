const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        # You don't want to display the password
        ambitions: [Ambitions]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Category {
        _id: ID!
        ambitionCategories: String
    }

    type Identity {
        _id: ID!
        identityCategories: String
    }

    type Ambitions {
        _id: ID!
        identity: String!
        dailyPlan: String!
        endValue: String!
        category: String!
        public: Boolean
        daysCount: Int
        events: [Events]!
    }

    type Events {
        createdAt: String!
        dataInput: Float!
        notes: String
    }

    type Query {
        user: User
        username: User
        categories: [Category]
        identities: [Identity]
        ambitions: [Ambitions]
        searchEvents(ambitionId: ID!): Ambitions
    }

    type Mutation {
        # maybe I'll put in a mutation to update user...
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        # addAmbition(identity: ID!, timeLimit: Int!, category: ID!): Ambitions
        addAmbition(identity: String!, category: String!, dailyPlan: String!, endValue: String!): Ambitions
        addEvent(ambitionId: ID!, dataInput: Float!, notes: String): Ambitions # assuming we are referencing its nearest parent to save: Ambitions and not the top-level parent: User
        # plan for removing identity, ambitions and maybe calendar entries
    }
`;

module.exports = typeDefs;