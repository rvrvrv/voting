const mongoose = require('mongoose');
const { Schema } = mongoose;

const Poll = new Schema({
  creator: String,
  title: String,
  choices: [{
    text: String,
    votes: { type: Number, default: 0, isRequired: true }
  }]
});

module.exports = mongoose.model('Poll', Poll);
