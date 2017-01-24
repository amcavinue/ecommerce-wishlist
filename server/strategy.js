'use strict';

const LocalStrategy = require('passport-local');

const User = require('../models/user');

const strategy = new LocalStrategy(
  (username, password, done) => {
    User.findOne({
      username: username
    }, function (err, user) {
      if (err) {
        done(err);
        return;
      }
  
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
  
      user.validatePassword(password, function(err, isValid) {
        if (err) {
          return done(err);
        }
        
        if (!isValid) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        
        return done(null, user);
      });
    });
  }
);

module.exports = strategy;