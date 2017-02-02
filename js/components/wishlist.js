const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');
const actions = require('../actions/index');
const ProductCard = require('./product-card');

const Wishlist = React.createClass({
  getInitialState() {
    return {
      data1: null
    };
  },
  componentDidMount() {
    console.log(store.getState(), 20);
    
    store.dispatch(
      actions.fetchWishlist(store.getState().username)
    );
  },
  getProducts() {
    let wishlist = this.props.wishlist;
    let products = [];
    
    if (wishlist) {
      wishlist.forEach((product, i) => {
        products.push(
          <ProductCard
            key={i}
            cardType='wishlist'
            title={product.title} 
            img={product.img} 
            price={product.price} 
            description={product.description} 
          />
        );
      });
    }
    
    return products;
  },
  render() {
    return (
      <div className="wishlist-component">
        <h1 className="text-center">Manage Your Wishlist</h1>
        
        <div className="container list-grid-view">
            <div id="products" className="row list-group">
              {this.getProducts()}
            </div>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state, props) => {
  return {
    isLoggedIn: state.isLoggedIn,
    loggedOutPages: state.loggedOutPages,
    loggedInPages: state.loggedInPages,
    wishlist: state.wishlist,
    results: state.results,
    username: state.username
  };
};

const Container = connect(mapStateToProps)(Wishlist);

module.exports = Container;