var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var EditManifest = React.createClass({
  componentWillMount: function() {
    var {manifestData} = this.props;
    if(manifestData.data === undefined) {
      window.location.hash = '#/';
    }
  },
  parseManifestData: function() {
    var {manifestData} = this.props;
    if(manifestData.data !== undefined) {
      return manifestData.data.label;
    }
  },
  render: function() {
    return (
      <div>
        <h2>Manifest Data</h2>
        <p>{this.parseManifestData()}</p>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestData: state.manifestReducer.manifestData
    };
  }
)(EditManifest);