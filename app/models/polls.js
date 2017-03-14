'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	creator: String,
	title: String,
    choices: [{
        text: String,
        votes: Number
    }]
});

module.exports = mongoose.model('Poll', Poll);
