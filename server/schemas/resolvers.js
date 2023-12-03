// Reminder we can use "thoughts" for user comments on each poll. If we do return to the activity and 
// copy the thoughts.js file and put back in the models folder.
const { User, Thought, Polls } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
    getPolls: async () => Polls.find().populate('users'),
  },

  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

createPoll: async (_, { thisPoll, thatPoll, title }) => {
      const poll = new Polls({ thisPoll, thatPoll, title });
      await poll.save();
      return poll;
    },
  voteOnPoll: async (_, { pollId, option, userId }) => {
    const poll = await Polls.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    // Check if the user has already voted on this poll
    if (poll.users.includes(userId)) {
      throw new Error('User has already voted on this poll');
    }

    // If the user hasn't voted, proceed with the vote
    poll.users.push(userId);

    if (option === 'Yes') {
      poll.voteYes += 1;
    }

    await poll.save();

    return poll;
  },
  editPoll: async (_, { pollId, thisPoll, thatPoll, title }) => {

    try {
      const poll = await Polls.findById(pollId);
  
      if (!poll) {
        throw new Error('Poll not found');
      }
  
      // Update fields if provided
      if (thisPoll) poll.thisPoll = thisPoll;
      if (thatPoll) poll.thatPoll = thatPoll;
      if (title) poll.title = title;
  
      // Use the markModified() method to mark modified paths before saving
      poll.markModified('thisPoll');
      poll.markModified('thatPoll');
      poll.markModified('title');
  
      await poll.save();
  
      return poll;
    } catch (error) {
      console.error('Error updating poll:', error);
      throw error;
    }
  },
  deletePoll: async (_, { pollId }) => {
    const poll = await Polls.findByIdAndDelete(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    return poll;
  },
},
  Poll: {
    users: async (parent) => User.find({ _id: { $in: parent.users } }),
  }
};

module.exports = resolvers;
