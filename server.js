const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./app/routes/index.js');

const app = express();

require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/controllers', express.static(`${process.cwd() }/app/controllers`));
app.use('/public', express.static(`${process.cwd() }/public`));
app.use('/common', express.static(`${process.cwd() }/app/common`));

app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Node.js listening on port ${port}...`));
