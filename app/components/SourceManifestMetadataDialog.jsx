var React = require('react');

var SourceManifestMetadataDialog = React.createClass({
  getMetadataField: function(metadataFieldName, metadataFieldValue) {
    // Return strings directly
    if(typeof metadataFieldValue === 'string' || metadataFieldValue instanceof String) {
      return metadataFieldValue;
    }
    // Handle Arrays first, since they are also Objects
    else if(Array.isArray(metadataFieldValue)) {
      var arrayContainsLocalizedValues = false;
      for (var i = 0; i < metadataFieldValue.length; i++) {
        var value = metadataFieldValue[i];
        // Handle multilingual values => return English values only for now
        if (value['@language'] !== undefined) {
          arrayContainsLocalizedValues = true;
        }
        if (value['@language'] === 'en' || value['@language'] === 'eng') {
          return value['@value'];
        }
      }
      // If Array does not contain any @language values, return the contents as concatendated strings 
      if(!arrayContainsLocalizedValues) {
        var concatenatedValues = '';
        for (var i = 0; i < metadataFieldValue.length; i++) {
        var nonLocalizedValue = metadataFieldValue[i];
          if(nonLocalizedValue['@value'] !== undefined) {
            concatenatedValues += nonLocalizedValue['@value'] + '; '
          }
        }
        if (concatenatedValues !== '') {
          return concatenatedValues.slice(0,-2); // trim the trailing semicolon
        }
        else {
          return (
            <pre>{JSON.stringify(metadataFieldValue, null, 2)}</pre>
          );
        }
      }
    } 
    // Handle Objects that are not Arrays
    else if(metadataFieldValue instanceof Object) { 
      
      // try to get the @id property for certain fiels
      if((metadataFieldName === 'seeAlso' || metadataFieldName === 'logo') && metadataFieldValue['@id']) {
        return metadataFieldValue['@id'];
      
      // Stringify objects and return them as JSON text wrapped in <pre> tags
      } 
      else {
        return (
          <pre>{JSON.stringify(metadataFieldValue, null, 2)}</pre>
        );
      }

    }

    else {
      return false;
    }
  },
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
                  var manifestId = this.getMetadataField('id', this.props.manifestData['@id']);
                  console.log("manifestId returned: ", manifestId);
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
                  var label = this.getMetadataField('label', this.props.manifestData.label);
                  console.log("label returned: ", label);
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
                  var description = this.getMetadataField('description', this.props.manifestData.description);
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
                  var attribution = this.getMetadataField('attribution', this.props.manifestData.attribution);
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
                  var license = this.getMetadataField('license', this.props.manifestData.license);
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
                  var logo = this.getMetadataField('logo', this.props.manifestData.logo);
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
                  var related = this.getMetadataField('related', this.props.manifestData.related);
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
                  var seeAlso = this.getMetadataField('seeAlso', this.props.manifestData.seeAlso);
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
                  var viewingDirection = this.getMetadataField('viewingDirection', this.props.manifestData.viewingDirection);
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
                  var viewingHint = this.getMetadataField('viewingHint', this.props.manifestData.viewingHint);
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
                  var _this = this;
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
                                <div className="col-md-9 metadata-field-value">
                                  {_this.getMetadataField(metadataField.label, metadataField.value)}
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
