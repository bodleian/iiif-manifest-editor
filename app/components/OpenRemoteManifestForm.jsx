var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var OpenRemoteManifestForm = React.createClass({
  fetchManifest: function(remoteManifestUrl) {
    var {dispatch} = this.props;
    dispatch(actions.startManifestFetch());
    axios.get(remoteManifestUrl)
      .then(function(response) {
        dispatch(actions.completeManifestFetch(remoteManifestUrl));
        dispatch(actions.setManifestData(response));
        window.location = '#/edit';  // redirect to edit manifest on success
      })
      .catch(function(error) {
        console.log(error);
        dispatch(actions.setLoadRemoteManifestError());
      });
  },
  onFormSubmit: function(e) {
    e.preventDefault();

    var remoteManifestUrl = this.refs.remoteManifestUrl.value;

    // TODO: implement validation of manifest here
    // on error, pass error message up to parent component
    // on success, pass the manifest data to the parent component

    if(remoteManifestUrl.length > 0) {
      this.refs.remoteManifestUrl.value = '';
      // request the manifest data from the remote url
      this.fetchManifest(remoteManifestUrl);
    }
  },
  render: function() {
    var {isFetching, fetchRemoteManifestError} = this.props;
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label htmlFor="remoteManifestUrl" className="col-sm-2 control-label">From URL</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="remoteManifestUrl" placeholder="Enter URL for manifest to load" ref="remoteManifestUrl" defaultValue="http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/manifest.json"/>
          </div>
          <div className="col-sm-2">
            <button id="loadRemoteManifestButton" type="submit" className="btn btn-default">{isFetching ? 'Loading...' : 'Load Manifest'}</button>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      isFetching: state.isFetching,
      fetchRemoteManifestError: state.fetchRemoteManifestError
    };
  }
)(OpenRemoteManifestForm);