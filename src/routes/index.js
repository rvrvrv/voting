const path = process.cwd();
const ClickHandler = require(`${path}/app/controllers/clickHandler.server.js`);

module.exports = (app, passport) => {
  function isLoggedIn(req, res, next) {
    return req.isAuthenticated() ? next() : res.redirect('/login');
  }

  const clickHandler = new ClickHandler();

  app.route('/')
    .get(isLoggedIn, (req, res) => res.sendFile(`${path}/public/index.html`));

  app.route('/create')
    .get(isLoggedIn, (req, res) => res.sendFile(`${path}/public/create.html`));

  app.route('/profile')
    .get(isLoggedIn, (req, res) => res.sendFile(`${path}/public/profile.html`));

  app.route('/api/:id')
    .get(isLoggedIn, (req, res) => res.json(req.user.github));

  app.route('/login')
    .get((req, res) => res.sendFile(`${path}/public/login.html`));

  app.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/login');
    });

  app.route('/auth/github')
    .get(passport.authenticate('github'));

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  // Single poll view page
  app.route('/poll/:pollId')
    .get((req, res) => res.sendFile(`${path}/public/poll.html`));

  // Single poll routes
  app.route('/api/:id/loadPoll/:pollId/:choice?')
    .get((req, res) => { // Show one poll
      clickHandler.showPoll(req.params.pollId, res);
    })
    .post((req, res) => { // Add option to poll
      clickHandler.addChoice(req.params.pollId, req.params.choice, res);
    })
    .put((req, res) => { // Vote for option on poll
      clickHandler.vote(req.params.pollId, req.params.choice, res);
    });

  // Load all polls on login & index pages
  app.route('/api/:id/load')
    .get(clickHandler.getAllPolls);

  // Logged-in user poll operations
  app.route('/api/:id/loadOne/:del?')
    .get(isLoggedIn, clickHandler.getUserPolls) // Load one user's polls
    .post(isLoggedIn, clickHandler.createPoll) // Create a poll
    .delete(isLoggedIn, (req, res) => { // Delete a poll
      clickHandler.deletePoll(req.user.github.id, req.params.del, res);
    });
};
