import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
        }
      }
    }
`;

export const ADD_AMBITION = gql`
    mutation AddAmbition($identity: ID!, $timeLimit: Int!, $category: ID!) {
      addAmbition(identity: $identity, timeLimit: $timeLimit, category: $category) {
        _id
        identity
        timeLimit
        category
        public
      }
    }
`;

export const ADD_EVENT = gql`
    mutation AddEvent($ambitionId: ID!, $dataInput: Float!) {
      addEvent(ambitionId: $ambitionId, dataInput: $dataInput) {
        daysCount
        events {
          createdAt
          dataInput
          notes
        }
      }
    }
`;