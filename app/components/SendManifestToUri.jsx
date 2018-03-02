var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');

var SendManifestToUri = React.createClass({
  getInitialState: function() {
    var savedServerEndpoint = (localStorage && localStorage.getItem('savedServerEndpoint')) ? JSON.parse(localStorage.getItem('savedServerEndpoint')) : '';
    return {
      isSendingManifest: false,
      serverResponse: undefined,
      remoteManifestUri: undefined,
      savedServerEndpoint: savedServerEndpoint
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var savedServerEndpoint = (localStorage && localStorage.getItem('savedServerEndpoint')) ? JSON.parse(localStorage.getItem('savedServerEndpoint')) : '';
    this.setState({
      savedServerEndpoint: savedServerEndpoint
    });
  },
  sendManifestToUri: function() {
    this.setState({
      isSendingManifest: true,
      serverResponse: undefined,
      remoteManifestUri: undefined
    });
    var _this = this;
    // Store generated manifest JSON on configured server endpoint
    axios.post(this.state.savedServerEndpoint.serverEndpointUri, this.props.manifestData)
      .then(function(serverResponse) {
        // update Manifest URI (@id property) with returned bin ID from configured server endpoint
        _this.props.dispatch(actions.updateMetadataFieldValueAtPath(serverResponse.data.uri, '@id'));
        _this.setState({
          isSendingManifest: false,
          serverResponse: serverResponse,
          remoteManifestUri: serverResponse.data.uri
        });
        // Update manifest on configured server endpoint with new ID
        _this.updateRemoteManifestWithId(serverResponse.data.uri);
      })
      .catch(function(serverError) {
        _this.setState({
          isSendingManifest: false,
          serverResponse: serverError,
          remoteManifestUri: undefined
        });
      });
  },
  updateRemoteManifestWithId: function(manifestId) {
    this.setState({
      isSendingManifest: true,
      serverResponse: undefined,
    });
    var _this = this;
    // Use PUT method to update manifest on configured server endpoint
    axios.put(manifestId, this.props.manifestData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(function(serverResponse) {
        _this.setState({
          isSendingManifest: false,
          serverResponse: serverResponse,
          remoteManifestUri: manifestId
        });
      })
      .catch(function(serverError) {
        _this.setState({
          isSendingManifest: false,
          serverResponse: 'This manifest can not be updated. Try clicking the "Store Manifest on Server" button first'
         });
      });
  },
  resetValidationStatus: function() {
    // reset the validation status and validation object when closing the modal window
    this.setState({
      isSendingManifest: false,
      serverResponse: undefined
    });
  },
  displayServerResponse: function() {
    if(this.state.serverResponse !== undefined) {
      if(this.state.serverResponse.status === 201 || this.state.serverResponse.status === 200) {
        return(
          <div>
            <div className="alert alert-success">
              <div><i className="fa fa-check-circle"></i> Manifest successfully sent and stored!</div>
            </div>
            <div>
              <p>You may reference your remotely stored manifest from the following URI: <br />
              <a target="_blank" href={this.state.remoteManifestUri}>{this.state.remoteManifestUri}</a>
              </p>
            </div>
          </div>
        );
      } else {
        return(
        <div className="alert alert-danger">
          <div><i className="fa fa-times-circle-o"></i> Storing the manifest failed with the following error:</div>
          <div>{this.state.serverResponse}</div>
        </div>
        );
      }
    } else {
      if(this.state.isSendingManifest) {
        return(
          <div className="send-manifest-to-uri-indicator"><i className="fa fa-circle-o-notch fa-spin"></i> Sending manifest data...</div>
        );
      } else {
        return '';
      }
    }
  },
  renderUpdateManifestOnServerButton: function() {
    if(this.state.savedServerEndpoint !== '' && this.props.manifestData['@id'].startsWith(this.state.savedServerEndpoint.serverEndpointUri)) {
      return(
        <button type="button" className="btn btn-success" onClick={() => this.updateRemoteManifestWithId(this.props.manifestData['@id'])}><i className="fa fa-refresh"></i> Update Manifest on Server</button>
      );
    } else {
      return '';
    }
  },
  render: function() {
    return (
      <div>
        {(() => {
          if(this.state.savedServerEndpoint !== '') {
            return(
              <div className="send-manifest-to-uri-container">
                <p>The following server endpoint has been configured:</p>
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
                <br />
                <button type="button" className="btn btn-primary" onClick={this.sendManifestToUri}><i className="fa fa-cloud-upload"></i> Store Manifest on Server</button>
                {this.renderUpdateManifestOnServerButton()}
                <div className="remote-manifest-status-message">
                  {this.displayServerResponse()}
                </div>
              </div>
            );
          } else {
            return(
              <div className="alert alert-info">
                No Server Endpoint has been configured yet. Please click on the &nbsp;
                <a className="btn btn-default"><i className="fa fa-gear"></i></a> 
                &nbsp; button in the sidebar to configure a Server Endpoint for storing manifests remotely.
              </div>
            );
          }
        })()}
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData
    };
  }
)(SendManifestToUri);