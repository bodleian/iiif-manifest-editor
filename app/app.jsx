var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Home = require('Home');
var OpenManifest = require('OpenManifest');
var NewManifest = require('NewManifest');


require('style!css?sourceMap!sass!applicationStyles');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="open" component={OpenManifest} />
      <Route path="new" component={NewManifest} />

      <IndexRoute component={Home}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
