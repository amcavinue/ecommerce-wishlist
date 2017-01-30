const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');
const actions = require('../actions/index');

const Wishlist = React.createClass({
  getInitialState() {
    return {
      data1: null
    };
  },
  render() {
    return (
      <div className="wishlist-component">
        <h1 className="text-center">Manage Your Wishlist</h1>
      </div>
    );
  }
});

module.exports = Wishlist;