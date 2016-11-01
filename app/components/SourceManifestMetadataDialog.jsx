var React = require('react');
var Utils = require('Utils');

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
                  var manifestId = Utils.getMetadataField('id', this.props.manifestData['@id']);
                  if(manifestId) {
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
                  var label = Utils.getMetadataField('label', this.props.manifestData.label);
                  if(label) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Label</div>
                        <div className="col-md-9 metadata-field-value">{label}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var description = Utils.getMetadataField('description', this.props.manifestData.description);
                  if(description) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Description</div>
                        <div className="col-md-9 metadata-field-value">{description}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var attribution = Utils.getMetadataField('attribution', this.props.manifestData.attribution);
                  if(attribution) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Attribution</div>
                        <div className="col-md-9 metadata-field-value">{attribution}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var license = Utils.getMetadataField('license', this.props.manifestData.license);
                  if(license) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">License</div>
                        <div className="col-md-9 metadata-field-value">{license}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var logo = Utils.getMetadataField('logo', this.props.manifestData.logo);
                  if(logo) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Logo</div>
                        <div className="col-md-9 metadata-field-value"><img src={logo} alt={logo} className="source-attribution-logo" /></div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var related = Utils.getMetadataField('related', this.props.manifestData.related);
                  if(related) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Related</div>
                        <div className="col-md-9 metadata-field-value">{related}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var seeAlso = Utils.getMetadataField('seeAlso', this.props.manifestData.seeAlso);
                  if(seeAlso) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">See Also</div>
                        <div className="col-md-9 metadata-field-value"><a href={seeAlso} target="_blank">{seeAlso}</a></div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var viewingDirection = Utils.getMetadataField('viewingDirection', this.props.manifestData.viewingDirection);
                  if(viewingDirection) {
                    return (
                      <div className="row metadata-field-row">
                        <div className="col-md-3 metadata-field-label">Viewing Direction</div>
                        <div className="col-md-9 metadata-field-value">{viewingDirection}</div>
                      </div>
                    );
                  }
                })()}
                {(() => {
                  var viewingHint = Utils.getMetadataField('viewingHint', this.props.manifestData.viewingHint);
                  if(viewingHint) {
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
                                  {Utils.getMetadataField(metadataField.label, metadataField.label)}
                                </div>
                                <div className="col-md-9 metadata-field-value">
                                  {Utils.getMetadataField(metadataField.label, metadataField.value)}
                                </div>
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
