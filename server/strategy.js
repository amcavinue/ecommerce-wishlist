'use strict';

const BasicStrategy = require('passport-http').BasicStrategy;

const User = require('../models/user');

const strategy = new BasicStrategy(function(username, password, callback) {
  //return callback(null, true);
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) {
      callback(err);
      return;
    }

    if (!user) {
      return callback(null, false, {
        message: 'Incorrect username.'
      });
    }

    user.validatePassword(password, function(err, isValid) {
      if (err) {
        return callback(err);
      }
      
      if (!isValid) {
        return callback(null, false, {
          message: 'Incorrect password.'
        });
      }
      
      return callback(null, user);
    });
  });
});

module.exports = strategy;