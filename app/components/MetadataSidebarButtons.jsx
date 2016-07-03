var React = require('react');
var ReactDOM = require('react-dom');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var SaveManifestDialog = require('SaveManifestDialog');

var MetadataSidebarButtons = React.createClass({
  openSaveManifestDialog: function() {
    var $saveManifestDialog = $(ReactDOM.findDOMNode(this.refs.saveManifestDialog));
    $saveManifestDialog.modal();
  },
  downloadManifestData: function(manifestFilenameToSave) {
    var {manifestData} = this.props;
    var manifestDataJson = JSON.stringify(manifestData, null, '\t');
    var a = document.createElement('a');
    var blob = new Blob([manifestDataJson], {'type':'application/json'});
    a.href = window.URL.createObjectURL(blob);
    a.download = manifestFilenameToSave;
    a.click();
  },
  render: function() {
    return (
      <div className="metadata-sidebar-buttons">
        <Link to="/new" className="btn btn-default metadata-sidebar-button">New</Link>
        <Link to="/open" className="btn btn-default metadata-sidebar-button">Open</Link>
        <a onClick={this.openSaveManifestDialog} className="btn btn-default metadata-sidebar-button">Save</a>
        <Link to="/" className="btn btn-default metadata-sidebar-button">Close</Link>
        <SaveManifestDialog ref="saveManifestDialog" onSave={this.downloadManifestData} />
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
)(MetadataSidebarButtons);
