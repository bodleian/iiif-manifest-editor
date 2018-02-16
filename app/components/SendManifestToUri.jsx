var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');

var SendManifestToUri = React.createClass({
  getInitialState: function() {
    return {
      isSendingManifest: false,
      serverResponse: undefined,
      remoteManifestUri: undefined
    };
  },
  sendManifestToUri: function() {
    this.setState({
      isSendingManifest: true,
      serverResponse: undefined,
      remoteManifestUri: undefined
    });
    var that = this;
    // Store generated manifest JSON on myjson.com
    // TODO: support arbitrary endpoints, get URI from user input
    axios.post("https://api.myjson.com/bins", this.props.manifestData)
      .then(function(myJsonResponse) {
        // update Manifest URI (@id property) with returned bin ID from myjson.com
        that.props.dispatch(actions.updateMetadataFieldValueAtPath(myJsonResponse.data.uri, '@id'));
        that.setState({
          isSendingManifest: false,
          serverResponse: myJsonResponse,
          remoteManifestUri: myJsonResponse.data.uri
        });
        // Update manifest on myJson with new ID
        that.updateRemoteManifestWithId(myJsonResponse.data.uri);
      })
      .catch(function(myJsonRequestError) {
        that.setState({
          isSendingManifest: false,
          serverResponse: myJsonRequestError,
          remoteManifestUri: undefined
        });
      });
  },
  updateRemoteManifestWithId: function(manifestId) {
    this.setState({
      isSendingManifest: true,
      serverResponse: undefined,
    });
    var that = this;
    // Use PUT method to update manifest on myJson bin – PUT /bins/:id
    axios.put(manifestId, this.props.manifestData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(function(myJsonResponse) {
        that.setState({
          isSendingManifest: false,
          serverResponse: myJsonResponse
        });
      })
      .catch(function(myJsonRequestError) {
        console.log("Updating the manifest failed");
        that.setState({
          isSendingManifest: false,
          serverResponse: myJsonRequestError
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
          <div>{this.state.serverResponse.error}</div>
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
  render: function() {
    return (
      <div>
        <h3>Store Manifest Remotely</h3>
        <label htmlFor="remoteEndpoint">Server URI: </label>
        <input type='text' name="remoteEndpoint" ref='remoteEndpoint' className="form-control" placeholder="Enter a URI that stores the manifest JSON" defaultValue="https://api.myjson.com/bins" />
        <br />
        <button type="button" className="btn btn-primary" onClick={this.sendManifestToUri}><i className="fa fa-arrow-circle-o-right"></i> <i className="fa fa-server"></i> Send to Server URI</button>
        <div className="remote-manifest-status-message">
          {this.displayServerResponse()}
        </div>
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