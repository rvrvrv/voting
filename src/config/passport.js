const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

module.exports = (passport) => {
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  },
  ((token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'github.id': profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, user);

        const newUser = new User();
        newUser.github.id = profile.id;
        newUser.github.username = profile.username;
        newUser.github.displayName = profile.displayName;

        return newUser.save((dbErr) => {
          if (dbErr) throw dbErr;
          return done(null, newUser);
        });
      });
    });
  })));
};
