import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      user {
        _id
      }
    }
  }
`;

export const ADD_DECK = gql`
  mutation AddDeck($name: String!, $description: String!, $userId: ID!) {
    addDeck(name: $name, description: $description, userId: $userId) {
      _id
      name
      createdBy {
        username
      }
    }
  }
`;
