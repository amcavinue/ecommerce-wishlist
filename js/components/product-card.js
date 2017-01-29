const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');
const actions = require('../actions/index');

const ProductCard = React.createClass({
  getInitialState() {
    return {
      data1: null
    };
  },
  formatDollar(num) {
    // http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
      return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
  },
  render() {
    return (
      <div className="product-card-component">
        <div className={this.props.itemClass + ' item col-xs-12 col-md-6 col-lg-4'}>
          <div className="thumbnail">
            <img className="group list-group-image" src={this.props.img} alt="" />
            <div className="caption">
              <h4 className="group inner list-group-item-heading">{this.props.title}</h4>
              <p className="group inner list-group-item-text">
                {this.props.description}
              </p>
              <div className="price">{this.formatDollar(this.props.price)}</div>
              <a className="btn btn-success" href="">Add to wishlist</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProductCard;