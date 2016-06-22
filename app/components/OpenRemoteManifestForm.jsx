var React = require('react');

var OpenRemoteManifestForm = React.createClass({
  requestManifestFromUrl: function(url) {
    var that = this;
    $.get(url, function(data) {
      // pass the manifest data to the parent component
      that.props.onOpenRemoteManifest(data);
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
      this.requestManifestFromUrl(remoteManifestUrl);
    }
  },
  render: function() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label htmlFor="remoteManifestUrl" className="col-sm-2 control-label">From URL</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="remoteManifestUrl" placeholder="Enter URL for manifest to load" ref="remoteManifestUrl" defaultValue="http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/manifest.json"/>
          </div>
          <div className="col-sm-2">
            <button type="submit" className="btn btn-default">Load Manifest</button>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = OpenRemoteManifestForm;