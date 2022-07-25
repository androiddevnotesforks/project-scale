const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        # don't want to display password
    }

    type Category {
        _id: ID!
        name: String!
    }

    type Ambitions {
        _id: ID!
        name: String!
        timeLimit: Int!
        category: Category!
        user: User!
    }

    type Query {
        user: User
        categories: [Category]
        ambitions: [Ambitions]
    }

    type Mutation {
        # maybe I'll put in a mutation to update user...
    }
`;

module.exports = typeDefs;