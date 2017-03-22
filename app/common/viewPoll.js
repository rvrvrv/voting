/*jshint browser: true, esversion: 6*/
/* global $, alert, console, localStorage */


$(document).ready(() => {

	//***********************
	//Display the poll
	//***********************

	google.charts.load('visualization', '1', {
		packages: ['corechart']
	});

	function drawChart() {
		let data = google.visualization.arrayToDataTable([
			['Choices', 'Votes'],
			['Work', 3],
			['Eat', 6],
			['Play', 1],
			['Work', 3],
		]);

		let options = {
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

		let chart = new google.visualization.PieChart(document.getElementById('chart'));
		chart.draw(data, options);
	}

	google.charts.setOnLoadCallback(drawChart);


});
