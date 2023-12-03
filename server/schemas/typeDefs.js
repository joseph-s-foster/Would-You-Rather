const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    polls: [Poll!]
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Poll {
    id: ID!
    name: String!
    thisPoll: String!
    thatPoll: String!
    voteYes: Int!
    voteNo: Int!
    title: String!
    users: [User]
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
    getPolls: [Poll]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    createPoll(name: String!, thisPoll: String!, thatPoll: String!, title: String!): Poll
    voteOnPoll(pollId: ID!, option: String!, userId: ID!): Poll
    editPoll(pollId: ID!, name: String, thisPoll: String, thatPoll: String, title: String): Poll
    deletePoll(pollId: ID!): Poll
  }

`;

module.exports = typeDefs;
