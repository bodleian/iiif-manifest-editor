var React = require('react');

var SourceManifestMetadataDialog = React.createClass({
  render: function() {
    return (
      <div className="modal fade manifest-metadata-dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Manifest Metadata</h4>
            </div>
            <div className="modal-body">
              <div className="source-manifest-metadata">
                {(() => {
                  var manifestId = this.props.manifestData.id;
                  if(manifestId !== undefined && manifestId !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Manifest URI</div>
                        <div className="col-md-9 metadata-field-value">
                          <a href={manifestId} target="_blank">{manifestId}</a>
                        </div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var label = this.props.manifestData.label;
                  if(label !== undefined && label !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Label</div>
                        <div className="col-md-9 metadata-field-value">{label}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var description = this.props.manifestData.description;
                  if(description !== undefined && description !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Description</div>
                        <div className="col-md-9 metadata-field-value">{description}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var attribution = this.props.manifestData.attribution;
                  if(attribution !== undefined && attribution !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Attribution</div>
                        <div className="col-md-9 metadata-field-value">{attribution}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var license = this.props.manifestData.license;
                  if(license !== undefined && license !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">License</div>
                        <div className="col-md-9 metadata-field-value">{license}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var logo = this.props.manifestData.logo;
                  if(logo !== undefined && logo !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Logo</div>
                        <div className="col-md-9 metadata-field-value"><img src={logo} alt={logo} className="source-attribution-logo" /></div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var related = this.props.manifestData.related;
                  if(related !== undefined && related !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Related</div>
                        <div className="col-md-9 metadata-field-value">{related}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var seeAlso = this.props.manifestData.seeAlso;
                  if(seeAlso !== undefined && seeAlso !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">See Also</div>
                        <div className="col-md-9 metadata-field-value">{seeAlso}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var viewingDirection = this.props.manifestData.viewingDirection;
                  if(viewingDirection !== undefined && viewingDirection !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Viewing Direction</div>
                        <div className="col-md-9 metadata-field-value">{viewingDirection}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var viewingHint = this.props.manifestData.viewingHint;
                  if(viewingHint !== undefined && viewingHint !== '') {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Viewing Hint</div>
                        <div className="col-md-9 metadata-field-value">{viewingHint}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var metadataFields = this.props.manifestData.metadata;
                  if(metadataFields !== undefined) {
                    return (
                      <div>
                        {
                          Object.keys(metadataFields).map(function(fieldIndex) {
                            var metadataField = metadataFields[fieldIndex];
                            return (
                              <div className="row metadata-field-row" key={fieldIndex}>
                                <div className="col-md-3 metadata-field-label">
                                  {metadataField.label}
                                </div>
                                {(() => {
                                  if(typeof metadataField.value === 'string' || metadataField.value instanceof String) {
                                    return (
                                      <div className="col-md-9 metadata-field-value">
                                        {metadataField.value}
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className="col-md-9 metadata-field-value">
                                        <pre>{JSON.stringify(metadataField.value, null, 2)}</pre>
                                      </div>
                                    );
                                  }
                                })()}
                              </div>
                            );
                          })
                        }
                      </div>
                    );
                  }
                })()}
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
