var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');

var SettingsDialog = React.createClass({
  getInitialState: function() {
    return {
      
    };
  },
  saveSettings: function() {
    // TODO: Validate endpoint
    var validEndPoint = false;
    var serverEndpointUri = this.refs.serverEndpointUri.value;
    validEndPoint = this.validateEndpoint(serverEndpointUri);
    // TODO: Save settings to local storage
    if(validEndPoint) {
      console.log("Saving settings for " + serverEndpointUri);
    } else {
      // TODO: implement error message
      console.log("Settings can not be saved for " + serverEndpointUri);
    }
  },
  validateEndpoint: function(uri) {
    // TODO: store (test) manifest on server endpoint URI (POST), 
    // check if it returns a unique ID
    // retrieve manifest with returned ID (GET)
    // update manifest with returned ID (PUT)
    // DELETE (test) manifest
    console.log("Validating endpoint URI");
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Settings</h4>
            </div>
            <div className="modal-body">
              <h4>Server Endpoint Settings</h4>
              <p>
                Configure a server endpoint to store your manifest remotely. 
                Choose a name and indicate the URI. Click "Save Settings" to store your 
                settings to the browser's local storage. Before the endpoint settings are
                saved, the endpoint will be validated. It needs to support GET, POST and PUT
                requests in order to retrieve, store and update manifests.
              </p>
              <br />
              <form>
                <div className="form-group">
                  <label htmlFor="serverEndpointName">Server Endpoint Name:</label>
                  <input type="text" className="form-control" id="serverEndpointName" placeholder="Choose a name for your server endpoint" />
                </div>
                <div className="form-group">
                  <label htmlFor="serverEndpointUri">Server Endpoint URI</label>
                  <input type="text" className="form-control" id="serverEndpointUri" ref="serverEndpointUri" placeholder="Server endpoint URI" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.saveSettings}><i className="fa fa-save"></i> Save Settings</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
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
)(SettingsDialog);
