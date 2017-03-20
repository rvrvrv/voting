'use strict';

(function () {

   var userPolls = document.querySelector('#userPolls');
   var apiUrl = '/api/:id/loadOne';

   //Retrieve and display one user's polls in DB
   function getUserPolls (data) {
     userPolls.innerHTML += data.slice(1,-1);
   }

   //Automatically show user's polls on profile page
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getUserPolls));
   
   
   // pollBtn.addEventListener('click', function () {
   //    console.log('clicked');
   //    ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
   //       ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
   //    });

   // }, false);

   // delBtn.addEventListener('click', function () {

   //    ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
   //       ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
   //    });

   // }, false);

})();
