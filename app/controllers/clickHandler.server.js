'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler () {
	

	this.getPolls = function (req, res) {
		console.log('getting');
		Polls
			.find({}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				res.json(result);
			});
	};


	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.createPoll = function (req, res) {
		console.log(req.body);
		var newPoll = new Polls(req.body);
		newPoll
			.save()
			.then(function (err, result) {
				if (err) throw err;
				console.log(result);
				res.json(result);
			});
	}
}

module.exports = ClickHandler;

				