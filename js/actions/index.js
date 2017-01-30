const fetch = require('isomorphic-fetch');

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
    
    return fetch('/api/login', init)
    .then(function(response) {
      // If any response other than successful.
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      sessionStorage.setItem('ecommerceAppToken', data.token);
      
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

const fetchNewUser = (username, password) => {
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
    
    return fetch('/api/users', init)
    .then(function(response) {
      // If any response other than successful.
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return dispatch(
        newUserSuccess(data)
      );
    })
    .catch(function(error) {
      return dispatch(
        newUserError(error)
      );
    });
  };
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

const LOGOUT = 'LOGOUT';
function logout() {
  return {
    type: LOGOUT
  };
}

const fetchProducts = (query) => {
  return (dispatch) => {
    let init = {
      method: 'GET',
    };
    
    return fetch('/api/products/' + encodeURIComponent(query), init)
    .then(function(response) {
      // If any response other than successful.
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return dispatch(
        productsSuccess(data)
      );
    })
    .catch(function(error) {
      return dispatch(
        productsError(error)
      );
    });
  };
};

const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
function productsSuccess(data) {
    return {
        type: PRODUCTS_SUCCESS,
        data: data
    };
}

const PRODUCTS_ERROR = 'PRODUCTS_ERROR';
function productsError(err) {
    return {
        type: PRODUCTS_ERROR,
        err: err
    };
}

const fetchProduct = (asin) => {
  return (dispatch) => {
    let init = {
      method: 'GET',
    };
    
    return fetch('/api/products/asins/' + encodeURIComponent(asin), init)
    .then(function(response) {
      // If any response other than successful.
      if (response.status < 200 || response.status >= 300) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return dispatch(
        productsSuccess(data)
      );
    })
    .catch(function(error) {
      return dispatch(
        productsError(error)
      );
    });
  };
};

const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS';
function productSuccess(data) {
    return {
        type: PRODUCT_SUCCESS,
        data: data
    };
}

const PRODUCT_ERROR = 'PRODUCT_ERROR';
function productError(err) {
    return {
        type: PRODUCT_ERROR,
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

exports.LOGOUT = LOGOUT;
exports.logout = logout;

exports.fetchProducts = fetchProducts;
exports.PRODUCTS_SUCCESS = PRODUCTS_SUCCESS;
exports.productsSuccess = productsSuccess;
exports.PRODUCTS_ERROR = PRODUCTS_ERROR;
exports.productsError = productsError;

exports.fetchProduct = fetchProduct;
exports.PRODUCT_SUCCESS = PRODUCT_SUCCESS;
exports.productSuccess = productSuccess;
exports.PRODUCT_ERROR = PRODUCT_ERROR;
exports.productError = productError;