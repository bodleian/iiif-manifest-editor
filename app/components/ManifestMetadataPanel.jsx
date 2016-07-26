var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');

var ManifestMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    return (
      <div className="metadata-sidebar-panel">
        <dl>
          <dt className="metadata-field-label">Label:</dt>
          <dd>
            <EditableTextArea classNames="metadata-field-value" fieldValue={manifest.getLabel()} path="label" onUpdateHandler={this.saveMetadataFieldToStore}/>
          </dd>
        </dl>
        <dl>
          <dt className="metadata-field-label">Attribution:</dt>
          <dd>
            <EditableTextArea classNames="metadata-field-value" fieldValue={manifest.getAttribution()} path="attribution" onUpdateHandler={this.saveMetadataFieldToStore}/>
          </dd>
        </dl>
        <dl>
          <dt className="metadata-field-label">Description:</dt>
          <dd>
            <EditableTextArea classNames="metadata-field-value" fieldValue={manifest.getDescription()} path="description/0/@value" onUpdateHandler={this.saveMetadataFieldToStore}/>
          </dd>
        </dl>
        <dl>
          <dt className="metadata-field-label">License:</dt>
          <dd>
            <EditableTextArea classNames="metadata-field-value" fieldValue={manifest.getLicense()} path="license" onUpdateHandler={this.saveMetadataFieldToStore}/>
          </dd>
        </dl>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData
    };
  }
)(ManifestMetadataPanel);
