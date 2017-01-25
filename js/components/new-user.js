const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');
const router = require('react-router');
const Link = router.Link;
const IndexLink = router.IndexLink;

const store = require('../store');
const actions = require('../actions/index');

const NewUser = React.createClass({
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
    store.dispatch(
      actions.fetchNewUser(this.state.username, this.state.password)
    );
  },
  render() {
    return (
      <div className="new-user-component">
        <h1 className="text-center">Create a new account</h1>
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <Validation.components.Form className="new-user-component-form">
              <fieldset>
                <div className="form-group">
                  <label className="" htmlFor="username">Create a Username</label>
                  <Validation.components.Input 
                    className="form-control" 
                    type="text" 
                    id="username" 
                    name="username" 
                    validations={['required']} 
                    value="" 
                    onChange={this.updateUsername}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="" htmlFor="password">Enter a Password</label>
                  <Validation.components.Input 
                    className="form-control" 
                    type="password" 
                    id="password" 
                    name="password" 
                    validations={['required', 'password']} 
                    value="" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label className="" htmlFor="passwordConfirm">Confirm Password</label>
                  <Validation.components.Input 
                    className="form-control"
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    validations={['required', 'password']} 
                    value="" 
                    onChange={this.updatePassword}
                    required
                  />
                </div>
              </fieldset>
          
              <Validation.components.Button 
                id="login-submit" 
                type="submit" 
                name="submit" 
                className="btn btn-primary col-xs-12"
                onClick={this.submit}>
                Submit
              </Validation.components.Button>
            </Validation.components.Form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NewUser;