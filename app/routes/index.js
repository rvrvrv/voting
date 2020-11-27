"use strict";var path=process.cwd(),ClickHandler=require("".concat(path,"/app/controllers/clickHandler.server.js"));module.exports=function(a,b){function c(a,b,c){return a.isAuthenticated()?c():b.redirect("/login")}var d=new ClickHandler;// Single poll view page
// Single poll routes
// Load all polls on login & index pages
// Logged-in user poll operations
a.route("/").get(c,function(a,b){return b.sendFile("".concat(path,"/public/index.html"))}),a.route("/create").get(c,function(a,b){return b.sendFile("".concat(path,"/public/create.html"))}),a.route("/profile").get(c,function(a,b){return b.sendFile("".concat(path,"/public/profile.html"))}),a.route("/api/:id").get(c,function(a,b){return b.json(a.user.github)}),a.route("/login").get(function(a,b){return b.sendFile("".concat(path,"/public/login.html"))}),a.route("/logout").get(function(a,b){a.logout(),b.redirect("/login")}),a.route("/auth/github").get(b.authenticate("github")),a.route("/auth/github/callback").get(b.authenticate("github",{successRedirect:"/",failureRedirect:"/login"})),a.route("/poll/:pollId").get(function(a,b){return b.sendFile("".concat(path,"/public/poll.html"))}),a.route("/api/:id/loadPoll/:pollId/:choice?").get(function(a,b){// Show one poll
d.showPoll(a.params.pollId,b)}).post(function(a,b){// Add option to poll
d.addChoice(a.params.pollId,a.params.choice,b)}).put(function(a,b){// Vote for option on poll
d.vote(a.params.pollId,a.params.choice,b)}),a.route("/api/:id/load").get(d.getAllPolls),a.route("/api/:id/loadOne/:del?").get(c,d.getUserPolls)// Load one user's polls
.post(c,d.createPoll)// Create a poll
.delete(c,function(a,b){// Delete a poll
d.deletePoll(a.user.github.id,a.params.del,b)})};