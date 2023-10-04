import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($username: String!, $password: String!, $icon: String!) {
    addUser(username: $username, password: $password, icon: $icon) {
      user {
        _id
        username
        icon
      }
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $username: String, $icon: String) {
    updateUser(username: $username, userId: $userId, icon: $icon) {
      user {
        _id
        username
        icon
      }
      token
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

export const UPDATE_DECK = gql`
  mutation UpdateDeck($name: String!, $description: String!, $deckId: ID!) {
    updateDeck(name: $name, description: $description, deckId: $deckId) {
      _id
      name
      description
    }
  }
`;

export const REMOVE_DECK = gql`
  mutation RemoveDeck($deckId: ID!) {
    removeDeck(deckId: $deckId) {
      _id
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($prompt: String!, $answer: String!, $deckId: ID!) {
    addCard(prompt: $prompt, answer: $answer, deckId: $deckId) {
      _id
      cards {
        answer
        prompt
      }
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation RemoveCard($cardId: ID!, $deckId: ID!) {
    removeCard(cardId: $cardId, deckId: $deckId) {
      _id
      name
      cards {
        answer
        prompt
      }
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard(
    $prompt: String!
    $answer: String!
    $cardId: ID!
    $deckId: ID!
  ) {
    updateCard(
      prompt: $prompt
      answer: $answer
      cardId: $cardId
      deckId: $deckId
    ) {
      _id
      cards {
        _id
        answer
        prompt
      }
    }
  }
`;

export const ADD_SCORE = gql`
  mutation AddScore($deckId: ID!, $score: Int!, $type: String!, $userId: ID!) {
    addScore(deckId: $deckId, score: $score, type: $type, userId: $userId) {
      _id
      name
      scores {
        _id
        score
        type
        user {
          username
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;
