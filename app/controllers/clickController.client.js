'use strict';

(function () {

   //var pollBtn = document.querySelector('.viewCtrl');
   //var delBtn = '';
   var allPolls = document.querySelector('#allPolls');
   var apiUrl = appUrl + '/api/:id/load';

   //Retrieve and display all polls in DB
   function getAllPolls (data) {
     allPolls.innerHTML = data.slice(1,-1);
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getAllPolls));

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
