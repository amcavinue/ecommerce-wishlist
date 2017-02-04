const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');
const actions = require('../actions/index');

const Login = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },
  updateUsername(e) {
    this.setState({
      username: e.target.value
    });
  },
  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  },
  submit(e) {
    e.preventDefault();
    waitingDialog.show();
    store.dispatch(
      actions.fetchLogin(this.state.username, this.state.password)
    );
  },
  render() {
    return (
      <div className="login-component">
        <h1 className="text-center">Login to the Ecommerce App</h1>
        <span>A test account is available with username and password: <strong>testUser1</strong></span>
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <Validation.components.Form className="login-component-form" onSubmit={this.submit}>
              <fieldset>
                <div className="form-group">
                  <label className="" htmlFor="username">Username</label>
                  <Validation.components.Input 
                    className="form-control" 
                    type="text" 
                    id="username" 
                    name="username" 
                    value=""
                    validations={['required']} 
                    onChange={this.updateUsername}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="" htmlFor="password">Password</label>
                  <Validation.components.Input 
                    className="form-control" 
                    type="password" 
                    id="password" 
                    name="password" 
                    value=""
                    validations={['required']} 
                    onChange={this.updatePassword}
                    required 
                  />
                </div>
              </fieldset>
          
              <Validation.components.Button 
              id="login-submit" 
              type="submit" 
              name="submit" 
              className="btn btn-primary col-xs-12">
                Submit
              </Validation.components.Button>
            </Validation.components.Form>
            
            <Link className="new-account-link" to={'/newuser'}>
              Don't have an account? Create one here.
            </Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;