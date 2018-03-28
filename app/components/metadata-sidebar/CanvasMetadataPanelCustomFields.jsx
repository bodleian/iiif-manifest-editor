var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var EditablePrimitiveMetadataPropertyCard = require('EditablePrimitiveMetadataPropertyCard');
var EditableObjectMetadataPropertyCard = require('EditableObjectMetadataPropertyCard');
var Utils = require('Utils');

var CanvasMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    var canvas = null;
    var canvasMetadataFields = [];
    if(this.props.selectedCanvasId !== undefined) {
      canvas = this.getCanvasById(this.props.selectedCanvasId);
      canvasMetadataFields = canvas.__jsonld.metadata;
    }
    return {
      metadataFields: canvas !== null && Array.isArray(canvasMetadataFields) ? canvasMetadataFields : []
    }
  },
  componentWillMount: function() {
    // initialize the metadata field list with the fields defined in the 'metadata' block of the canvas
    if(this.props.selectedCanvasId !== undefined) {
      var manifest = this.props.manifestoObject;
      var sequence = manifest.getSequenceByIndex(0);
      var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
      var canvasMetadataFields = canvas.__jsonld.metadata;
      if(canvas !== null) {
        var canvasIndex = sequence.getCanvasIndexById(canvas.id);
        var canvasMetadataPath = "sequences/0/canvases/" + canvasIndex + "/metadata";
        if(canvasMetadataFields !== undefined && canvasMetadataFields.length > 0) {
          this.props.dispatch(actions.updateMetadataFieldValueAtPath(canvasMetadataFields, canvasMetadataPath));
        } else {
          this.props.dispatch(actions.updateMetadataFieldValueAtPath([], canvasMetadataPath));
        }
      }
    }
  },
  // componentDidUpdate: function(prevProps, prevState) {
    // update the metadata field list with the value of the 'metadata' block of the canvas
    // if(currentCanvasMetadataFields !== previousCanvasMetadataFields) {
    //   this.setState({
    //     metadataFields: currentCanvasMetadataFields
    //   });
    // }
  // },
  getCanvasById: function(canvasId) {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    return sequence.getCanvasById(canvasId);
  },
  addMetadataProperty: function(fieldLabel, fieldValue, addPath) {
    this.props.dispatch(actions.addMetadataFieldToListAtPath(fieldValue, addPath));
  },
  updateMetadataPropertyValue: function(fieldType, updatePath, fieldName, fieldValue) {
    var modifiedUpdatePath = (fieldType === 'object') ? updatePath + '/' + fieldName : updatePath;
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, modifiedUpdatePath));
  },
  deleteMetadataProperty: function(fieldIndex, deletePath) {
    this.props.dispatch(actions.deleteMetadataFieldFromListAtPathAndIndex(deletePath, fieldIndex));
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
    if(canvas !== null) {
      var selectedCanvasIndex = sequence.getCanvasIndexById(canvas.id);
      var canvasMetadataPath = "sequences/0/canvases/" + selectedCanvasIndex + "/metadata";
      var _this = this;
      return (
        <div>
          {
            this.state.metadataFields.map((metadataField, fieldIndex) => {
              if(metadataField.value !== undefined) {
                if(Array.isArray(metadataField.value)) {
                  return metadataField.value.map((propertyValue, propertyIndex) => {
                    // array of objects is supported => e.g. { "label": "", "value": [{}, {}, {}] }
                    // Note: array of strings is not supported => e.g. { "label": "", "value": ["", "", ""] }
                    // Note: array of arrays is not supported => e.g. { "label": "", "value": [ [ {}, {}, {} ] ] }
                    if(propertyValue instanceof Object) {
                      return (
                        <EditableObjectMetadataPropertyCard
                          key={fieldIndex + '-' + propertyIndex}
                          label={Utils.getMetadataField('label', metadataField.label)}
                          value={propertyValue}
                          isMultiLingual={true}
                          isEditableLabel
                          updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'string', canvasMetadataPath + '/' + fieldIndex + '/label')}
                          updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'object', canvasMetadataPath + '/' + fieldIndex + '/value/' + propertyIndex)}
                          deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, canvasMetadataPath + '/' + fieldIndex + '/value')}
                        />
                      );
                    }
                  });
                }
                else if(metadataField.value instanceof Object) {
                  // object is supported => e.g. { "label": "", "value": {} }
                  return (
                    <EditableObjectMetadataPropertyCard
                      key={fieldIndex}
                      label={metadataField.label}
                      value={metadataField.value}
                      isMultiLingual={true}
                      isEditableLabel
                      updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'string', canvasMetadataPath + '/' + fieldIndex + '/label')}
                      updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'object', canvasMetadataPath + '/' + fieldIndex + '/value')}
                      deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, canvasMetadataPath)}
                    />
                  );
                }
                else {
                  return (
                    <EditablePrimitiveMetadataPropertyCard
                      key={fieldIndex}
                      label={metadataField.label}
                      value={metadataField.value}
                      isEditableLabel
                      updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'string', canvasMetadataPath + '/' + fieldIndex + '/label')}
                      updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'string', canvasMetadataPath + '/' + fieldIndex + '/value')}
                      deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, canvasMetadataPath)}
                    />
                  );
                }
              }
            })
          }
          <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={() => _this.addMetadataProperty('Label', { 'label': 'Label', 'value': 'Value' }, canvasMetadataPath)}>
            <span className="fa fa-plus"></span> Add metadata field
          </button>

          <button type="button" className="btn btn-default" title="Add language metadata field" onClick={() => _this.addMetadataProperty('Label', { 'label': 'Label', 'value': { '@value': '', '@language': '' } }, canvasMetadataPath)}>
            <span className="fa fa-plus"></span> Add language metadata field
          </button>
        </div>
      );
    } else if(this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length < 1) {
      return (
        <div>
          This sequence does not have any canvases.
        </div>
      );
    } else {
      return (
        <div>
          The selected canvas has been deleted.
        </div>
      );
    }
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData,
      selectedCanvasId: state.manifestReducer.selectedCanvasId
    };
  }
)(CanvasMetadataPanelCustomFields);