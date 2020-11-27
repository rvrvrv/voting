"use strict";$(document).ready(function(){//* **********************
// Poll creation controls
//* **********************
// Validate poll values
function a(a){// Then, check question for minimum length (4)
if(a.forEach(function(a){return a.value=a.value.trim()}),4>a[0].value.length)return alert("Please enter a valid poll question."),"fail";// Then, check choices for minimum length (1)
for(var b=1;b<a.length;b++)if(1>a[b].value.length)return alert("Poll choice ".concat(b," is invalid.")),"fail";// If question and choices are valid, return the trimmed array
return a}// Save poll to the database
function b(a){$.post("/api/:id/loadOne/",a).done(function(){$(".title-text").html("Poll Created!"),setTimeout(function(){return window.location.replace("/")},1500)}).fail(function(){alert("An error has occurred. Please try again."),$(".btn-save").prop("disabled",!1)})}// Add an option to the new poll
// Remove an option from the new poll
// Save the new poll
$(".btn-add").click(function(){$(".create-poll").append("<tr><th></th><td><input input type=\"text\" name=\"choice\" placeholder=\"New Choice\"></td></tr>")}),$(".btn-rm").click(function(){3<$(".create-poll tr").length&&$(".create-poll tr:last").remove()}),$(".btn-save").click(function(){$(".btn-save").prop("disabled",!0);var c=$(".newPoll").serializeArray();// First, validate user input
if(c=a(c),"fail"===c)return void $(".btn-save").prop("disabled",!1);// If valid, create the poll object
// Add all of the choices to the poll object
for(var d={creator:window.localStorage.getItem("rv-voting-userId"),title:c[0].value,choices:[]},e=1;e<c.length;e++)d.choices.push({text:c[e].value});// Then, save the poll
b(d)})});