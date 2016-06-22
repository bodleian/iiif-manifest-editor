var redux = require('redux');

var reducer = (state = {manifestData: null}, action) => {
  switch (action.type) {
    case 'SET_MANIFEST_DATA':
      return {
        ...state,
        manifestData: action.manifestData
      };
    default:
      return state;
   }
};

var store = redux.createStore(reducer);

module.exports = store;
