const actions = require('../actions/index');
const store = require('../store');
const update = require('react-addons-update');
const combineReducers = require('redux').combineReducers;

const initialState = {
    isLoggedIn: false,
    wishlist: null,
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
    waitingDialog.hide();
    window.location = "/#/";
    bootbox.alert('Congratulations! You\'re username has been added. Please log in.');
    return state;
  } else if (action.type === actions.NEW_USER_ERROR) {
    waitingDialog.hide();
    if (action.err.response.status === 409) {
      bootbox.alert('That username is already taken. Please choose another.');
    } else {
      bootbox.alert('There was a server error. Please try again later.');
    }
    return state;
  } else if (action.type === actions.LOGIN_SUCCESS) {
    waitingDialog.hide();
    return update(state, {$set: true});
  } else if (action.type === actions.LOGIN_ERROR) {
    waitingDialog.hide();
    if (action.err.response.status === 401) {
      bootbox.alert('Incorrect username or password.');
    } else {
      bootbox.alert('There was a server error. Please try again later.');
    }
    return state;
  } else if (action.type === actions.LOGOUT) {
    sessionStorage.removeItem('ecommerceAppToken');
    window.location = "/#/";
    waitingDialog.hide();
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

const wishlistReducer = (state = initialState.wishlist, action) => {
  
  return state;
}

const reducer = combineReducers({
    isLoggedIn: loggedInReducer,
    loggedOutPages: loggedOutPagesReducer,
    loggedInPages: loggedInPagesReducer,
    wishlist: wishlistReducer
});

exports.reducer = reducer;