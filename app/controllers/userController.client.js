/*jshint browser: true, esversion: 6*/
/* global $, alert, console, ajaxFunctions */
'use strict';

(function() {

	var profileUsername = document.querySelector('#profile-username') || null;
	var profileRepos = document.querySelector('#profile-repos') || null;
	var displayName = document.querySelector('#display-name');
	var apiUrl = '/api/:id';

	function updateHtmlElement(data, element, userProperty) {
		element.innerHTML = data[userProperty];
	}

	//When logging out, remove saved ID
	document.getElementById('logoutLink')
		.addEventListener('click', () => window.localStorage.removeItem('rv-voting-userId'));

	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
		//If user is logged in, display private menu and options
		if (data[0] !== '<') {
			$('.public').hide();
			$('.private').show();
			var userObject = JSON.parse(data);
			//Save logged-in ID for session
			window.localStorage.setItem('rv-voting-userId', userObject.id);
			//Display user info where applicable
			if (userObject.displayName) updateHtmlElement(userObject, displayName, 'displayName');
			else updateHtmlElement(userObject, displayName, 'username');
			if (profileUsername) updateHtmlElement(userObject, profileUsername, 'username');
			if (profileRepos) updateHtmlElement(userObject, profileRepos, 'publicRepos');
		}

	}));


})();
