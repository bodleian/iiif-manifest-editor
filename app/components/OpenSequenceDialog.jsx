var React = require('react');
var axios = require('axios');

var OpenSequenceDialog = React.createClass({
  getInitialState: function() {
    return {
      manifestFetchError: undefined
    };
  },
  fetchRemoteManifest: function(remoteManifestUrl) {
    var that = this;
    axios.get(remoteManifestUrl)
      .then(function(response) {
        // add the requested manifest data to the list of source manifests in the state
        that.props.onSuccessHandler(JSON.stringify(response.data));

        // clear the remote manifest url text field
        that.refs.remoteManifestUrl.value = '';

        // reset the error message in the state
        that.setState({
          manifestFetchError: undefined
        });
      })
      .catch(function(error) {
        // set the error message in the state
        that.setState({
          manifestFetchError: 'Invalid remote manifest URL'
        });
      });
  },
  displayErrorMessage: function() {
    if(this.state.manifestFetchError !== undefined) {
      return(
        <div className="alert alert-danger">
          <div>{this.state.manifestFetchError}</div>
        </div>
      );
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
              {this.displayErrorMessage()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.fetchRemoteManifest(this.refs.remoteManifestUrl.value)}><i className="fa fa-folder-open"></i> Open</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OpenSequenceDialog;