var React = require('react');
var {Link} = require('react-router');
var OpenLocalManifestForm = require('OpenLocalManifestForm');
var OpenRemoteManifestForm = require('OpenRemoteManifestForm');
var store = require('ReduxStore');

var OpenManifest = React.createClass({
  setManifestData: function(data) {
    // save the manifest data in the store so it can be used across all components
    store.dispatch({
      type: 'SET_MANIFEST_DATA',
      manifestData: data
    });

    // redirect to the edit page
    window.location.hash = '#/edit';
  },
  render: function() {
    return(
      <div className="open-manifest-container">
        <div className="open-manifest-form-container">
          <div className="open-manifest-form-header">
            <h3>Open Manifest</h3>
          </div>

          <div className="drop-manifest-container">
            <p>Drag and drop manifest here</p>
          </div>

          <OpenLocalManifestForm/>
          <OpenRemoteManifestForm onOpenRemoteManifest={this.setManifestData}/>

          <div className="row cancel-button-container">
            <div className="col-md-12">
              <Link to="/" className="btn btn-default">Cancel</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OpenManifest;
