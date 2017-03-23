/*jshint browser: true, esversion: 6*/
/* global $, alert, console, localStorage, ajaxFunctions, Chart */

'use strict';
let pollId = window.location.pathname.slice(6);
let apiUrl = '/api/:id/loadPoll/' + pollId;

//Display the poll as a chart
function displayPoll(data) {
   var ctx = $('#chart');
   let chartCode = JSON.parse(data);
   console.log(chartCode);
   var chart = new Chart(ctx, chartCode);
   //Chart Configuration
   Chart.defaults.global.defaultFontSize = 14;
   Chart.defaults.global.hover.animationDuration = 800;
   Chart.defaults.global.elements.arc = 6;
   Chart.defaults.global.legend.onClick = (e, item) => {vote(e, item)};

}

function vote(e, item) {
   console.log(e, item);
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

//Automatically show the poll
ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, displayPoll));
