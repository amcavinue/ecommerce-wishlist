const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const amazon = require('amazon-product-api');
const util = require('util');
var process = require('process');

// If in the development environment, get the aws credentials
// from the file. Otherwise they are set globally.
if (process.env.NODE_ENV === 'development') {
  process.env = Object.assign(process.env, require('./amazon-config'));
}
const config = require('./config');

const app = express();
app.use(express.static('build')); // Serve the build folder.
app.use('/modules', express.static(__dirname + '/node_modules/')); // Serve the node_modules folder.
app.use(bodyParser.json()); // Used for getting parameters in post requests.

/**
 * Helper Functions
 */
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
    console.log(util.inspect(results, {showHidden: false, depth: null}), 33);
  }).catch(function(err){
    console.log(err, 35);
  });
  
  client.itemLookup({
    idType: 'ASIN',
    itemId: 'B011J9BYC8'
  }).then(function(results) {
    console.log(util.inspect(results, {showHidden: false, depth: null}), 47);
  }).catch(function(err) {
    console.log(err, 50);
  });
};

lookup();

/**
 * Routes
 */

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