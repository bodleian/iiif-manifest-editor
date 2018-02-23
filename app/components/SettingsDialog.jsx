var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');

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
    this.setState({
      isValidatingServerEndpoint: false,
      isValidEndpoint: undefined,
      canStoreManifest: undefined,
      canGetManifest: undefined,
      canUpdateManifest: undefined
    });

    this.validateEndpoint(this.refs.serverEndpointUri.value);
  },
  validateEndpoint: function(serverEndpointUri) {
    this.setState({
      isValidatingServerEndpoint: true
    });

    // store test manifest
    var _this = this;
    this.storeTestManifest(serverEndpointUri, this.props.manifestData)
      .then(function(manifestUri) {
        _this.setState({
          canStoreManifest: 'Yes'
        });

        // get test manifest
        _this.getTestManifest(manifestUri)
          .then(function(response) {
            _this.setState({
              canGetManifest: 'Yes'
            });

            // update test manifest
            _this.updateTestManifest(manifestUri, _this.props.manifestData)
              .then(function(response) {
                _this.setState({
                  isValidEndpoint: true,
                  isValidatingServerEndpoint: false,
                  isValidEndpoint: true,
                  canUpdateManifest: 'Yes'
                });

                // TODO: delete test manifest

              }, function(error) {
                _this.setState({
                  isValidatingServerEndpoint: false,
                  isValidEndpoint: false,
                  canUpdateManifest: 'No'
                });
              });
          }, function(error) {
            _this.setState({
              isValidatingServerEndpoint: false,
              isValidEndpoint: false,
              canGetManifest: 'No'
            });
          });
      }, function(error) {
        _this.setState({
          isValidatingServerEndpoint: false,
          isValidEndpoint: false,
          canStoreManifest: 'No'
        });
      });
  },
  storeTestManifest: function(uri, manifestData) {
    return new Promise(function(resolve, reject) {
      axios.post(uri, manifestData)
        .then(function(response) {
          // check if it returns a unique id
          if(typeof response.data.uri !== 'string') {
            reject('Server endpoint did not return a valid ID');
          } else {
            resolve(response.data.uri);
          }
        })
        .catch(function(error) {
          reject('Storing manifest failed with error: ' + error);
        });
    });
  },
  getTestManifest: function(manifestUri) {
    return new Promise(function(resolve, reject) {
      axios.get(manifestUri)
        .then(function(response) {
          resolve();
        })
        .catch(function(error) {
          reject('Getting manifest failed with error: ' + getManifestError);
        });
    });
  },
  updateTestManifest: function(manifestUri, manifestData) {
    return new Promise(function(resolve, reject) {
      axios.put(manifestUri, manifestData, { headers: { 'Content-Type': 'application/json' } })
        .then(function(response) {
          resolve();
        })
        .catch(function(error) {
          reject('Updating the manifest failed with error: ' + error);
        });
    });
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
