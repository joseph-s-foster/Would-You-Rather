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

export const CREATE_POLL = gql`
mutation CreatePoll($thisPoll: String!, $thatPoll: String!, $title: String!) {
  createPoll(thisPoll: $thisPoll, thatPoll: $thatPoll, title: $title) {
    id
    thisPoll
    thatPoll
    voteOption1
    voteOption2
    title
    users {
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
      }
    }
    comments {
      _id
      commentText
      username
      createdAt
    }
  }
}`
;
// export const EDIT_POLL = gql`
//   mutation EditPoll(
//     $pollId: ID!
//     $thisPoll: String
//     $thatPoll: String
//     $title: String
//   ) {
//     editPoll(
//       pollId: $pollId
//       thisPoll: $thisPoll
//       thatPoll: $thatPoll
//       title: $title
//     ) {
//       id
//       thisPoll
//       thatPoll
//       voteOption1
//       voteOption2
//       title
//       users {
//         _id
//         username
//         password
//         polls {
//           id
//           thisPoll
//           thatPoll
//           voteOption1
//           voteOption2
//           title
//         }
//       }
//       comments {
//         _id
//         commentText
//         username
//         createdAt
//       }
//     }
//   }
// `;

export const ADD_COMMENT = gql`
mutation AddComment($pollId: ID!, $commentText: String!) {
  addComment(pollId: $pollId, commentText: $commentText) {
    thisPoll
    thatPoll
    voteOption1
    voteOption2
    title
    users {
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
      }
    }
    comments {
      _id
      commentText
      username
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
      voteOption1
      voteOption2
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
