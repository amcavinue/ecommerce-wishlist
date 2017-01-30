const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').default;

const reducers = require('./reducers/index');

const store = createStore(reducers.reducer, applyMiddleware(thunk));
module.exports  = store;

const ProductSearch = require('./components/product-search');

/*let currentValue;
const updateProducts = () => {
  let previousValue = currentValue;
  currentValue = store.getState().results;

  if (previousValue !== currentValue) {
    console.log('Some deep nested property changed from', previousValue, 'to', currentValue);
    ProductSearch.forceUpdate();
  }
};

const unsubscribe = store.subscribe(updateProducts);*/