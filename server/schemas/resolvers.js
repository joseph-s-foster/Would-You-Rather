// Reminder we can use "thoughts" for user comments on each poll. If we do return to the activity and 
// copy the thoughts.js file and put back in the models folder.
const { User, Polls } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('polls');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('polls');
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('polls');
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

    addComment: async (parent, { pollId, commentText }, context) => {
      if (context.user) {
        return Polls.findOneAndUpdate(
          { _id: pollId },
          {
            $addToSet: {
              comments: { commentText, username: context.user.username },
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

    createPoll: async (_, args, context) => {
      if (context.user) {
        const poll = await Polls.create ( args );
        console.log(poll)
        const user = await User.findOneAndUpdate({ _id: context.user._id }, {
          $push: { polls: poll._id }
        }, {
          new: true
        })
        return poll;
      }
      throw AuthenticationError;

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

      if (option === 'Option1') {
        poll.voteOption1 += 1;
      } else if (option === 'Option2') {
        poll.voteOption2 += 1;
      }

      await poll.save();

      return poll;
    },
    editPoll: async (_, { pollId, title }) => {

      try {
        const poll = await Polls.findById(pollId);

        if (!poll) {
          throw new Error('Poll not found');
        }

        // Update fields if provided
        
        if (title) poll.title = title;

        // Use the markModified() method to mark modified paths before saving
        
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
