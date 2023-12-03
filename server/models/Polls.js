const { Schema, model } = require('mongoose');

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
  voteYes: {
    type: Number,
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
});

const Polls = model('Polls', pollSchema);

module.exports = Polls;