/*jshint browser: true, esversion: 6*/
/* global $, alert, console, localStorage, ajaxFunctions */

'use strict';
var apiUrl = '/api/:id/loadPoll';

//Retrieve and display one user's polls in DB
function displaythePoll(data) {
   $('#userPolls').html('<tr><th>Question</th><th>View</th><th>Delete</th></tr>'
      + data.slice(1, -1));
}

//Delete a poll (from the profile page)
function tryDel(link) {
   if (confirm('Are you sure you want to delete that poll?')) {
      ajaxFunctions.ajaxRequest('DELETE', `${apiUrl}/${link.id}`, function() {
         ajaxFunctions.ajaxRequest('GET', apiUrl, displayUserPolls);
      });
   }
}

//Automatically show user's polls on profile page
ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, displaythePoll));
