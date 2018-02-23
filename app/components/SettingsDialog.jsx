var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');

var SettingsDialog = React.createClass({
  getInitialState: function() {
    return {
      isValidatingServerEndpoint: false,
      validationError: undefined,
      isValidEndpoint: undefined,
      canStoreManifest: undefined,
      canGetManifest: undefined,
      canUpdateManifest: undefined
    };
  },
  saveSettings: function() {
    // TODO: Validate endpoint
    var validEndPoint = false;
    this.validateEndpoint(this.refs.serverEndpointUri.value);
    // TODO: Save settings to local storage
    if(this.state.canStoreManifest && this.state.canGetManifest && this.state.canUpdateManifest) {
      this.setState({
        isValidEndpoint: true,
        isValidatingServerEndpoint: false
      });
    } else {
      this.setState({
        isValidEndpoint: false,
        isValidatingServerEndpoint: false
      });
    }
  },
  validateEndpoint: function(uri) {
    this.setState({
      isValidatingServerEndpoint: true
    });
    this.storeTestManifest(uri)
      .then(function(result) {
        
      }, function(err) {
        
      });
    console.log("Validating endpoint URI: " + uri);
    
    // TODO DELETE test manifest
    // this.deleteTestManifest(uri);
  },
  storeTestManifest: function(uri) {
    console.log('storing manifest');
    new Promise(function(resolve, reject) {
      var that = this;
      axios.post(uri, this.props.manifestData)
        .then(function(storeTestManifestResponse) {
          // check if it returns a unique ID
          if(typeof storeTestManifestResponse.data.uri !== 'string') {
            that.setState({
              validationError: 'Server endpoint did not return a valid ID',
              canStoreManifest: "false"
            });
          } else {
            // test manifest successfully stored and ID returned
            that.setState({
              canStoreManifest: "Yes"
            });
            // get stored test manifest from returned id
            axios.get(storeTestManifestResponse.data.uri)
              .then(function(getManifestResponse){
                // successfully returned stored manifest
                that.setState({
                  canGetManifest: "Yes"
                });
                // update stored test manifest
                axios.put(storeTestManifestResponse.data.uri, that.props.manifestData, {
                  headers: {
                    'Content-Type': 'application/json',
                  }
                })
                  .then(function(updateManifestResponse) {
                    // successfully updated manifest
                    that.setState({
                      canUpdateManifest: "Yes"
                    });
                  })
                  .catch(function(updateManifestError) {
                    // could not update stored test manifest
                    that.setState({
                      validationError: 'Updating the manifest failed with error: ' + updateManifestError,
                    });
                    that.setState({
                      canUpdateManifest: "No"
                    });
                  });
                })
              .catch(function(getManifestError) {
                // could not GET stored test manifest
                that.setState({
                  validationError: 'Getting manifest failed with error: ' + getManifestError,
                });
                that.setState({
                  canGetManifest: "No"
                });
              });
            }
          })
        .catch(function(storeManifestError) {
          that.setState({
            validationError: 'Storing manifest failed with error: ' + storeManifestError,
          });
          // validation failed
          that.setState({
            canStoreManifest: "No"
          });
        });
      if (true) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
  },
  getTestManifest: function(uri) {
    console.log('get manifest');
  },
  updateTestManifest: function(uri) {
    console.log('update manifest');
  },
  deleteTestManifest: function(uri) {
    return true;
  },
  displayValidationMessage: function() {
    if(this.state.isValidEndpoint !== undefined) {
      if(this.state.isValidEndpoint) {
        return(
          <div className="alert alert-success">
            <div><i className="fa fa-check-circle"></i> This Manifest is valid!</div>
            <ul>
              <li><i className="fa fa-check"></i> Can store manifest: {this.state.canStoreManifest}</li>
              <li><i className="fa fa-check"></i> Can get manifest: {this.state.canGetManifest}</li>
              <li><i className="fa fa-check"></i> Can update manifest: {this.state.canUpdateManifest}</li>
            </ul>
          </div>
        );
      } else {
        return(
        <div className="alert alert-danger">
          <div><i className="fa fa-times-circle-o"></i> This server endpoint is not valid. Error:</div>
          <div>{this.state.validationError}</div>
          <ul>
            <li><i className="fa fa-times"></i> Can store manifest: {this.state.canStoreManifest}</li>
            <li><i className="fa fa-times"></i> Can get manifest: {this.state.canGetManifest}</li>
            <li><i className="fa fa-times"></i> Can update manifest: {this.state.canUpdateManifest}</li>
          </ul>
        </div>
        );
      }
    } else {
      if(this.state.isValidatingServerEndpoint) {
        return(
          <div className="validate-manifest-indicator"><i className="fa fa-circle-o-notch fa-spin"></i> Validating server endpoint...</div>
        );
      } else {
        return '';
      }
    }
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
                <div className="server-endpoint-validation-message">
                  {this.displayValidationMessage()}
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
