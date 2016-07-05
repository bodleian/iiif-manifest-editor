var React = require('react');
var {connect} = require('react-redux');
var manifesto = require('manifesto.js');
var EditableTextArea = require('EditableTextArea');

var SequenceMetadataPanel = React.createClass({
  render: function() {
    var {manifestData} = this.props;
    var manifestoObject = manifesto.create(JSON.stringify(manifestData));
    var sequence = manifestoObject.getSequenceByIndex(0);

    return (
      <div className="metadata-sidebar-panel">
        <div className="row">
          <div className="col-md-3 metadata-field-label">Sequence Label:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="label" fieldValue={sequence.getLabel()} onUpdateHandler={()=>{}}/>
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
)(SequenceMetadataPanel);
