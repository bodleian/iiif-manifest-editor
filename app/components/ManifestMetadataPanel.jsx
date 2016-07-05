var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var manifesto = require('manifesto.js');
var EditableTextArea = require('EditableTextArea');

var ManifestMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  render: function() {
    var manifest = manifesto.create(JSON.stringify(this.props.manifestData));
    return (
      <div className="metadata-sidebar-panel">
        <div className="row">
          <div className="col-md-3 metadata-field-label">Label:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={manifest.getLabel()} path="label" onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Attribution:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={manifest.getAttribution()} path="attribution" onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Description:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={manifest.getDescription()} path="description/1/label" onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">License:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={manifest.getLicense()} path="license" onUpdateHandler={this.saveMetadataFieldToStore}/>
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
