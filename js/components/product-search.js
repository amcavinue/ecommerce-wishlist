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

const ProductSearch = React.createClass({
  getInitialState() {
    return {
      query: store.getState().items.query || '',
      page: 1
    };
  },
  updateQuery(e) {
    this.setState({
      query: e.target.value
    });
  },
  submit(e) {
    e.preventDefault();
    waitingDialog.show();
    this.state.page = 1;
    store.dispatch(
      actions.fetchProducts(this.state.query, this.state.page)
    );
  },
  getProducts() {
    let results = this.props.items.results;
    let products = [];
    
    if (results) {
      results.forEach((product, i) => {
        products.push(
          <ProductCard
            key={i}
            cardType='search'
            link={product.link}
            asin={product.asin}
            username={this.props.session.username}
            title={product.title} 
            img={product.img} 
            price={product.price} 
            description={product.description} 
          />
        );
      });
      
      products.push(
        <button key="more-results" className="more-results btn btn-info" type="button" onClick={this.getMoreProducts}>Get more results</button>
      );
    }
    
    return products;
  },
  getMoreProducts() {
    waitingDialog.show();
    this.state.page++;
    store.dispatch(
      actions.fetchProducts(this.state.query, this.state.page)
    );
  },
  render() {
    return (
      <div className="product-search-component">
        <h1 className="text-center">Search for Some of Your Favorite Products!</h1>
        
        <form className="form-inline search-form" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="name">Search:</label>
            <input className="form-control" ref={(input) => this.searchBox = input } type="text" id="search" name="search" onChange={this.updateQuery} value={this.state.query} required/>
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" name="submit" />
        </form>
        
        <div className="container list-grid-view">
            <div id="products" className="row list-group" ref={(input) => {this.products = input; }}>
              {this.getProducts()}
            </div>
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state, props) => {
  return {
    loggedOutPages: state.loggedOutPages,
    loggedInPages: state.loggedInPages,
    wishlist: state.wishlist,
    items: state.items,
    session: state.session
  };
};

const Container = connect(mapStateToProps)(ProductSearch);

module.exports = Container;