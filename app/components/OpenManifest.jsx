var React = require('react');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var OpenLocalManifestForm = require('OpenLocalManifestForm');
var OpenRemoteManifestForm = require('OpenRemoteManifestForm');

var OpenManifest = React.createClass({
  render: function() {
    var {manifestData} = this.props;
    var editManifestButtonClasses = (manifestData !== undefined) ? 'btn btn-default' : 'btn btn-default disabled';
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
          <OpenRemoteManifestForm/>

          <div className="row cancel-button-container">
            <div className="col-md-12">
              <Link to="/edit" className={editManifestButtonClasses}>Edit Manifest</Link>&nbsp;&nbsp;
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
      manifestData: state.manifestReducer.manifestData
    };
  }
)(OpenManifest);