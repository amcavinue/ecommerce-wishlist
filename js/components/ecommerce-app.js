const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;

const actions = require('../actions/index');
const Login = require('./login');
const NewUser = require('./new-user');

const EcommerceApp = React.createClass({
  getInitialState() {
    return {
      newUser: false
    };
  },
  showNewUser() {
    this.setState({
      newUser: true
    });
  },
  render() {
    let currentComponent = null;
    
    if (this.state.newUser) {
      currentComponent = <NewUser />;
    } else {
      currentComponent = <Login showNewUser={this.showNewUser} />;
    }
    
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
              <a className="navbar-brand" href="#">Ecommerce Wishlist</a>
            </div>
        
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="active"><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
              </ul>
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
        
        <div className="container">
          {currentComponent}
        </div>
      </div>
    );
  }
});

const mapStateToProps = (state, props) => {
  return {
    data1: state.data1,
    data2: state.data2
  };
};

const Container = connect(mapStateToProps)(EcommerceApp);

module.exports = Container;