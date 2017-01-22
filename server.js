const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var passport = require('passport');

// If in the development environment, get the aws credentials
// from the file. Otherwise they are set globally.
if (process.env.NODE_ENV === 'development' || 
    process.env.NODE_ENV === 'test') {
  process.env = Object.assign(process.env, require('./amazon-config'));
}
const config = require('./config');

const app = express();
app.use(express.static('build'));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use(bodyParser.json());

const routes = require('./server/routes');
const strategy = require('./server/strategy');

passport.use('basic strategy', strategy);
app.use(passport.initialize());

/**
 * Routes
 */
routes.lookup();
app.post('/api/newuser', routes.newUser);

/**
 * Run the server
 */
const runServer = function(callback) {
  mongoose.connect(config.DATABASE_URL, function(err) {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, function() {
      console.log('Listening on localhost:' + config.PORT);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main === module) {
  runServer(function(err) {
    if (err) {
      console.error(err);
    }
  });
};

/**
 * Exports
 */
exports.app = app;
exports.runServer = runServer;