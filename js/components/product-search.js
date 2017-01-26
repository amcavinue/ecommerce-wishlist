const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');
const actions = require('../actions/index');

const ProductSearch = React.createClass({
  getInitialState() {
    return {
      data1: null
    };
  },
  submit(e) {
    e.preventDefault();
  },
  render() {
    return (
      <div className="product-search-component">
        <h1 className="text-center">Search for Some of Your Favorite Products!</h1>
        
        <form className="form-inline search-form" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="name">Search:</label>
            <input className="form-control" type="text" id="search" name="search" required/>
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" name="submit" />
      </form>
      </div>
    );
  }
});

module.exports = ProductSearch;