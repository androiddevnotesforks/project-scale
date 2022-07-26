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
        user: User!
        public: Boolean!
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
        ambitions: [User]
        # ambitions: [Ambitions] # very likely cannot query ambitions directly now that it is a subdoc
    }

    type Mutation {
        # maybe I'll put in a mutation to update user...
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addIdentity(name: String!): User
        addAmbition(name: String!, timeLimit: Int!, category: Category!, user:User!, public: Boolean!): Identity # assuming we are referencing its nearest parent to save: Identity and not the top-level parent: User
        addCalendar(createdAt: String!, dataInput: Float!, notes: String): Ambitions # assuming we are referencing its nearest parent to save: Ambitions and not the top-level parent: User
        # plan for removing identity, ambitions and maybe calendar entries
    }
`;

module.exports = typeDefs;