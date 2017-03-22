/*jshint browser: true, esversion: 6*/
/* global $, alert, console, localStorage */

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

	//Save poll to the database
	function savePoll(obj) {
		$.post('/api/:id/create', obj)
			.done(() => {
				$('.title-text').html('Poll Created!');
				setTimeout(() => window.location.replace('/'), 1500);
			})
			.fail(() => {
				alert('An error has occurred. Please try again.');
				$('.btn-save').prop('disabled', false);
			});
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
		$('.btn-save').prop('disabled', true);
		let pollArr = $('.newPoll').serializeArray();
		//First, validate user input
		pollArr = checkPoll(pollArr);
		if (pollArr === 'fail') {
			$('.btn-save').prop('disabled', false);
			return;
		}
		//If valid, create the poll object
		let pollObj = {
			creator: localStorage.getItem('userId'),
			title: pollArr[0].value,
			choices: []
		};
		//Add all of the choices to the poll object
		for (let i = 1; i < pollArr.length; i++) {
			pollObj.choices.push({
				text: pollArr[i].value
			});
		}
		//Then, save the poll
		savePoll(pollObj);
	});

});
