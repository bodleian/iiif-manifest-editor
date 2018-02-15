var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');

var DownloadManifest = React.createClass({
  downloadManifestData: function(manifestFilenameToSave) {
    var {manifestData} = this.props;
    var manifestDataJson = JSON.stringify(manifestData, null, '\t');
    var a = document.createElement('a');
    var blob = new Blob([manifestDataJson], {type: 'application/json'});
    a.href = window.URL.createObjectURL(blob);
    a.download = manifestFilenameToSave;
    document.body.appendChild(a);
    a.click();
  },
  setManifestFilename: function() {
    var manifestFilenameToSave = this.refs.manifestFilename.value;
    this.props.dispatch(actions.setManifestFilename(manifestFilenameToSave));
    this.downloadManifestData(manifestFilenameToSave);
  },
  render: function() {
    return (
      <div>
        <h3>Download Manifest</h3>
        <label htmlFor="manifestFilename">Manifest file name: </label>
        <input type='text' name="manifestFilename" ref='manifestFilename' className="form-control" placeholder="Enter a filename for the manifest" defaultValue="manifest.json" />
        <br />
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.setManifestFilename}><i className="fa fa-download"></i> Download</button>
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
)(DownloadManifest);
