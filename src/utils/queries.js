import { gql } from '@apollo/client';

export const ALL_DECKS = gql`
  {
    allDecks {
      _id
      name
      cardCount
      description
      createdBy {
        username
        _id
      }
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

export const PROFILE = gql`
query Profile($userId: ID!) {
  profile(userId: $userId) {
    user {
      _id
      username
      icon
    }
    decks {
      _id
      name
      cardCount
      description
    }
    scoreReports {
      _id
      name
      scores {
        user {
          username
        }
        score
      }
    }
  }
}
`;

export const ME = gql`
query Me {
  me {
    user {
      _id
      username
    }
    decks {
      name
    }
  }
}
`;

export const DECK = gql`
query Deck($deckId: ID!) {
  deck(deckId: $deckId) {
    _id
    name
    description
    cards {
      _id
      answer
      prompt
    }
    createdBy {
      username
      _id
    }
    scores {
      score
      type
      user {
        username
        icon
      }
    }
  }
}
`
