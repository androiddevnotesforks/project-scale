const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        # You don't want to display the password
        ambitions: [Ambitions]!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Category {
        _id: ID!
        identityCategories: String!
        ambitionCategories: String!
    }

    type Ambitions {
        _id: ID!
        name: String!
        identity: String!
        timeLimit: Int!
        category: ID!
        user: ID!
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
        categories: [Category]
        ambitions: [Ambitions]
    }

    type Mutation {
        # maybe I'll put in a mutation to update user...
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addAmbition(name: String!, identity: String! timeLimit: Int!, category: ID!): Ambitions
        addEvent(dataInput: Float!, notes: String): Ambitions # assuming we are referencing its nearest parent to save: Ambitions and not the top-level parent: User
        # plan for removing identity, ambitions and maybe calendar entries
    }
`;

module.exports = typeDefs;