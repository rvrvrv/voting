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
   
   
   
   window.onload=function(){
   var delCtrl = document.querySelectorAll('.delCtrl');
   console.log(delCtrl);
   //delCtrl.addEventListener('click', tryDelete);
   }

   function tryDelete () {
      console.log('clicked');
      //ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
      //   ajaxFunctions.ajaxRequest('GET', apiUrl, getUserPolls);
      //});
   }

})();
