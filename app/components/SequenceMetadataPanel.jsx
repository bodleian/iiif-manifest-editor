var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');

var SequenceMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    return (
      <div className="metadata-sidebar-panel">
        <div className="row">
          <div className="col-md-3 metadata-field-label">Sequence Label</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={sequence.getLabel()} path="sequences/0/label" onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
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
)(SequenceMetadataPanel);
