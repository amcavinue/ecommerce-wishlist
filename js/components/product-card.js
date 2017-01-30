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
  getDescriptions(descriptions) {
    let result = [];
    if (descriptions.length) {
      descriptions.forEach((description, i, arr) => {
        result.push(
          <li key={i}>{description}</li>
        );
      });
    }
    return result;
  },
  render() {
    return (
      <div className="product-card-component">
        <div className={this.props.itemClass + ' item col-xs-12 col-md-6 col-lg-4'}>
          <div className="thumbnail">
            <img className="group list-group-image" src={this.props.img} alt="" />
            <div className="caption">
              <h4 className="group inner list-group-item-heading">{this.props.title}</h4>
              <ul className="group inner list-group-item-text">
                {this.getDescriptions(this.props.description)}
              </ul>
              <div className="price">{this.props.price}</div>
              <a className="btn btn-success" href="">Add to wishlist</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProductCard;