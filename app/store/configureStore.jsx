var redux = require('redux');
var {manifestReducer} = require('./../reducers/index');
export var configure = () => {
  var reducer = redux.combineReducers({
    manifest: manifestReducer
  });


  var store = redux.createStore(reducer, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
