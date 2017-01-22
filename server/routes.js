const mongoose = require('mongoose');
const amazon = require('amazon-product-api');
const util = require('util');
var process = require('process');
var bcrypt = require('bcryptjs');

const User = require('../models/user');

// Client for accessing the Amazon Product Advertising API.
const client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});

const lookup = () => {
  client.itemSearch({
    keywords: 'towel',
    itemPage: 3,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results){
    // console.log(util.inspect(results, {showHidden: false, depth: null}), 33);
  }).catch(function(err){
    console.log(err, 35);
  });
  
  client.itemLookup({
    idType: 'ASIN',
    itemId: 'B011J9BYC8'
  }).then(function(results) {
    // console.log(util.inspect(results, {showHidden: false, depth: null}), 47);
  }).catch(function(err) {
    console.log(err, 50);
  });
};

const newUser = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "No request body"
    });
  }

  if (!('username' in req.body)) {
    return res.status(422).json({
      message: 'Missing field: username'
    });
  }

  var username = req.body.username;

  if (typeof username !== 'string') {
    return res.status(422).json({
      message: 'Incorrect field type: username'
    });
  }

  username = username.trim();

  if (username === '') {
    return res.status(422).json({
      message: 'Incorrect field length: username'
    });
  }

  if (!('password' in req.body)) {
    return res.status(422).json({
      message: 'Missing field: password'
    });
  }

  var password = req.body.password;

  if (typeof password !== 'string') {
    return res.status(422).json({
      message: 'Incorrect field type: password'
    });
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({
      message: 'Incorrect field length: password'
    });
  }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return res.status(500).json({
        message: 'Internal server error 1'
      });
    }

    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        return res.status(500).json({
          message: 'Internal server error 2'
        });
      }

      var user = new User({
        username: username,
        password: hash
      });

      user.save(function(err) {
        if (err) {
          return res.status(500).json({
            message: 'Internal server error 3'
          });
        }

        return res.status(201).json({});
      });
    });
  });
};

exports.lookup = lookup;
exports.newUser = newUser;