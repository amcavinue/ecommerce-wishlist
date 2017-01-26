const actions = require('../actions/index');
const store = require('../store');
const update = require('react-addons-update');
const combineReducers = require('redux').combineReducers;

const initialState = {
    isLoggedIn: false,
    loggedOutPages: [
      {
        text: 'Login',
        path: '/login'  // All paths must have preceding '/'.
      },
      {
        text: 'Sign Up',
        path: '/newuser'
      }
    ], // The ordering of these pages affects the order of the menu.
    loggedInPages: [
      {
        text: 'Logout',
        path: null,
        id: 'logout'
      }
    ] // The ordering of these pages affects the order of the menu.
};

const loggedInReducer = (state = initialState.isLoggedIn, action) => {
  if (action.type === actions.NEW_USER_SUCCESS) {
    console.log(action.data, 32);
    return state;
  } else if (action.type === actions.NEW_USER_ERROR) {
    console.log('An error occurred: ' + action.err, action.err.response, action);
    return state;
  } else if (action.type === actions.LOGIN_SUCCESS) {
    console.log(action.data, 32);
    return update(state, {$set: true});
  } else if (action.type === actions.LOGIN_ERROR) {
    console.log('An error occurred: ' + action.err);
    return state;
  } else if (action.type === actions.LOGOUT) {
    sessionStorage.removeItem('ecommerceAppToken');
    window.location = "/#/";
    return update(state, {$set: false});
  }
  return state;
}

const loggedOutPagesReducer = (state = initialState.loggedOutPages, action) => {
  return state;
}

const loggedInPagesReducer = (state = initialState.loggedInPages, action) => {
  return state;
}

const reducer = combineReducers({
    isLoggedIn: loggedInReducer,
    loggedOutPages: loggedOutPagesReducer,
    loggedInPages: loggedInPagesReducer
});

exports.reducer = reducer;