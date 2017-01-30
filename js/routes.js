require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const router = require('react-router');
const Router = router.Router;
const Route = router.Route;
const browserHistory = router.browserHistory;
const hashHistory = router.hashHistory;
const IndexRoute = router.IndexRoute;

const store = require('./store');
const EcommerceApp = require('./components/ecommerce-app');
const Login = require('./components/login');
const NewUser = require('./components/new-user');
const ProductSearch = require('./components/product-search');
const Wishlist = require('./components/wishlist');

const Routes = (props) => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={EcommerceApp}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="newuser" component={NewUser} />
        <Route path="search" component={ProductSearch} />
        <Route path="wishlist" component={Wishlist} />
      </Route>
    </Router>
  );
};

module.exports = Routes;