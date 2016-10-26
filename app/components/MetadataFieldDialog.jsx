var React = require('react');

var MetadataFieldDialog = React.createClass({
  render: function() {
    return (
      <div className="modal fade metadata-field-dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">JSON Metadata for "{this.props.metadataField.label}" Field</h4>
            </div>
            <div className="modal-body">
              <div className="row metadata-field-row">
                <div className="col-md-12 metadata-field-value">
                  <pre>{this.props.metadataField.value}</pre>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MetadataFieldDialog;