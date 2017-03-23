/*jshint browser: true, esversion: 6*/
/* global $, alert, console, ajaxFunctions, Chart */
'use strict';

$(document).ready(() => {

   const pollId = window.location.pathname.slice(6);
   const apiUrl = '/api/:id/loadPoll/' + pollId;
   const ctx = $('#chart');


   //Display the poll as a chart
   function displayPoll(data) {
      let chartCode = JSON.parse(data);
      console.log(chartCode);
      //Paint the chart
      var chart = new Chart(ctx, chartCode);
      Chart.defaults.global.defaultFontSize = 14;
      Chart.defaults.global.hover.animationDuration = 800;
      Chart.defaults.global.elements.arc = 20;
      //Notify the user if no one has voted
      if (chartCode.data.datasets[0].data.every(e => e === 0))
         $('#noVotes').fadeIn();
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
   
   $('.btn-add').click(() => {
      console.log(window.localStorage.getItem('rv-voting-userId'));
   })
   
   
   

   //Upon page load, show the poll
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, displayPoll));
});
