import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const GET_POLLS_QUERY = gql`
  query GetPolls {
    getPolls {
      id
      title
      thisPoll
      thatPoll
      voteOption1
      voteOption2
    }
  }
`;

export const QUERYME = gql`
query Me {
  me {
    _id
    username
    password
    polls {
      id
      thisPoll
      thatPoll
      voteOption1
      voteOption2
      title
      users {
        _id
      }
      comments {
        _id
        commentText
        username
        createdAt
      }
    }
  }
}
`;