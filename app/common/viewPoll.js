/*jshint browser: true, esversion: 6*/
/* global $, alert, console, localStorage */

$(document).ready(() => {

	//***********************
	//Poll view controls
	//***********************

	google.charts.load('current', {packages: ['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var data = google.visualization.arrayToDataTable([
			['Choices', 'Votes'],
			['Work', 3],
			['Eat', 6],
			['Play', 1],
			['Work', 3],
		]);

		var options = {
			title: 'My Daily Activities',
			animation: {
				'duration': 500,
				'easing': 'out',
				'startup': true
			},
			fontName: 'Roboto',
			fontSize: 20,
			is3D: true,
			colors: ['#aeffb2', '#317f35', '#8bcc8e',
				'#46627f', '#61adff', '#808efa',
				'#ffe2ae', '#ffc661', '#ff9d61'
			],
			pieSliceTextStyle: {
				color: '#000',
				fontSize: 22
			},
			pieHole: 0.5
		};

		var chart = new google.visualization.PieChart(document.getElementById('chart'));
		chart.draw(data, options);
	}


	// The select handler. Call the chart's getSelection() method
	function selectHandler() {
		var selectedItem = chart.getSelection()[0];
		if (selectedItem) {
			var value = data.getValue(selectedItem.row, selectedItem.column);
			alert('The user selected ' + value);
		}
	}

	// Listen for the 'select' event, and call my function selectHandler() when
	// the user selects something on the chart.
	google.visualization.events.addListener(chart, 'select', selectHandler);



});
