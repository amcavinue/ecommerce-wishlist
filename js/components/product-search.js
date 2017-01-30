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
      itemClass: 'grid-group-item',
      query: ''
    };
  },
  gridToggle(e) {
    e.preventDefault();
    this.setState({
      itemClass: 'grid-group-item'
    });
  },
  listToggle(e) {
    e.preventDefault();
    this.setState({
      itemClass: 'list-group-item'
    });
  },
  updateQuery(e) {
    this.setState({
      query: e.target.value
    });
  },
  submit(e) {
    e.preventDefault();
    waitingDialog.show();
    store.dispatch(
      actions.fetchProducts(this.state.query)
    );
  },
  getProducts() {
    // let results = store.getState().results;
    let results = this.props.results;
    let products = [];
    
    if (results) {
      results.forEach((product) => {
        products.push(
          <ProductCard 
            itemClass={this.state.itemClass} 
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
      <div className="product-search-component">
        <h1 className="text-center">Search for Some of Your Favorite Products!</h1>
        
        <form className="form-inline search-form" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="name">Search:</label>
            <input className="form-control" ref={(input) => this.searchBox = input } type="text" id="search" name="search" onChange={this.updateQuery} required/>
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" name="submit" />
        </form>
        
        <div className="container list-grid-view">
            <div className="well well-sm">
                <strong>Display </strong>
                <div className="btn-group">
                    <a href="" id="list" className="btn btn-default btn-sm" onClick={this.listToggle}>
                      <span className="glyphicon glyphicon-th-list"></span>
                      List
                    </a> 
                    <a href="" id="grid" className="btn btn-default btn-sm" onClick={this.gridToggle}>
                      <span className="glyphicon glyphicon-th"></span>
                      Grid
                    </a>
                </div>
            </div>
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
  };
};

const Container = connect(mapStateToProps)(ProductSearch);

module.exports = Container;