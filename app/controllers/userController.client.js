'use strict';

(function () {

	var profileUsername = document.querySelector('#profile-username') || null;
	var profileRepos = document.querySelector('#profile-repos') || null;
	var displayName = document.querySelector('#display-name');
	var apiUrl = '/api/:id';

	function updateHtmlElement(data, element, userProperty) {
		element.innerHTML = data[userProperty];
	}

	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
		var userObject = JSON.parse(data);
		localStorage.setItem('userId', userObject.id); //Save logged-in ID for session

		if (userObject.displayName) updateHtmlElement(userObject, displayName, 'displayName');
		else updateHtmlElement(userObject, displayName, 'username');

		if (profileUsername) updateHtmlElement(userObject, profileUsername, 'username');

		if (profileRepos) updateHtmlElement(userObject, profileRepos, 'publicRepos');

	}));
})();

