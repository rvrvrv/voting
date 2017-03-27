/*jshint browser: true, esversion: 6*/
/* global $, alert, console, ajaxFunctions, Chart, location, localStorage */
'use strict';

$(document).ready(() => {
   const pollId = location.pathname.slice(6);
   const userId = localStorage.getItem('rv-voting-userId') || null;
   const apiUrl = '/api/:id/loadPoll/' + pollId;
   const ctx = $('#chart');
   let pollsVoted = localStorage.getItem(userId) || localStorage.getItem('anonVotes') || '';
   let chartCode = {};
   let chart;
   
   //Apply user's vote
   function vote(choice) {
      //Hide 'no one has voted yet' message (if visible)
      $('#noVotes').hide();
      
      //Add poll to localStorage (to prevent duplicate votes)
      pollsVoted += `|${pollId}`;
      if (userId) localStorage.setItem(userId, pollsVoted);
      else localStorage.setItem('anonVotes', pollsVoted);
      
      //Add vote to DB and reload chart
      ajaxFunctions.ajaxRequest('PUT', `${apiUrl}/${choice}`, function() {
         ajaxFunctions.ajaxRequest('GET', apiUrl, displayPoll);
      });
   }

   //Display the poll as a chart
   function displayPoll(data) {
      //If chart already exists, destroy it for new one
      if (chart) chart.destroy();
      
      //Extract chart data and options from JSON
      chartCode = JSON.parse(data);
      
      //Paint the chart
      chart = new Chart(ctx, chartCode);

      //Notify the user if no one has voted
      if (chartCode.data.datasets[0].data.every(e => e === 0))
         $('#noVotes').show();
         
      //Add choices to drop-down box
      $('#choices').html('');
      chartCode.data.labels.forEach(e => {
         $('#choices').append(`<option value="${e}">${e}</option>`);
      });
   }

   //Add a choice to the poll
   function addChoice(choice) {
      if (confirm('Please confirm you would like to add the following option:\n\n' +
            choice)) {
         ajaxFunctions.ajaxRequest('POST', `${apiUrl}/${choice}`, function() {
            ajaxFunctions.ajaxRequest('GET', apiUrl, displayPoll);
         });
      }
   }

   //Check for valid new choice
   function validateChoice(choice) {
      //Trim whitespace
      let formattedChoice = choice.trim();
      //Convert current choices to lower-case for comparison
      let lowerCaseArr = chartCode.data.labels.map(e => e.toLowerCase());

      //Check for blank / default / duplicate choice
      if (formattedChoice == '' || formattedChoice == 'Your choice' ||
         lowerCaseArr.includes(formattedChoice.toLowerCase()))
         return alert('Please enter a valid choice.');
      else return addChoice(formattedChoice);
   }

   //Button for adding a poll choice
   $('.btn-add').click(() => {
      //Ensure user is logged in
      if (userId)
         var newChoice = prompt(chartCode.options.title.text +
            '\n\nAdd a new choice below:', 'Your choice');
      //If input is not blank & user doesn't cancel, continue to validation
      if (newChoice) validateChoice(newChoice);

   });

   //Vote button
   $('.btn-vote').click(() => {
      let choice = $('#choices').val();

      //Duplicate vote check
      if (pollsVoted.includes(pollId)) 
         return alert('You have already voted on this poll.');

      //Confirm user's choice
      if (confirm('Please confirm your vote for: ' + choice))
         vote(choice);
   });

   //Upon page load, show the poll
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, displayPoll));
});
