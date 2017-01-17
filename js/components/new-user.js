const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;

const NewUser = (props) => {
  return (
    <div className="new-user-component">
      <h1 className="text-center">Create a new account</h1>
      <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
            <form className="new-user-component-form">
              <fieldset>
                <div className="form-group">
                  <label className="" htmlFor="username">Create a Username</label>
                  <input className="form-control" type="text" 
                  id="username" name="username" required />
                </div>
                
                <div className="form-group">
                  <label className="" htmlFor="password">Enter a Password</label>
                  <input className="form-control" type="password" 
                  id="password" name="password" required />
                </div>
                
                <div className="form-group">
                  <label className="" htmlFor="repeat-password">Repeat Password</label>
                  <input className="form-control" type="password" 
                  id="repeat-password" name="repeat-password" 
                  data-match="#password" required />
                </div>
              </fieldset>
          
              <input id="login-submit" type="submit" value="Submit" 
              name="submit" className="btn btn-primary col-xs-12" />
            </form>
          </div>
        </div>
    </div>
  );
};

module.exports = NewUser;