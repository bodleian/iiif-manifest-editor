var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');

var SettingsDialog = React.createClass({
  getInitialState: function() {
    var savedServerEndpoint = (localStorage && localStorage.getItem('savedServerEndpoint')) ? JSON.parse(localStorage.getItem('savedServerEndpoint')) : '';
    return {
      isValidEndpointName: undefined,
      isValidEndpointUri: undefined,
      isValidatingServerEndpoint: false,
      validationError: undefined,
      isValidEndpoint: undefined,
      canStoreManifest: undefined,
      returnsManifestId: undefined,
      canGetManifest: undefined,
      canUpdateManifest: undefined,
      savedServerEndpoint: savedServerEndpoint,
    };
  },
  saveSettings: function(e) {
    e.preventDefault();
    this.setState({
      isValidEndpointName: undefined,
      isValidEndpointUri: undefined,
      isValidatingServerEndpoint: false,
      isValidEndpoint: undefined,
      canStoreManifest: undefined,
      returnsManifestId: undefined,
      canGetManifest: undefined,
      canUpdateManifest: undefined
    });
    // require name field to be set
    if(this.refs.serverEndpointName.value === '') {
      this.setState({
        isValidEndpointName: false
      });
    }
    // require server endpoint URI field to be set
    if(this.refs.serverEndpointUri.value === '') {
      this.setState({
        isValidEndpointUri: false
      });
    }
    if(this.refs.serverEndpointName.value !== '' && this.refs.serverEndpointUri.value !== '') {
      this.validateEndpoint(this.refs.serverEndpointUri.value, this.refs.serverEndpointName.value);
    }
  },
  validateEndpoint: function(serverEndpointUri, serverEndpointName) {
    this.setState({
      isValidatingServerEndpoint: true
    });

    // store test manifest
    var _this = this;
    this.storeTestManifest(serverEndpointUri, this.props.manifestData)
      .then(function(manifestUri) {
        _this.setState({
          canStoreManifest: 'Yes',
          returnsManifestId: 'Yes',
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
                  savedServerEndpoint: { 'serverEndpointName': serverEndpointName, 'serverEndpointUri': serverEndpointUri },
                  isValidEndpoint: true,
                  canUpdateManifest: 'Yes'
                });

                // TODO: delete test manifest
                
                // Save valid server endpoint to localStorage
                if(localStorage) {
                  try {
                    localStorage.setItem('savedServerEndpoint', JSON.stringify(
                      {
                        'serverEndpointName': serverEndpointName,
                        'serverEndpointUri': serverEndpointUri
                      }
                    ));
                    
                  } catch(e) {
                    _this.displayErrorMessage();
                  }
                }

              })
              .catch(function(error) {
                _this.setState({
                  isValidatingServerEndpoint: false,
                  isValidEndpoint: false,
                  canUpdateManifest: 'No'
                });
              });
          })
          .catch(function(error) {
            _this.setState({
              isValidatingServerEndpoint: false,
              isValidEndpoint: false,
              canGetManifest: 'No'
            });
          });
      })
      .catch(function(error) {
        _this.setState({
          isValidatingServerEndpoint: false,
          isValidEndpoint: false,
          canStoreManifest: 'No',
          returnsManifestId: 'No',
          canGetManifest: 'Not tested',
          canUpdateManifest: 'Not tested'
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
          reject('Getting manifest failed with error: ' + error);
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
  renderLocalStorageSavedEndpointErrorMessage: function() {
    return (
      <div id="local-storage-saved-endpoint-error-message" className="alert alert-danger" role="alert" ref="LocalStorageSavedEndpointErrorMessage">
        <button type="button" className="close" onClick={this.hideErrorMessage} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Unable to store the configured server endpoint to the browser's local storage.
      </div>
    );
  },
  displayErrorMessage: function() {
    var $LocalStorageSavedEndpointErrorMessage = $(ReactDOM.findDOMNode(this.refs.LocalStorageSavedEndpointErrorMessage));
    $LocalStorageSavedEndpointErrorMessage.fadeIn();
    setTimeout(function() {
      $LocalStorageSavedEndpointErrorMessage.fadeOut();
    }, 10000);
  },
  hideErrorMessage: function() {
    var $localStorageErrorMessage = $(ReactDOM.findDOMNode(this.refs.LocalStorageSavedEndpointErrorMessage));
    $localStorageErrorMessage.fadeOut();
  },
  displayValidationMessage: function() {
    if(this.state.isValidEndpoint !== undefined) {
      if(this.state.isValidEndpoint) {
        return(
          <div className="alert alert-success">
            <div><i className="fa fa-check-circle"></i> This server endpoint is valid!</div>
            <ul>
              <li><i className="fa fa-check"></i> Can store manifest: {this.state.canStoreManifest}</li>
              <li><i className="fa fa-check"></i> Returns a manifest id: {this.state.returnsManifestId}</li>
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
            <li><i className="fa fa-times"></i> Returns a manifest id: {this.state.returnsManifestId}</li>
            <li><i className="fa fa-times"></i> Can get manifest: {this.state.canGetManifest}</li>
            <li><i className="fa fa-times"></i> Can update manifest: {this.state.canUpdateManifest}</li>
          </ul>
        </div>
        );
      }
    } else {
      if(this.state.isValidatingServerEndpoint) {
        return(
          <div className="validate-server-endpoint-indicator"><i className="fa fa-circle-o-notch fa-spin"></i> Validating server endpoint...</div>
        );
      } else {
        return '';
      }
    }
  },
  displayServerEndpointConfiguration: function() {
    if(this.state.savedServerEndpoint === '' ) {
      return(
        <div>
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
              <input type="text" className="form-control" id="serverEndpointName" ref="serverEndpointName" placeholder="Choose a name for your server endpoint" />
              {this.state.isValidEndpointName === false &&
                <span className="error">Please enter a name for your server endpoint</span>
              }
            </div>
            <div className="form-group">
              <label htmlFor="serverEndpointUri">Server Endpoint URI:</label>
              <input type="text" className="form-control" id="serverEndpointUri" ref="serverEndpointUri" placeholder="Enter a URI that supports storing the Manifest JSON" />
              {this.state.isValidEndpointUri === false &&
                <span className="error">Please enter a valid URI for your server endpoint</span>
              }
            </div>
              <div className="server-endpoint-validation-message">
                {this.displayValidationMessage()}
                {this.renderLocalStorageSavedEndpointErrorMessage()}
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.saveSettings}><i className="fa fa-save"></i> Save Settings</button>
            </form>
          </div>
      );
    } else {
      return '';
    }
  },
  displayConfiguredServerEndpointFromLocalStorage: function() {
    if(this.state.savedServerEndpoint !== '') {
      return(
        <div>
          <p>The Following Server Endpoint has been Configured</p>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>URI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="active">
                <td>{this.state.savedServerEndpoint.serverEndpointName}</td>
                <td>{this.state.savedServerEndpoint.serverEndpointUri}</td>
              </tr>
            </tbody>
          </table>
          <a href="javascript:;" className="btn btn-danger" onClick={this.deleteConfiguredServerEndpoint}><i className="fa fa-trash"></i> Delete Configured Endpoint</a>
        </div>
      );
    } else {
      return '';
    }
  },
  deleteConfiguredServerEndpoint: function() {
    if(localStorage) {    
      localStorage.removeItem('savedServerEndpoint');
    }
    this.setState({
      savedServerEndpoint: '',
      isValidEndpoint: undefined
    });
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
              {this.displayServerEndpointConfiguration()}
              {this.displayConfiguredServerEndpointFromLocalStorage()}
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
