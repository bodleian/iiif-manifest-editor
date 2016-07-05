var React = require('react');
var {connect} = require('react-redux');
var EditableTextArea = require('EditableTextArea');
var actions = require('actions');
var manifesto = require('manifesto.js');

var ManifestMetadataPanel = React.createClass({
  extractManifestMetadata: function() {
    var {manifestData} = this.props;
    var manifestoObject = manifesto.create(JSON.stringify(manifestData));
    return {
      label: manifestoObject.getLabel(),
      attribution: manifestoObject.getAttribution(),
      description: manifestoObject.getDescription('de'),
      license: manifestoObject.getLicense()
    };
  },
  saveMetadataFieldToStore: function(fieldName, fieldValue) {
    var {dispatch} = this.props;
    dispatch(actions.saveMetadataField(fieldName, fieldValue));
  },
  render: function() {
    var metadata = this.extractManifestMetadata();
    return (
      <div className="metadata-sidebar-panel">
        <div className="row">
          <div className="col-md-3 metadata-field-label">Label:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="label" fieldValue={metadata.label} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Attribution:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="attribution" fieldValue={metadata.attribution} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Description:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="description" fieldValue={metadata.description} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">License:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="license" fieldValue={metadata.license} onUpdateHandler={this.saveMetadataFieldToStore}/>
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
