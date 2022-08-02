import { gql } from "@apollo/client";

export const USER = gql`
    query getUser {
      user {
        _id
        username
        email
        ambitions {
          _id
          identity
          dailyPlan
          endValue
          category
          public
          daysCount
          events {
            createdAt
            dataInput
            notes
          }
        }
      }
    }
`;

export const USERNAME = gql`
    query getUsername {
      user {
        username
      }
    }
`;

export const CATEGORY_AMBITIONS = gql`
    query categoryAmbitions {
      categories {
        _id
        ambitionCategories
      }
    }
`;

export const CATEGORY_IDENTITIES = gql`
    query categoryIdentities {
      identities {
        _id
        identityCategories
      }
    }
`;

export const SEARCH_EVENTS = gql`
    query SearchEvents($ambitionId: ID!) {
      searchEvents(ambitionId: $ambitionId) {
        _id
        identity
        dailyPlan
        endValue
        category
        public
        daysCount
        events {
          createdAt
          dataInput
          notes
        }
      }
    }
`;

export const SEARCH_PUBLIC_AMBITIONS = gql`
    query SearchPublicAmbitions($public: Boolean!) {
      searchPublicAmbitions(public: $public) {
        _id
        identity
        endValue
        category
        public
        daysCount
          events {
            createdAt
            dataInput
          }
      }
    }
`;
