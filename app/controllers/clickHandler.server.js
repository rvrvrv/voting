'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler() {

	//Retrieve and format all polls from DB
	this.getAllPolls = function(req, res) {
		Polls
			.find({}, {
				'title': 1
			})
			.exec(function(err, result) {
				if (err) throw err;
				let formattedOutput = '';
				result.forEach((e) => {
					formattedOutput += `<tr><td><a class='viewCtrl' href='/poll/${e._id}'><i class='fa fa-comments'></i>&nbsp;&nbsp;${e.title}</a></td></tr>`;
				});
				res.json(formattedOutput);
			});
	};

	//Retrieve and format one user's polls from DB
	this.getUserPolls = function(req, res) {
		Polls
			.find({
				'creator': req.user.github.id
			}, {
				'title': 1
			})
			.exec(function(err, result) {
				if (err) throw err;
				let formattedOutput = '';
				result.forEach((e) => {
					formattedOutput += `<tr><td>${e.title}</td><td><a class='viewCtrl' href='/poll/${e._id}'><i class='fa fa-2x fa-eye'></i></a></td><td><a class='delCtrl' id='${e._id}' href='javascript:;' onclick='tryDel(this)'><i class='fa fa-2x fa-minus-circle'></i></button></td></tr>`;
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
				'creator': reqUser,
				'_id': reqPollId
			})
			.exec(function(err, result) {
				if (err) throw err;
				res.json(result);
			});

	};

	//Display one poll
	this.showPoll = function(reqPollId, res) {
		Polls
			.find({
				_id: reqPollId
			}, {
				'_id': 0,
				'__v': 0,
				'creator': 0,
				'choices._id': 0
			})
			.exec(function(err, result) {
				//Extract data from results
				let choices = [];
				let votes = [];
				result[0].choices.forEach((e) => {
					choices.push(e.text);
					votes.push(e.votes);
				});
				//Format data for chart
				let chartCode = {
					type: 'pie',
					data: {
						labels: choices,
						datasets: [{
							data: votes,
							backgroundColor: ['#aeffb2', '#46627f', '#9083e8',
								'#ffe2ae', '#317f35', '#61adff', '#ffc661',
								'#8bcc8e', '#808efa', '#ff9d61', '#aeffb2', 
								'#46627f', '#9083e8', '#ffe2ae', '#317f35', 
								'#61adff', '#ffc661', '#8bcc8e', '#808efa'
							]
						}]
					},
					options: {
						title: {
							display: true,
							fontSize: 22,
							fontColor: '#a03',
							text: result[0].title
						}
					}
				};

				if (err) throw err;
				res.json(chartCode);
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
