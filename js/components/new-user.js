const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;

const NewUser = (props) => {
  return (
    <div className="new-user-component">
      <h1>Create a new account</h1>
    </div>
  );
};

module.exports = NewUser;