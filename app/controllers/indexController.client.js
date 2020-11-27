"use strict";(function(){// Retrieve and display all polls in DB
var a=document.getElementsByClassName("table-polls")[0];// Automatically show all polls on index page
ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET","/api/:id/load",function(b){a.innerHTML=b.slice(1,-1)}))})();