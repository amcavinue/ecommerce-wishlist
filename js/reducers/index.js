const actions = require('../actions/index');
const store = require('../store');
const update = require('react-addons-update');
const combineReducers = require('redux').combineReducers;

const initialState = {
    session: {
      isLoggedIn: false,
      username: false,
    },
    wishlist: null,
    items: {
      results: null,
      query: null,
    },
    query: null,
    loggedOutPages: [
      {
        text: 'Sign Up',
        path: '/newuser' // All paths must have preceding '/'.
      },
      {
        text: 'Login',
        path: '/login'
      }
    ], // The ordering of these pages affects the order of the menu.
    loggedInPages: [
      {
        text: 'Product Search',
        path: '/search'
      },
      {
        text: 'Your Wishlist',
        path: '/wishlist'
      },
      {
        text: 'Logout',
        path: null,
        id: 'logout'
      }
    ] // The ordering of these pages affects the order of the menu.
};

const loggedInReducer = (state = initialState.isLoggedIn, action) => {
  
}

const wishlistReducer = (state = initialState.wishlist, action) => {
  if (action.type === actions.WISHLIST_SUCCESS) {
    return update(state, {$set: action.data});
    
  } else if (action.type === actions.WISHLIST_ERROR) {
    bootbox.alert('There was a server error. Please try again later.');
    return state;
    
  } else if (action.type === actions.ADD_PRODUCT_SUCCESS) {
    waitingDialog.hide();
    bootbox.alert('The product has been added to your wishlist.');
    return update(state, {$set: action.data});
    
  } else if (action.type === actions.ADD_PRODUCT_ERROR) {
    waitingDialog.hide();
    bootbox.alert('There was a server error. Please try again later.');
    return state;
    
  } else if (action.type === actions.REMOVE_PRODUCT_SUCCESS) {
    return update(state, {$set: action.data});
    
  } else if (action.type === actions.REMOVE_PRODUCT_ERROR) {
    bootbox.alert('There was a server error. Please try again later.');
    return state;
    
  }
  return state;
}

const itemsReducer = (state = initialState.items, action) => {
  if (action.type === actions.PRODUCTS_SUCCESS) {
    waitingDialog.hide();
    if (state.results === null || state.query !== action.query) {
      return update(state, {
        results: {$set: action.data},
        query: {$set: action.query}
      });
    } else {
      let results = state.results.concat(action.data);
      return update(state, {
        results: {$set: results},
        query: {$set: action.query}
      });
    }
    
  } else if (action.type === actions.PRODUCTS_ERROR) {
    waitingDialog.hide();
    bootbox.alert('There was an error connecting to Amazon. Please try again later.');
    return state;
    
  } else if (action.type === actions.PRODUCT_SUCCESS) {
    return state;
    
  } else if (action.type === actions.PRODUCT_ERROR) {
    return state;
    
  }
  return state;
}

const sessionReducer = (state = initialState.session, action) => {
  if (action.type === actions.NEW_USER_SUCCESS) {
    waitingDialog.hide();
    window.location = "/#/";
    bootbox.alert('Congratulations! Your username has been added. Please log in.');
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
    window.location = "/#/search";
    return update(state, {
      isLoggedIn: {$set: true},
      username: {$set: action.data.user.username}
    });
    
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
    return update(state, {
      isLoggedIn: {$set: false}
    });
    
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
    loggedOutPages: loggedOutPagesReducer,
    loggedInPages: loggedInPagesReducer,
    wishlist: wishlistReducer,
    items: itemsReducer,
    session: sessionReducer
});

exports.reducer = reducer;