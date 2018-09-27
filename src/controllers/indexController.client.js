(function () {
  const tablePolls = document.getElementsByClassName('table-polls')[0];
  const apiUrl = '/api/:id/load';

  // Retrieve and display all polls in DB
  function getAllPolls(data) {
    tablePolls.innerHTML = data.slice(1, -1);
  }

  // Automatically show all polls on index page
  ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getAllPolls));
}());
