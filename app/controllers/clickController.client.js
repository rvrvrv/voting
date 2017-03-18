'use strict';

(function () {
   var pollBtn = document.querySelector('.viewCtrl');
   var delBtn = '';
   var allPolls = document.querySelector('.all-Polls');
   var apiUrl = appUrl + '/api/:id/clicks';

   function getPolls (data) {
      console.log(data);


      allPolls.innerHTML = pollsObj;
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, getPolls));

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
