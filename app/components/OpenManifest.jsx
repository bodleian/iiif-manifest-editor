var React = require('react');
var {Link} = require('react-router');
var OpenLocalManifestForm = require('OpenLocalManifestForm');
var OpenRemoteManifestForm = require('OpenRemoteManifestForm');

var OpenManifest = React.createClass({
  getInitialState: function() {
    return {
      manifestData: null
    }
  },
  setManifestData: function(data) {
    console.log(data);
    this.setState({
      manifestData: data
    });

    // TODO: set the state of the Main component with the manifest data so it can be used across all components

    // TODO: load the edit manifest component and pass the manifestData into it

    window.location.hash = '#/edit';
  },
  // TODO: create a handler function to set the state of the manifestData returned from the openLocalManifestForm
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
