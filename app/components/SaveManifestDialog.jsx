var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');
var DownloadManifest = require('DownloadManifest');
var ValidateManifest = require('ValidateManifest');
var SendManifestToUri = require('SendManifestToUri');

var SaveManifestDialog = React.createClass({
  getInitialState: function() {
    return {
      saveManifestLocation: 'local',
      localRemoteToggleIcon: 'off'
    };
  },
  toggleLocalRemoteSave: function() {
    this.setState({
      saveManifestLocation: this.state.saveManifestLocation == 'local' ? 'remote' : 'local',
      localRemoteToggleIcon: this.state.localRemoteToggleIcon == 'off' ? 'on' : 'off'
    });
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
              <ValidateManifest />
              <hr />
              <a onClick={this.toggleLocalRemoteSave} className="toggle-local-remote-save" title="Save manifest: {this.state.saveManifestLocation}"><i className={"fa fa-toggle-" + this.state.localRemoteToggleIcon}></i> Save manifest: {this.state.saveManifestLocation}</a>
              {(() => {
                if(this.state.saveManifestLocation == 'local') {
                  return (
                    <DownloadManifest />
                  );
                } else {
                  return (
                    <SendManifestToUri />
                  );
                }
              })()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.resetValidationStatus} data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
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
