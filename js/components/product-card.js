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
    if (descriptions) {
      descriptions.forEach((description, i, arr) => {
        result.push(
          <li key={i}>{description}</li>
        );
      });
    }
    return result;
  },
  deleteItem() {
    bootbox.confirm('Are you sure you want to delete this item?', (result) => {
      if (result) {
        console.log(this.props.username, this.props.asin, 27);
        
        store.dispatch(
          actions.fetchRemoveProduct(this.props.username, this.props.asin)
        );
      }
    });
  },
  addItem() {
    
  },
  getButtons() {
    if (this.props.cardType === 'wishlist') {
      return <a className="caption-item btn btn-danger" onClick={this.deleteItem}>Delete</a>;
    } else if (this.props.cardType === 'search') {
      return <a className="caption-item btn btn-success add-to-wishlist" onClick={this.addItem}>Add to wishlist</a>
    }
  },
  render() {
    return (
      <div className="product-card-component">
        <div className={'list-group-item item col-xs-12 col-md-6 col-lg-4'}>
          <div className="thumbnail">
            <img className="list-group-image" src={this.props.img} alt="" />
            <div className="caption">
              <h4 className="caption-item list-group-item-heading"><a href={this.props.link} target="_blank">{this.props.title}</a></h4>
              <ul className="caption-item list-group-item-text">
                {this.getDescriptions(this.props.description)}
              </ul>
              <div className="caption-item price">{this.props.price}</div>
              {this.getButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProductCard;