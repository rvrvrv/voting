'use strict';

(function () {

   var allPolls = document.querySelector('#allPolls');
   var apiUrl = '/api/:id/load';

   //Retrieve and display all polls in DB
   function getAllPolls (data) {
     allPolls.innerHTML = data.slice(1,-1);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getAllPolls));

})();
