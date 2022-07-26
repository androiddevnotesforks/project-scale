const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        # You don't want to display the password
        identity: [Identity]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Category {
        _id: ID!
        name: String!
    }

    type Identity {
        _id: ID!
        name: String!
        ambitions: [Ambitions]
    }

    type Ambitions {
        _id: ID!
        name: String!
        timeLimit: Int!
        category: Category!
        daysCount: Int
        calendar: [Calendar]
    }

    type Calendar {
        createdAt: String!
        dataInput: Float!
        notes: String
    }

    type Query {
        user: User
        categories: [Category]
        # ambitions: [Ambitions] # very likely cannot query ambitions directly now that it is a subdoc
    }

    type Mutation {
        # maybe I'll put in a mutation to update user...
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addIdentity(name: String!): User
        addAmbition(name: String!, timeLimit: Int!, category: Category!): User
        addCalendar(createdAt: String!, dataInput: Float!, notes: String): User
    }
`;

module.exports = typeDefs;