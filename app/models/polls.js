'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	creator: String,
	title: String,
	choices: [{
		text: String,
<<<<<<< HEAD
		votes: { type: Number, default: 0, isRequired: true }
=======
		votes: Number
>>>>>>> 03c5911dd11d7362c697cba32262f63e9d675bfc
    }]
});

module.exports = mongoose.model('Poll', Poll);
