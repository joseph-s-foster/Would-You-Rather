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