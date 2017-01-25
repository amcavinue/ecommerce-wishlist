const fetch = require('isomorphic-fetch');
const store = require('../store');

const fetchLogin = (username, password) => {
  return (dispatch) => {
    let init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
    };
    debugger;
    
    return fetch('/api/login', init)
    .then(function(response) {
      // If any response other than successful.
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return dispatch(
        loginSuccess(data)
      );
    })
    .catch(function(error) {
      return dispatch(
        loginError(error)
      );
    });
  };
};

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data: data
    };
}

const LOGIN_ERROR = 'LOGIN_ERROR';
function loginError(err) {
    return {
        type: LOGIN_ERROR,
        err: err
    };
}

const fetchNewUser = () => {
};

const NEW_USER_SUCCESS = 'NEW_USER_SUCCESS';
function newUserSuccess(data) {
    return {
        type: NEW_USER_SUCCESS,
        data: data
    };
}

const NEW_USER_ERROR = 'NEW_USER_ERROR';
function newUserError(err) {
    return {
        type: NEW_USER_ERROR,
        err: err
    };
}

exports.fetchLogin = fetchLogin;
exports.LOGIN_ERROR = LOGIN_ERROR;
exports.loginError = loginError;
exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
exports.loginSuccess = loginSuccess;

exports.fetchNewUser = fetchNewUser;
exports.NEW_USER_ERROR= NEW_USER_ERROR;
exports.newUserError = newUserError;
exports.NEW_USER_SUCCESS = NEW_USER_SUCCESS;
exports.newUserSuccess = newUserSuccess;