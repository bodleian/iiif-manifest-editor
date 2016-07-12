var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');

var SaveManifestDialog = React.createClass({
  downloadManifestData: function(manifestFilenameToSave) {
    var {manifestData} = this.props;
    var manifestDataJson = JSON.stringify(manifestData, null, '\t');
    var a = document.createElement('a');
    var blob = new Blob([manifestDataJson], {'type':'application/json'});
    a.href = window.URL.createObjectURL(blob);
    a.download = manifestFilenameToSave;
    a.click();
  },
  setManifestFilename: function() {
    var manifestFilenameToSave = this.refs.manifestFilename.value;
    this.props.dispatch(actions.setManifestFilename(manifestFilenameToSave));
    this.downloadManifestData(manifestFilenameToSave);
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Save Manifest</h4>
            </div>
            <div className="modal-body">
              <input type='text' ref='manifestFilename' className="form-control" placeholder="Enter a filename for the manifest" defaultValue="manifest.json" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.setManifestFilename}><i className="fa fa-download"></i> Save</button>
            </div>
          </div>
        </div>
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
)(SaveManifestDialog);
