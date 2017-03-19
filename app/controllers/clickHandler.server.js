'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler () {
	
	//Retrive and format all polls from DB
	this.getAllPolls = function (req, res) {
		console.log('Querying the database...');
		Polls
			.find({}, { title: 1 })
			.exec(function (err, result) {
				if (err) throw err;
				console.log('BEFORE: ' + result);
				let formattedOutput = '';
				result.forEach((e) => {
					formattedOutput += `<tr><td><a class='viewCtrl' href='${e._id}'><i class='fa fa-comments'></i>&nbsp;&nbsp;${e.title}</a></td></tr>`;
				});
				console.log('AFTER: ' + formattedOutput);
				res.json(formattedOutput);
			});
	};


	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) throw err;
					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) throw err;

					res.json(result.nbrClicks);
				}
			);
	};

	this.createPoll = function (req, res) {
		var newPoll = new Polls(req.body);
		newPoll
			.save()
			.then(function (err, result) {
				if (err) return res.json(err);
				console.log(result);
				return res.json(result);
			});
	}
}

module.exports = ClickHandler;

				