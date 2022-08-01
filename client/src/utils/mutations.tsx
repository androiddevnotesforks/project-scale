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
    mutation UpdateAmbition($_id: ID!, $identity: String!, $dailyPlan: String!, $endValue: String!) {
      updateAmbition(_id: $_id, identity: $identity, dailyPlan: $dailyPlan, endValue: $endValue) {
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
    mutation DeleteAmbition($_id: ID!) {
      deleteAmbition(_id: $_id) {
        _id
      }
    }
`;