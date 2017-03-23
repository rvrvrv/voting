/*jshint browser: true, esversion: 6*/
/* global $, alert, console, localStorage, ajaxFunctions */

'use strict';
let pollId = window.location.pathname.slice(6);
let apiUrl = '/api/:id/loadPoll/' + pollId;

//Retrieve and display one user's polls in DB
function displayPoll(data) {
   console.log(data);
   
   //$('#userPolls').html('<tr><th>Question</th><th>View</th><th>Delete</th></tr>'
     // + data.slice(1, -1));
}

//Add a choice to the poll
function addChoice(choice) {
   if (confirm('Please confirm you would like to add the following option:\n\n'
               + choice)) {
      ajaxFunctions.ajaxRequest('POST', `${apiUrl}/${choice}`, function() {
         ajaxFunctions.ajaxRequest('GET', apiUrl, displayPoll);
      });
   }
}

//Automatically show the poll
ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, displayPoll));
