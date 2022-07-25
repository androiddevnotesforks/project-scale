const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        email: String
        # don't want to display password
    }

    type Category {
        _id: ID
        name: String
    }

    type Query {
        user: User
        categories: [Category]
    }

    type Mutation {
        # maybe I'll put in a mutation to update user...
    }
`;

module.exports = typeDefs;