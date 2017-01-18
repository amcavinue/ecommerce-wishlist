const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');

const EcommerceApp = React.createClass({
  createMenu() {
    let state = store.getState();
    let currPath = this.props.location.pathname;
    let pages;
    
    if (state.isLoggedIn) {
      pages = state.loggedInPages;
    } else {
      pages = state.loggedOutPages;
    }
    
    return pages.map((page, i, arr) => {
      if (page.path === currPath) {
        return <li key={i} className="active"><Link to={page.path}>{page.text}</Link></li>;
      }
      return <li key={i}><Link to={page.path}>{page.text}</Link></li>;
    });
  },
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" 
              data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" 
              aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to={'/'}>Ecommerce Wishlist</Link>
            </div>
        
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                {this.createMenu()}
              </ul>
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
        
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state, props) => {
  return {
    data1: state.data1,
    data2: state.data2,
    isLoggedIn: state.isLoggedIn,
    loggedOutPages: state.loggedOutPages,
    loggedInPages: state.loggedInPages
  };
};

const Container = connect(mapStateToProps)(EcommerceApp);

module.exports = Container;