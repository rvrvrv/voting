(function () {
  const profileUsername = document.querySelector('#profile-username') || null;
  const profileRepos = document.querySelector('#profile-repos') || null;
  const displayName = document.querySelector('#display-name');
  const apiUrl = '/api/:id';

  function updateHtmlElement(data, element, userProperty) {
    element.innerHTML = data[userProperty];
  }

  // When logging out, remove saved ID
  document
    .getElementById('logoutLink')
    .addEventListener('click', () => localStorage.removeItem('rv-voting-userId'));

  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, (data) => {
    // If user is logged in, display private menu and options
    if (data[0] !== '<') {
      $('.public').hide();
      $('.private').show();
      const userObject = JSON.parse(data);
      // Save logged-in ID for session
      localStorage.setItem('rv-voting-userId', userObject.id);
      // Display user info where applicable
      if (userObject.displayName) updateHtmlElement(userObject, displayName, 'displayName');
      else updateHtmlElement(userObject, displayName, 'username');
      if (profileUsername) updateHtmlElement(userObject, profileUsername, 'username');
      if (profileRepos) updateHtmlElement(userObject, profileRepos, 'publicRepos');
    }
  }));
}());
