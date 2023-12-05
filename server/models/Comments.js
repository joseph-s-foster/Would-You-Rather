const { Schema, model } = require('mongoose');
const dateFormat = require ('../utils/dateFormat');
const commentSchema = new Schema({
  commentText: {
    type: String,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  username: {
    type: String,
  }


});


module.exports = commentSchema;