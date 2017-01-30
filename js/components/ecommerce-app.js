const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');
const actions = require('../actions/index');

const EcommerceApp = React.createClass({
  componentDidMount() {
    // Log the user out and return to the login page when reloaded.
    store.dispatch(actions.logout());
  },
  showLogoutModal() {
    $('#logout-modal').modal('show');
  },
  logout() {
    waitingDialog.show();
    store.dispatch(actions.logout());
    $('#logout-modal').modal('hide');
  },
  createMenu() {
    let appState = store.getState();
    let currPath = this.props.location.pathname;
    let pages;
    
    if (appState.isLoggedIn) {
      pages = appState.loggedInPages;
    } else {
      pages = appState.loggedOutPages;
    }
    
    return pages.map((page, i, arr) => {
      if (page.path === currPath) {
        return <li key={i} className="active"><Link to={page.path}>{page.text}</Link></li>;
      }
      
      if (page.id === 'logout') {
        return <li key={i} onClick={this.showLogoutModal}><a>{page.text}</a></li>;
      } else {
        return <li key={i}><Link to={page.path}>{page.text}</Link></li>;
      }
    });
  },
  render() {
    let appState = store.getState();
    
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
              <Link className="navbar-brand" to={appState.isLoggedIn ? '/search' : '/'}>Ecommerce Wishlist</Link>
            </div>
        
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul id="main-menu" className="nav navbar-nav navbar-right">
                {this.createMenu()}
              </ul>
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
        
        <div className="modal fade" id="logout-modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Are you sure you want to logout?</h4>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" onClick={this.logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container">
          {this.props.children}
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

const Container = connect(mapStateToProps)(EcommerceApp);

module.exports = Container;