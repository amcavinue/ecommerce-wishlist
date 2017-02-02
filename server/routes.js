'use strict';

const mongoose = require('mongoose');
const amazon = require('amazon-product-api');
const util = require('util');
const process = require('process');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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

  let username = req.body.username;

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

  let password = req.body.password;

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
        message: 'Internal server error'
      });
    }

    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        return res.status(500).json({
          message: 'Incorrect password.'
        });
      }

      let user = new User({
        username: username,
        password: hash
      });

      user.save(function(err) {
        if (err) {
          return res.status(409).send({
            error: 'Error saving user to database.'
          });
        }

        return res.status(201).json({});
      });
    });
  });
};

const generateToken = (req, res, next) => {
  req.token = jwt.sign(
    {
      user: req.username,
    },
    'server secret',
    {
      expiresIn: '2h'
    }
  );
  next();
};

const login = (req, res) => {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
};

// Client for accessing the Amazon Product Advertising API.
const client = amazon.createClient({
  awsTag: process.env.AWS_TAG,
  awsId: process.env.AWS_ID,
  awsSecret: process.env.AWS_SECRET
});

const formatAmazonData = (data) => {
  let compiled = [];
  
  data.forEach((product) => {
    compiled.push({
      title: product.ItemAttributes[0].Title[0],
      img: product.LargeImage ? product.LargeImage[0].URL[0] : null,
      price: product.ItemAttributes[0].ListPrice ? product.ItemAttributes[0].ListPrice[0].FormattedPrice[0] : null,
      description: product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature : null, // Return the array of features.
      asin: product.ASIN[0],
      link: product.DetailPageURL[0]
    });
  });
  
  return compiled;
};

const products = (req, res) => {
  client.itemSearch({
    keywords: req.params.query,
    itemPage: 1,
    responseGroup: 'ItemAttributes,Images'
  }).then(function(results){
    return res.status(200).json(formatAmazonData(results));
  }).catch(function(err){
    return res.status(400).json(err);
  });
};

const asins = (req, res) => {
  client.itemLookup({
    idType: 'ASIN',
    itemId: req.params.asin,
    responseGroup: 'ItemAttributes,Images'
  }).then(function(results) {
    return res.status(200).json(formatAmazonData(results));
  }).catch(function(err) {
    return res.status(400).json(err);
  });
};

const getWishlist = (req, res) => {
  User.findOne({
      username: req.params.user
    }, (err, user) => {
      if (err || user === null) {
        return res.status(500).json({
          message: 'Error accessing database.'
        });
      }
      
      return res.status(200).json(user.wishlist);
    });
};

const addWishlistItem = (req, res) => {
  User.findOne({
      username: req.params.user
    }, (err, user) => {
      if (err || user === null) {
        return res.status(500).json({
          message: 'Error accessing database.'
        });
      }
      
      user.wishlist.push(req.body.item);
      user.save((err, updatedUser) => {
        if (err || updatedUser === null) {
          return res.status(500).json({
            message: 'Error accessing database.'
          });
        }
        
        return res.status(201).json(updatedUser.wishlist);
      });
    });
};

const removeWishlistItem = (req, res) => {
  User.findOne({
      username: req.params.user
    }, (err, user) => {
      if (err || user === null) {
        return res.status(500).json({
          message: 'Error accessing database.'
        });
      }
      
      let prodIndex = user.wishlist.findIndex((product) => {
        return product.asin === req.params.asin;
      });
      if (prodIndex !== -1) {
        user.wishlist.splice(prodIndex, 1);
      }
      
      user.save((err, updatedUser) => {
        if (err || updatedUser === null) {
          return res.status(500).json({
            message: 'Error accessing database.'
          });
        }
        
        return res.status(200).json(updatedUser.wishlist);
      });
    });
};

exports.newUser = newUser;
exports.generateToken = generateToken;
exports.login = login;
exports.restricted = restricted;
exports.products = products;
exports.asins = asins;
exports.getWishlist = getWishlist;
exports.addWishlistItem = addWishlistItem;
exports.removeWishlistItem = removeWishlistItem;