const actions = require('../actions/index');
const store = require('../store');
const update = require('react-addons-update');
const combineReducers = require('redux').combineReducers;

const initialState = {
    data1: null,
    data2: null
};

const data1Reducer = (state = initialState.data1, action) => {
    return state;
};

const data2Reducer = (state = initialState.data2, action) => {
    return state;
};

const reducer = combineReducers({
    data1: data1Reducer,
    data2: data2Reducer
});

exports.reducer = reducer;