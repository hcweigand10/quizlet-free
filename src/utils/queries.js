import { gql } from '@apollo/client';

export const QUERY_ALLDECKS = gql`
  {
    allDecks {
      _id
      name
    }
  }
`;

export const ALL_USERS = gql`
  {
    allUsers {
      _id
      username
    }
  }
`;
