"use strict";$(document).ready(function(){// Apply user's vote
function a(a){// Hide 'no one has voted yet' message (if visible)
// Add poll to localStorage (to prevent duplicate votes)
// Add vote to DB and reload chart
$(".no-votes").hide(),j+="|".concat(f),g?localStorage.setItem(g,j):localStorage.setItem("anonVotes",j),ajaxFunctions.ajaxRequest("PUT","".concat(h,"/").concat(a),function(){ajaxFunctions.ajaxRequest("GET",h,b)})}// Display the poll as a chart
function b(a){// Extract chart data and options from JSON
// Paint the chart
// Add choices to drop-down box
e&&e.destroy(),k=JSON.parse(a),e=new Chart(i,k),k.data.datasets[0].data.every(function(a){return 0===a})&&$(".no-votes").show(),$(".choices").html(""),k.data.labels.forEach(function(a){$(".choices").append("<option value=\"".concat(a,"\">").concat(a,"</option>"))})}// Add a choice to the poll
function c(a){confirm("Please confirm you would like to add the following option:\n\n".concat(a))&&ajaxFunctions.ajaxRequest("POST","".concat(h,"/").concat(a),function(){ajaxFunctions.ajaxRequest("GET",h,b)})}// Check for valid new choice
function d(a){// Trim whitespace
var b=a.trim(),d=k.data.labels.map(function(a){return a.toLowerCase()});// Convert current choices to lower-case for comparison
// Check for blank / default / duplicate choice
return""===b||"Your choice"===b||d.includes(b.toLowerCase())?alert("Please enter a valid choice."):c(b)}// Button for adding a poll choice
var e,f=location.pathname.slice(6),g=localStorage.getItem("rv-voting-userId")||null,h="/api/:id/loadPoll/".concat(f),i=$("#chart"),j=localStorage.getItem(g)||localStorage.getItem("anonVotes")||"",k={};// Vote button
// Upon page load, show the poll
$("#addChoiceBtn").click(function(){// Ensure user is logged in
var a=g?prompt("".concat(k.options.title.text,"\n\nAdd a new choice below:"),"Your choice"):null;// If input is not blank & user doesn't cancel, continue to validation
a&&d(a)}),$("#voteBtn").click(function(){var b=$(".choices").val();// Duplicate vote check
return j.includes(f)?alert("You have already voted on this poll."):confirm("Please confirm your vote for: ".concat(b))?a(b):void 0;// Confirm user's choice
}),ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET",h,b))});