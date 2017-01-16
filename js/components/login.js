const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;

const Login = (props) => {
  return (
    <div>
      <h1 className="text-center">Login to the Ecommerce App</h1>
      <div className="row">
        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
          <form className="" action="" method="">
            <fieldset>
              <div className="form-group">
                <label className="" for="username">Username</label>
                <input className="form-control" type="text" id="username" name="username" />
              </div>
              
              <div className="form-group">
                <label className="" for="password">Password</label>
                <input className="form-control" type="text" id="password" name="password" />
              </div>
            </fieldset>
        
            <input type="submit" value="Submit" name="submit" className="btn btn-primary col-xs-12" />
          </form>
        </div>
      </div>
    </div>
  );
};

module.exports = Login;