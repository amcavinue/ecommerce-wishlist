const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;
const Validation = require('./../validation-rules');

const NewUser = (props) => {
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
                    required
                  />
                </div>
              </fieldset>
          
              <input 
                id="login-submit" 
                type="submit" 
                value="Submit" 
                name="submit" 
                className="btn btn-primary col-xs-12" 
              />
            </Validation.components.Form>
          </div>
        </div>
    </div>
  );
};

module.exports = NewUser;