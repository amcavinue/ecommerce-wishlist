const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');

const Login = React.createClass({
  render() {
    return (
      <div className="login-component">
        <h1 className="text-center">Login to the Ecommerce App</h1>
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <Validation.components.Form className="login-component-form">
              <fieldset>
                <div className="form-group">
                  <label className="" htmlFor="username">Username</label>
                  <Validation.components.Input 
                    className="form-control" 
                    type="text" 
                    id="username" 
                    name="username" 
                    validations={['required']} 
                    value="" 
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
                    validations={['required']} 
                    value="" 
                    required 
                  />
                </div>
              </fieldset>
          
              <input 
              id="login-submit" 
              type="submit" 
              value="Submit" 
              name="submit" 
              className="btn btn-primary col-xs-12" />
            </Validation.components.Form>
            
            <a className="new-account-link" onClick={this.props.showNewUser} href="#">
              Don't have an account? Create one here.
            </a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;