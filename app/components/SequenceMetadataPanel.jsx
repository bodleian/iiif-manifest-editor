var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var Utils = require('Utils');

var SequenceMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    return (
      <div className="metadata-sidebar-panel">
        <dl>
          <dt className="metadata-field-label">Sequence Label</dt>
          <dd className="metadata-field-value">
            <EditableTextArea fieldValue={Utils.getLocalizedPropertyValue(sequence.getLabel())} path="sequences/0/label" onUpdateHandler={this.saveMetadataFieldToStore}/>
          </dd>
        </dl>
        <div className="row">
          <div className="col-md-12">
            <div className="btn-group">
              <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                Set Viewing Direction <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" role="menu">
                <li><a href="javascript:;" onClick={() => this.saveMetadataFieldToStore('left-to-right', 'viewingDirection')}>Left to Right</a></li>
                <li><a href="javascript:;" onClick={() => this.saveMetadataFieldToStore('right-to-left', 'viewingDirection')}>Right to Left</a></li>
              </ul>
            </div>
          </div>
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
