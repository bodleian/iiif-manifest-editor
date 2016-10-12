var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

var OpenSequenceDialog = React.createClass({
  getInitialState: function() {
    return {
      isFetchingRemoteManifest: false,
      manifestFetchError: undefined
    };
  },
  fetchRemoteManifest: function(remoteManifestUrl) {
    this.setState({
      isFetchingRemoteManifest: true,
      manifestFetchError: undefined
    });
    var _this = this;
    axios.get(remoteManifestUrl)
      .then(function(response) {
        // reset the error message and the isFetchingRemoteManifestStatus in the state
        _this.setState({
          manifestFetchError: undefined,
          isFetchingRemoteManifest: false
        });

        // add the requested manifest data to the list of source manifests in the state
        _this.props.onSuccessHandler(JSON.stringify(response.data));

        // clear the remote manifest url text field
        _this.refs.remoteManifestUrl.value = '';
        
        // close modal window
        var $openSequenceDialog = $(ReactDOM.findDOMNode(_this));
        $openSequenceDialog.modal('hide');
      })
      .catch(function(error) {
        // set the error message in the state and reset isFetchingRemoteManifestStatus
        _this.setState({
          manifestFetchError: 'Invalid remote manifest URL',
          isFetchingRemoteManifest: false
        });
      });
  },
  displayErrorMessage: function() {
    if(this.state.manifestFetchError !== undefined) {
      return(
        <div className="alert alert-danger remote-manifest-url-load-error">
          <div>{this.state.manifestFetchError}</div>
        </div>
      );
    } else {
      return '';
    }
  },
  displayFetchRemoteManifestStatus: function() {
    if(this.state.isFetchingRemoteManifest) {
      return(
        <div className="fetch-remote-manifest-indicator"><i className="fa fa-circle-o-notch fa-spin"></i> Loading Manifest...</div>
      );
    } else {
      return '';
    }
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Open Sequence</h4>
            </div>
            <div className="modal-body">
              <input type="text" ref="remoteManifestUrl" className="form-control" placeholder="Enter a remote manifest URL" />
              <div className="fetch-remote-manifest-status">
                {this.displayFetchRemoteManifestStatus()}
              </div>
              {this.displayErrorMessage()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.fetchRemoteManifest(this.refs.remoteManifestUrl.value)}><i className="fa fa-folder-open"></i> Open</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OpenSequenceDialog;