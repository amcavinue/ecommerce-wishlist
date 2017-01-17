const React = require('react');
const ReactDOM = require('react-dom');
const connect = require('react-redux').connect;

const NewUser = (props) => {
  return (
    <div className="new-user-component">
      <h2>New User Test</h2>
    </div>
  );
};

module.exports = NewUser;