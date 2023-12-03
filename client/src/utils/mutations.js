import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const VOTE_ON_POLL_MUTATION = gql`
  mutation VoteOnPoll($pollId: ID!, $option: String!, $userId: ID!) {
    voteOnPoll(pollId: $pollId, option: $option, userId: $userId) {
      id
      title
      thisPoll
      thatPoll
      voteYes
    }
  }
`;

export const CREATE_POLL_MUTATION = gql`
  mutation CreatePoll($thisPoll: String!, $thatPoll: String!, $title: String!) {
    createPoll(thisPoll: $thisPoll, thatPoll: $thatPoll, title: $title) {
      id
      title
      thisPoll
      thatPoll
    }
  }
`;

export const EDIT_POLL_MUTATION = gql`
mutation EditPoll($pollId: ID!, $thisPoll: String, $thatPoll: String, $title: String) {
  editPoll(pollId: $pollId, thisPoll: $thisPoll, thatPoll: $thatPoll, title: $title) {
    id
    title
    thisPoll
    thatPoll
  }
}

`;

export const DELETE_POLL_MUTATION = gql`
  mutation DeletePoll($pollId: ID!) {
    deletePoll(pollId: $pollId) {
      id
      title
    }
  }
`;
