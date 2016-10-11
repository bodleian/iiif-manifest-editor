var React = require('react');

var SourceManifestMetadataDialog = React.createClass({
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Manifest Metadata</h4>
            </div>
            <div className="modal-body">
              <div className="source-manifest-metadata">
                <div className="row">
                  <div className="col-md-3 metadata-field-label">Manifest URI</div>
                  <div className="col-md-9 metadata-field-value">
                    <a href={this.props.manifestData.id} target="_blank">{this.props.manifestData.id}</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 metadata-field-label">Label</div>
                  <div className="col-md-9 metadata-field-value">
                    {this.props.manifestData.getLabel()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 metadata-field-label">Description</div>
                  <div className="col-md-9 metadata-field-value">
                    {this.props.manifestData.getDescription()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 metadata-field-label">Attribution</div>
                  <div className="col-md-9 metadata-field-value">
                    {this.props.manifestData.getAttribution()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 metadata-field-label">License</div>
                  <div className="col-md-9 metadata-field-value">
                    {this.props.manifestData.getLicense()}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3 metadata-field-label">Logo</div>
                  <div className="col-md-9 metadata-field-value">
                    {this.props.manifestData.getLogo()}
                  </div>
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

module.exports = SourceManifestMetadataDialog;
