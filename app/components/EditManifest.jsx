var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var EditManifest = React.createClass({
  componentWillMount: function() {
    var {manifestData} = this.props;
    if(manifestData === undefined) {
      window.location.hash = '#/';
    }
  },
  parseManifestData: function() {
    var {manifestData} = this.props;
    if(manifestData !== undefined) {
      var jsonData = JSON.parse(manifestData);
      return jsonData.label;
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
      manifestData: state.manifestData
    };
  }
)(EditManifest);