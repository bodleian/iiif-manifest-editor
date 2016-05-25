var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

require('style!css?sourceMap!sass!applicationStyles');

ReactDOM.render(
  <p>IIIF Manifest Editor</p>,
  document.getElementById('app')
);
