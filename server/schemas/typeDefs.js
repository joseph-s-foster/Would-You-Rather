const typeDefs = `
  type User {
    _id: ID
    username: String
    password: String
    polls: [Poll!]
  }

  type Comment {
    _id: ID
    commentText: String
    username: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Poll {
    id: ID!
    thisPoll: String!
    thatPoll: String!
    voteOption1: String!
    voteOption2: String!
    title: String!
    users: [User]
    comments: [Comment]
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    getPolls: [Poll]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addComment(pollId: ID!, commentText: String!): Poll
    createPoll(thisPoll: String!, thatPoll: String!, title: String!): Poll
    voteOnPoll(pollId: ID!, option: String!, userId: ID!): Poll
    editPoll(pollId: ID!, thisPoll: String, thatPoll: String, title: String): Poll
    deletePoll(pollId: ID!): Poll
  }

`;

module.exports = typeDefs;
