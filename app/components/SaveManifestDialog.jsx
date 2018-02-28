var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');
var DownloadManifest = require('DownloadManifest');
var SendManifestToUri = require('SendManifestToUri');

var SaveManifestDialog = React.createClass({
  getInitialState: function() {
    return {
      saveManifestLocation: 'local',
      saveManifestDialogId: undefined
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      saveManifestDialogId: nextProps.uuid
    });
  },
  toggleSaveManifestLocation: function() {
    this.setState({
      saveManifestLocation: this.state.saveManifestLocation == 'local' ? 'remote' : 'local'
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
              <form className="form-inline" id="saveManifestLocationToggle">
                <label className="radio-inline" htmlFor="saveManifestLocal">
                  <input id="saveManifestLocal" type="radio" name="saveOption" value="local" onChange={this.toggleSaveManifestLocation} checked={this.state.saveManifestLocation === 'local'} /> Download manifest
                </label>
                <label className="radio-inline" htmlFor="saveManifestRemote">
                  <input id="saveManifestRemote" type="radio" name="saveOption" value="remote" onChange={this.toggleSaveManifestLocation} checked={this.state.saveManifestLocation === 'remote'} /> Store manifest remotely
                </label>
              </form>
              {(() => {
                if(this.state.saveManifestLocation == 'local') {
                  return (
                    <DownloadManifest />
                  );
                } else {
                  return (
                    <SendManifestToUri uuid={this.state.saveManifestDialogId} />
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
