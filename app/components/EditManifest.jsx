var React = require('react');

var actions = require('./../actions/index');
var store = require('./../store/configureStore').configure();

var EditManifest = React.createClass({
  componentWillMount: function() {
    if(store.getState().manifestData === null) {
      window.location.hash = '#/';
    }
  },
  parseManifestData: function(data) {
    if(store.getState().manifestData !== null) {
      var jsonData = JSON.parse(data);
      return jsonData.label;
    }
  },
  render: function() {
    return (
      <div>
        <h2>Manifest Data</h2>
        <p>{this.parseManifestData(store.getState().manifestData)}</p>
      </div>
    );
  }
});

module.exports = EditManifest;
