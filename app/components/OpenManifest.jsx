var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var OpenLocalManifestForm = require('OpenLocalManifestForm');
var OpenRemoteManifestForm = require('OpenRemoteManifestForm');

var OpenManifest = React.createClass({
  displayManifestFetchErrors: function() {
    var {error} = this.props;
    if(error !== undefined) {
      return (
        <div className="alert alert-danger">
          {error.message}
        </div>
      );
    }
  },
  render: function() {
    return(
      <div className="container open-manifest-container">
        <div className="open-manifest-form-container">
          <div className="open-manifest-form-header">
            <h3>Open Manifest</h3>
          </div>

          {this.displayManifestFetchErrors()}

          <div className="drop-manifest-container">
            <p>Drag and drop manifest here</p>
          </div>

          <OpenLocalManifestForm/>
          <OpenRemoteManifestForm/>

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

module.exports = connect(
  (state) => {
    return {
      error: state.manifestReducer.error
    };
  }
)(OpenManifest);
