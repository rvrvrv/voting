/*jshint browser: true, esversion: 6*/
/* global $, console */

$(document).ready(() => {

	//***********************
	//Poll creation controls
	//***********************

	//Add an option to the new poll
	$('.btn-add').click(() => {
		$('.create-poll').append('<tr><th></th><td><input input type="text" name="choice" placeholder="New Choice"></td></tr>');
	});

	//Remove an option from the new poll
	$('.btn-rm').click(() => {
		//Ensure at least 2 options remain
		if ($('.create-poll tr').length >= 4)
			$('.create-poll tr:last').remove();
	});

	//Save the new poll
	$('.btn-save').click(() => {
		let pollArr = $('.newPoll').serializeArray();
		let pollObj = {
			creator: 'xxx', //TO DO: get user ID
			title: pollArr[0].value,
			choices: []
			};
		for (let i = 1; i < pollArr.length; i++) {
			pollObj.choices.push(pollArr[i].value);
		}
	});




});
