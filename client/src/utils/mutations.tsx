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
    mutation AddAmbition($identity: String!, $category: String!, $dailyPlan: String!, $endValue: String!) {
      addAmbition(identity: $identity, category: $category, dailyPlan: $dailyPlan, endValue: $endValue) {
        _id
        identity
        category
        dailyPlan
        endValue
        public
      }
    }
`;

export const ADD_EVENT = gql`
    mutation AddEvent($ambitionId: ID!, $dataInput: Float!, $notes: String) {
      addEvent(ambitionId: $ambitionId, dataInput: $dataInput, notes: $notes) {
        daysCount
        events {
          createdAt
          dataInput
          notes
        }
      }
    }
`;

export const UPDATE_AMBITION = gql`
    mutation UpdateAmbition($ambitionId: ID!, $identity: String!, $dailyPlan: String!, $endValue: String!) {
      updateAmbition(ambitionId: $ambitionId, identity: $identity, dailyPlan: $dailyPlan, endValue: $endValue) {
        _id
        identity
        category
        dailyPlan
        endValue
        public
      }
    }
`;

export const DELETE_AMBITION = gql`
    mutation DeleteAmbition($ambitionId: ID!) {
      deleteAmbition(ambitionId: $ambitionId) {
        _id
      }
    }
`;

export const UPDATE_USER = gql`
      mutation UpdateUser($username: String!, $email: String!) {
        updateUser(username: $username, email: $email) {
        token
        user {
          _id
          username
          email
        }
      }
    }
`;

export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      _id
      username
      email
      ambitions {
        _id
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
      mutation ChangePassword($password: String!) {
        changePassword(password: $password) {
          token
          user {
            _id
            username
            email
          }
        }
      }
`;

export const UPDATE_PUBLIC_AMBITION = gql`
    mutation PublicAmbition($ambitionId: ID!, $public: Boolean!) {
      publicAmbition(ambitionId: $ambitionId, public: $public) {
        _id
        public
    }
  }
`;