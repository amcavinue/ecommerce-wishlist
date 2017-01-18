require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;

const actions = require('./actions/index');
const store = require('./store');
const Routes = require('./routes');

document.addEventListener('DOMContentLoaded', () => {  
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('app')
  );
});