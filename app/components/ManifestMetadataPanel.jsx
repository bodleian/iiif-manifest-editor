var React = require('react');
var {connect} = require('react-redux');
var EditableLabel = require('EditableLabel');

var ManifestMetadataPanel = React.createClass({
  getDescriptionForLanguageCode: function(descriptions, languageCode) {
    for(var index = 0; index < descriptions.length; index++) {
      var description = descriptions[index];
      if(description['@language'] === languageCode) {
        return description['@value'];
      }
    }
    return undefined;
  },
  extractManifestMetadata: function() {
    var {manifestData} = this.props;
    if(manifestData.data !== undefined) {
      return {
        attribution: manifestData.data.attribution,
        label: manifestData.data.label,
        description: this.getDescriptionForLanguageCode(manifestData.data.description, 'en'),
        license: manifestData.data.license
      };
    }
  },
  render: function() {
    var metadata = this.extractManifestMetadata();
    return (
      <div className="metadata-sidebar-panel">
        <div className="row">
          <div className="col-md-3 metadata-field-label">Label:</div>
          <EditableLabel classNames="col-md-9 metadata-field-value" value={metadata.label}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Attribution:</div>
          <EditableLabel classNames="col-md-9 metadata-field-value" value={metadata.attribution}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Description:</div>
          <EditableLabel classNames="col-md-9 metadata-field-value" value={metadata.description}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">License:</div>
          <EditableLabel classNames="col-md-9 metadata-field-value" value={metadata.license}/>
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
)(ManifestMetadataPanel);
