'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function(req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/create')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/create.html');
		});

	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function(req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	//Single poll view page
	app.route('/poll/:pollId')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/poll.html');
		});
		
	//Single poll routes
	app.route('/api/:id/loadPoll/:pollId/:choice?')
		.get(function(req, res) { //Show one poll
			clickHandler.showPoll(req.params.pollId, res);
		})
		.post(function(req, res) { //Add option to poll
			clickHandler.addChoice(req.user.github.id, req.params.choice, res); 
		});

	//Load all polls on index page
	app.route('/api/:id/load')
		.get(isLoggedIn, clickHandler.getAllPolls);

	//User page routes
	app.route('/api/:id/loadOne/:del?')
		.get(isLoggedIn, clickHandler.getUserPolls) //Load one user's polls
		.post(isLoggedIn, clickHandler.createPoll) //Create a poll
		.delete(isLoggedIn, function(req, res) { //Delete a poll
			clickHandler.deletePoll(req.user.github.id, req.params.del, res);
		});

};
