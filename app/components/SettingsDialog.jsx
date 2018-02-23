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
    this.validateEndpoint(this.refs.serverEndpointUri.value);

    // TODO: Save settings to local storage
  },
  validateEndpoint: function(uri) {
    this.setState({
      isValidatingServerEndpoint: true
    });

    var _this = this;

    // store test manifest
    this.storeTestManifest(uri)
      .then(function(response) {
        console.log('1. test passed: ', response);
        _this.setState({
          canStoreManifest: 'Yes'
        });

        // get test manifest
        _this.getTestManifest(uri)
          .then(function(response) {
            console.log('2. test passed: ', response);
            _this.setState({
              canGetManifest: 'Yes'
            });

            // update test manifest
            _this.updateTestManifest(uri)
              .then(function(response) {
                console.log('3. test passed: ', response);
                _this.setState({
                  isValidEndpoint: true,
                  isValidatingServerEndpoint: false,
                  isValidEndpoint: true,
                  canUpdateManifest: 'Yes'
                });

              }, function(error) {
                console.log('3. test failed: ', error);
                _this.setState({
                  isValidatingServerEndpoint: false,
                  isValidEndpoint: false,
                  canUpdateManifest: 'No'
                });
              });


          }, function(error) {
            console.log('2. test failed: ', error);
            _this.setState({
              isValidatingServerEndpoint: false,
              isValidEndpoint: false,
              canGetManifest: 'No'
            });

          });

      }, function(error) {
        console.log('1. test failed: ', error);
        _this.setState({
          isValidatingServerEndpoint: false,
          isValidEndpoint: false,
          canStoreManifest: 'No'
        });
      });
    // var deleteManifestStatus = this.deleteTestManifest(uri);  // TODO: delete test manifest?

    // this.setState({
    //   isValidEndpoint: storeManifestStatus && getManifestStatus && updateManifestStatus
    // });
  },
  storeTestManifest: function(uri) {
    console.log('storing manifest');

    return new Promise(function(resolve, reject) {
      if(true) {
        setTimeout(function() {
          resolve('storing manifest passed');
        }, 3000);
      }
      else {
        reject(Error('storing manifest failed'));
      }
    });

      // var that = this;
      // axios.post(uri, this.props.manifestData)  // does this block?
      //   .then(function(storeTestManifestResponse) {

      //     // check if it returns a unique ID
      //     if(typeof storeTestManifestResponse.data.uri !== 'string') {
      //       that.setState({
      //         validationError: 'Server endpoint did not return a valid ID',
      //         canStoreManifest: "false"
      //       });
      //     } else {
      //       // test manifest successfully stored and ID returned
      //       that.setState({
      //         canStoreManifest: "Yes"
      //       });
      //     })
      //   .catch(function(storeManifestError) {
      //     that.setState({
      //       validationError: 'Storing manifest failed with error: ' + storeManifestError,
      //     });
      //     // validation failed
      //     that.setState({
      //       canStoreManifest: "No"
      //     });
      //   });
      // if (true) {
      //   resolve("Stuff worked!");
      // }
      // else {
      //   reject(Error("It broke"));
      // }
  },
  getTestManifest: function(uri) {
    return new Promise(function(resolve, reject) {
      if(true) {
        setTimeout(function() {
          resolve('getting manifest passed');
        }, 3000);
      }
      else {
        reject(Error('getting manifest failed'));
      }
    });


    // // get stored test manifest from returned id
    // axios.get(storeTestManifestResponse.data.uri)
    //   .then(function(getManifestResponse){
    //     // successfully returned stored manifest
    //     that.setState({
    //       canGetManifest: "Yes"
    //     });
    //   .catch(function(getManifestError) {
    //     // could not GET stored test manifest
    //     that.setState({
    //       validationError: 'Getting manifest failed with error: ' + getManifestError,
    //     });
    //     that.setState({
    //       canGetManifest: "No"
    //     });
    //   });
    // }
  },
  updateTestManifest: function(uri) {
    return new Promise(function(resolve, reject) {
      if(false) {
        setTimeout(function() {
          resolve('updating manifest passed');
        }, 3000);
      }
      else {
        reject(Error('updating manifest failed'));
      }
    });

    // // update stored test manifest
    // axios.put(storeTestManifestResponse.data.uri, that.props.manifestData, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // })
    //   .then(function(updateManifestResponse) {
    //     // successfully updated manifest
    //     that.setState({
    //       canUpdateManifest: "Yes"
    //     });
    //   })
    //   .catch(function(updateManifestError) {
    //     // could not update stored test manifest
    //     that.setState({
    //       validationError: 'Updating the manifest failed with error: ' + updateManifestError,
    //     });
    //     that.setState({
    //       canUpdateManifest: "No"
    //     });
    //   });
    // })
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
