const { Schema, model } = require('mongoose');

const pollSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
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
        required: true,
      },
    voteNo: {
        type: Number,
        required: true,
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