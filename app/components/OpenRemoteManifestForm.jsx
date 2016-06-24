var React = require('react');
var axios = require('axios');

var actions = require('./../actions/index');
var store = require('./../store/configureStore').configure();

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  if (state.manifest.isFetching) {
    document.getElementById('loadRemoteManifestButton').innerHTML = 'Loading...';
  } else if (state.manifest.manifestData) {
    // TODO: redirect to /edit
  }
});

var OpenRemoteManifestForm = React.createClass({
  fetchManifest: function(remoteManifestUrl) {
    store.dispatch(actions.startManifestFetch());
    var that = this;
    axios.get(remoteManifestUrl).then(function (res) {
      store.dispatch(actions.completeManifestFetch(remoteManifestUrl));
      store.dispatch(actions.setManifestData(res));
      that.props.onSuccess();
    });
    // TODO: display error messages on form
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
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label htmlFor="remoteManifestUrl" className="col-sm-2 control-label">From URL</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="remoteManifestUrl" placeholder="Enter URL for manifest to load" ref="remoteManifestUrl"/>
          </div>
          <div className="col-sm-2">
            <button id="loadRemoteManifestButton" type="submit" className="btn btn-default">Load Manifest</button>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = OpenRemoteManifestForm;
