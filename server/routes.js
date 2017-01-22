const mongoose = require('mongoose');
const amazon = require('amazon-product-api');
const util = require('util');
var process = require('process');

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

const apiLogin = (req, res) => {
  return res.status(200);
};

exports.lookup = lookup;
exports.apiLogin = apiLogin;