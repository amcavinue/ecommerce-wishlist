require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;

const actions = require('./actions/index');
const store = require('./store');
const EcommerceApp = require('./components/ecommerce-app');

document.addEventListener('DOMContentLoaded', () => {  
  ReactDOM.render(
    <Provider store={store}>
      <EcommerceApp />
    </Provider>,
    document.getElementById('app')
  );
});