var React = require('react');
var ReactDOM = require('react-dom');

var SaveManifestDialog = React.createClass({
  setManifestFilename: function() {
    var manifestFilenameToSave = this.refs.manifestFilename.value;
    this.props.onSave(manifestFilenameToSave);
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
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.setManifestFilename}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SaveManifestDialog;
