const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
  }
});

module.exports = mongoose.model('User', User);
