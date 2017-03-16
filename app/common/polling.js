/*jshint browser: true, esversion: 6*/
/* global $, alert, console */

$(document).ready(() => {

	//***********************
	//Poll creation controls
	//***********************

	//Validate poll values
	function checkPoll(arr) {
		//First, trim whitespace
		arr.forEach(e => e.value = e.value.trim());
		//Then, check question for minimum length (4)
		if (arr[0].value.length < 4) {
			alert('Please enter a valid poll question.');
			return 'fail';
		}
		//Then, check choices for minimum length (1)
		else {
			for (let i = 1; i < arr.length; i++) {
				if (arr[i].value.length < 1) {
					alert(`Poll choice ${i} is invalid.`);
					return 'fail';
				}
			}
		}
		//If question and choices are valid, return the trimmed array
		return arr;
	}

	//Add an option to the new poll
	$('.btn-add').click(() => {
		$('.create-poll').append('<tr><th></th><td><input input type="text" name="choice" placeholder="New Choice"></td></tr>');
	});

	//Remove an option from the new poll
	$('.btn-rm').click(() => {
		//Ensure at least 2 options remain
		if ($('.create-poll tr').length > 3)
			$('.create-poll tr:last').remove();
	});

	//Save the new poll
	$('.btn-save').click(() => {
		let pollArr = $('.newPoll').serializeArray();
		//First, validate user input
		pollArr = checkPoll(pollArr);
		console.log(pollArr);
		if (pollArr === 'fail') return;
		//If valid, create the poll object
		let pollObj = {
			creator: 'xxx', //TO DO: get user ID
			title: pollArr[0].value,
			choices: []
		};
		//Add all of the choices to the poll object
		for (let i = 1; i < pollArr.length; i++) {
			pollObj.choices.push(pollArr[i].value);
		}
		console.log(pollObj);
	});


});
