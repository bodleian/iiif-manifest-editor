var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var ValidateManifest = require('ValidateManifest');

var ValidateManifestDialog = React.createClass({
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Validate Manifest</h4>
            </div>
            <div className="modal-body">
              <ValidateManifest />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.resetValidationStatus} data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
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
)(ValidateManifestDialog);
