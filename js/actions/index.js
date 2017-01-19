const fetch = require('isomorphic-fetch');
const store = require('../store');

const fetchLogin = () => {
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