const { Schema, model } = require('mongoose');
const commentSchema = require('./Comments')
const pollSchema = new Schema({
  thisPoll: {
    type: String,
    required: true,
   unique: true,
  },
  thatPoll: {
    type: String,
    required: true,
    unique: true,
  },
  voteOption1: {
    type: Number,
    required: true,
    default: 0, // Set a default value
  },
  voteOption2: {
    type: Number,
    required: true,
    default: 0, // Set a default value
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    commentSchema
  ]
});

const Polls = model('Polls', pollSchema);

module.exports = Polls;