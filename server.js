const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret: 'server secret'});

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
app.use('/assets', express.static(__dirname + '/assets/'));
app.use(bodyParser.json());

const routes = require('./server/routes');
const strategy = require('./server/strategy');

passport.use(strategy);
app.use(passport.initialize());

/**
 * Routes
 */
app.post('/api/users', routes.newUser);
app.post('/api/login', passport.authenticate('local', {session: false}), routes.generateToken, routes.login);

app.get('/api/restricted', authenticate, routes.restricted);

app.get('/api/products/:query', routes.products);
app.get('/api/products/asins/:asin', routes.asins);

app.get('/api/wishlists/:user', authenticate, routes.getWishlist);
app.post('/api/wishlists/:user/', authenticate, routes.addWishlistItem);
app.delete('/api/wishlists/:user/:asin/', authenticate, routes.removeWishlistItem);

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
}

/**
 * Exports
 */
exports.app = app;
exports.runServer = runServer;