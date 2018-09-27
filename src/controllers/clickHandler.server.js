const Polls = require('../models/polls.js');

const randomColor = () => `#${Math.random().toString(16).substr(-6)}`;

function ClickHandler() {
  // Retrieve and format all polls from DB
  this.getAllPolls = (req, res) => {
    Polls
      .find({}, {
        title: 1
      })
      .exec((err, result) => {
        if (err) throw err;
        let formattedOutput = '';
        result.forEach((e) => {
          formattedOutput += `<tr><td><a class='ctrl-view' href='/poll/${e._id}'><i class='fa fa-comments'></i>&nbsp;&nbsp;${e.title}</a></td></tr>`;
        });
        res.json(formattedOutput);
      });
  };

  // Retrieve and format one user's polls from DB
  this.getUserPolls = (req, res) => {
    Polls
      .find({
        creator: req.user.github.id
      }, {
        title: 1
      })
      .exec((err, result) => {
        if (err) throw err;
        let formattedOutput = '';
        result.forEach((e) => {
          formattedOutput += `<tr><td>${e.title}</td><td><a class='ctrl-view' href='/poll/${e._id}'><i class='fa fa-2x fa-eye'></i></a></td><td><a class='ctrl-del' id='${e._id}' href='javascript:;' onclick='tryDel(this)'><i class='fa fa-2x fa-minus-circle'></i></button></td></tr>`;
        });
        res.json(formattedOutput);
      });
  };

  // Create a poll in the DB
  this.createPoll = (req, res) => {
    const newPoll = new Polls(req.body);
    newPoll
      .save()
      .then((err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      });
  };

  // Delete a poll in the DB
  this.deletePoll = (reqUser, reqPollId, res) => {
    Polls
      .remove({
        creator: reqUser,
        _id: reqPollId
      })
      .exec((err, result) => {
        if (err) throw err;
        res.json(result);
      });
  };

  // Add an option to one poll
  this.addChoice = (reqPollId, reqChoice, res) => {
    Polls
      .findOneAndUpdate({
        _id: reqPollId
      }, {
        $addToSet: {
          choices: {
            text: reqChoice,
            votes: 0
          }
        }
      })
      .exec((err, result) => {
        if (err) throw err;
        res.json(result);
      });
  };

  // Display one poll
  this.showPoll = (reqPollId, res) => {
    Polls
      .find({
        _id: reqPollId
      }, {
        _id: 0,
        __v: 0,
        creator: 0,
        'choices._id': 0
      })
      .exec((err, result) => {
        // Extract data from results
        const choices = [];
        const votes = [];
        result[0].choices.forEach((e) => {
          choices.push(e.text);
          votes.push(e.votes);
        });
        // Format data for chart
        const chartCode = {
          type: 'pie',
          data: {
            labels: choices,
            datasets: [{
              data: votes,
              backgroundColor: ['#8bcc8e', '#46627f', '#9083e8',
                '#ff7322', '#317f35', '#61adff', '#80456b',
                '#ffc661', '#aeffb2', '#ff9d61', '#bedda2',
                '#c8849f', '#9083e8', '#bbe2ae', '#ca7f35',
                '#aaaddd', '#ddc352', '#bbaafe', '#c08fca',
                randomColor(), randomColor(), randomColor(),
                randomColor(), randomColor(), randomColor()
              ]
            }]
          },
          options: {
            elements: {
              arc: {
                borderColor: '#eee',
                borderWidth: 5

              }
            },
            hover: {
              animationDuration: 700
            },
            legend: {
              labels: {
                fontSize: 16
              }
            },
            tooltips: {
              bodyFontSize: 18
            },
            title: {
              display: true,
              fontSize: 24,
              fontColor: '#a03',
              text: result[0].title
            }
          }
        };

        if (err) throw err;
        res.json(chartCode);
      });
  };

  // Vote for choice in poll
  this.vote = (reqPollId, reqChoice, res) => {
    Polls
      .findOneAndUpdate({
        _id: reqPollId,
        'choices.text': reqChoice
      }, {
        $inc: {
          'choices.$.votes': 1
        }
      })
      .exec((err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
      });
  };
}

module.exports = ClickHandler;
