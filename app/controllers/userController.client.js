'use strict';

(function () {

	var profileUsername = document.querySelector('#profile-username') || null;
	var profileRepos = document.querySelector('#profile-repos') || null;
	var displayName = document.querySelector('#display-name');
	var apiUrl = appUrl + '/api/:id';

	function updateHtmlElement(data, element, userProperty) {
		element.innerHTML = data[userProperty];
	}

	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
		var userObject = JSON.parse(data);

<<<<<<< HEAD
		localStorage.setItem('id', userObject.id); //Save logged-in ID for session

=======
>>>>>>> 03c5911dd11d7362c697cba32262f63e9d675bfc
		if (userObject.displayName) updateHtmlElement(userObject, displayName, 'displayName');
		else updateHtmlElement(userObject, displayName, 'username');

		if (profileUsername) updateHtmlElement(userObject, profileUsername, 'username');

		if (profileRepos) updateHtmlElement(userObject, profileRepos, 'publicRepos');

	}));
})();

