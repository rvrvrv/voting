'use strict';$(document).ready(function(){function a(a){$('.no-votes').hide(),i+='|'+e,f?localStorage.setItem(f,i):localStorage.setItem('anonVotes',i),ajaxFunctions.ajaxRequest('PUT',g+'/'+a,function(){ajaxFunctions.ajaxRequest('GET',g,b)})}function b(a){k&&k.destroy(),j=JSON.parse(a),k=new Chart(h,j),j.data.datasets[0].data.every(function(a){return 0===a})&&$('.no-votes').show(),$('.choices').html(''),j.data.labels.forEach(function(a){$('.choices').append('<option value="'+a+'">'+a+'</option>')})}function c(a){confirm('Please confirm you would like to add the following option:\n\n'+a)&&ajaxFunctions.ajaxRequest('POST',g+'/'+a,function(){ajaxFunctions.ajaxRequest('GET',g,b)})}function d(a){var b=a.trim(),d=j.data.labels.map(function(a){return a.toLowerCase()});return''===b||'Your choice'===b||d.includes(b.toLowerCase())?alert('Please enter a valid choice.'):c(b)}var e=location.pathname.slice(6),f=localStorage.getItem('rv-voting-userId')||null,g='/api/:id/loadPoll/'+e,h=$('#chart'),i=localStorage.getItem(f)||localStorage.getItem('anonVotes')||'',j={},k=void 0;$('#addChoiceBtn').click(function(){var a=f?prompt(j.options.title.text+'\n\nAdd a new choice below:','Your choice'):null;a&&d(a)}),$('#voteBtn').click(function(){var b=$('.choices').val();return i.includes(e)?alert('You have already voted on this poll.'):confirm('Please confirm your vote for: '+b)?a(b):void 0}),ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET',g,b))});