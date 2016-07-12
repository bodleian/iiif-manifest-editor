var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var manifesto = require('manifesto.js');

var OpenRemoteManifestForm = React.createClass({
  fetchManifest: function(remoteManifestUrl) {
    var {dispatch} = this.props;
    dispatch(actions.startManifestFetch('MANIFEST_TYPE_REMOTE'));
    axios.get(remoteManifestUrl)
      .then(function(response) {
        dispatch(actions.setManifestoObject(manifesto.create(JSON.stringify(response.data))));
        dispatch(actions.setManifestData(response.data));
        dispatch(actions.completeManifestFetch());
        window.location = '#/edit';  // redirect to edit manifest on success
      })
      .catch(function(error) {
        dispatch(actions.setError('FETCH_REMOTE_MANIFEST_ERROR', 'Error loading remote manifest. Please provide a valid manifest URL.'));
        dispatch(actions.completeManifestFetch());
      });
  },
  onFormSubmit: function(e) {
    e.preventDefault();

    var remoteManifestUrl = this.refs.remoteManifestUrl.value;

    // TODO: implement validation of manifest here
    // on error, pass error message up to parent component
    // on success, pass the manifest data to the parent component

    if(remoteManifestUrl.length > 0) {
      // request the manifest data from the remote url
      this.fetchManifest(remoteManifestUrl);
    }
  },
  render: function() {
    return (
      <div>
        <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="remoteManifestUrl" className="col-sm-2 control-label">From URL</label>
            <div className="col-sm-8">
              <input required type="url" className="form-control" id="remoteManifestUrl" placeholder="Enter URL for manifest to load" ref="remoteManifestUrl" />
            </div>
            <div className="col-sm-2">
              <button id="loadRemoteManifestButton" type="submit" className="btn btn-default"><i className="fa fa-cloud-download"></i>{this.props.isFetchingRemoteManifest ? ' Loading...' : ' Load Manifest'}</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      isFetchingRemoteManifest: state.manifestReducer.isFetchingRemoteManifest
    };
  }
)(OpenRemoteManifestForm);
