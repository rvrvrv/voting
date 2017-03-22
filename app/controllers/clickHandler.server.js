'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler() {

	//Retrieve and format all polls from DB
	this.getAllPolls = function(req, res) {
		Polls
			.find({}, {
				title: 1
			})
			.exec(function(err, result) {
				if (err) throw err;
				let formattedOutput = '';
				result.forEach((e) => {
					formattedOutput += `<tr><td><a class='viewCtrl' href='/api/poll/${e._id}'><i class='fa fa-comments'></i>&nbsp;&nbsp;${e.title}</a></td></tr>`;
				});
				res.json(formattedOutput);
			});
	};

	//Retrieve and format one user's polls from DB
	this.getUserPolls = function(req, res) {
		Polls
			.find({
				creator: req.user.github.id
			}, {
				title: 1
			})
			.exec(function(err, result) {
				if (err) throw err;
				let formattedOutput = '';
				result.forEach((e) => {
					formattedOutput += `<tr><td>${e.title}</td><td><a class='viewCtrl' href='/api/poll/${e._id}'><i class='fa fa-2x fa-eye'></i></a></td><td><a class='delCtrl' id='${e._id}' href='javascript:;' onclick='tryDel(this)'><i class='fa fa-2x fa-minus-circle'></i></button></td></tr>`;
				});
				res.json(formattedOutput);
			});
	};

	//Create a poll in the DB
	this.createPoll = function(req, res) {
		var newPoll = new Polls(req.body);
		newPoll
			.save()
			.then(function(err, result) {
				if (err) return res.json(err);
				return res.json(result);
			});
	};

	//Delete a poll in the DB
	this.deletePoll = function(reqUser, reqPollId, res) {
		Polls
			.remove({
				creator: reqUser,
				_id: reqPollId
			})
			.exec(function(err, result) {
				if (err) throw err;
				res.json(result);
			});

	};

	//Display one poll
	this.showPoll = function(reqPollId, res) {
		console.log(reqPollId);
		Polls
			.find({
				_id: reqPollId
			})
			.exec(function (err, result) {
				if (err) throw err;
				let formattedOutput = result;
				console.log(formattedOutput);
				res.json(formattedOutput);
			});
	};

	this.addClick = function(req, res) {
		Users
			.findOneAndUpdate({
				'github.id': req.user.github.id
			}, {
				$inc: {
					'nbrClicks.clicks': 1
				}
			})
			.exec(function(err, result) {
				if (err) throw err;
				res.json(result.nbrClicks);
			});
	};

}

module.exports = ClickHandler;
