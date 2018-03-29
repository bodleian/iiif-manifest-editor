var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var EditablePrimitiveMetadataPropertyCard = require('EditablePrimitiveMetadataPropertyCard');
var EditableObjectMetadataPropertyCard = require('EditableObjectMetadataPropertyCard');
var Utils = require('Utils');

var CanvasMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    return {
      metadataFields: this.getMetadataPropertyForCanvasWithId(this.props.manifestoObject, this.props.manifestData, this.props.selectedCanvasId)
    }
  },
  componentWillMount: function() {
    var canvasIndex = this.getCanvasIndexByCanvasId(this.props.selectedCanvasId);
    if(canvasIndex !== undefined) {
      var metadataProperty = this.getMetadataPropertyForCanvasWithId(this.props.manifestoObject, this.props.manifestData, this.props.selectedCanvasId);
      if(metadataProperty === undefined) {
        var addPath = 'sequences/0/canvases/' + this.getCanvasIndexByCanvasId(this.props.selectedCanvasId);
        this.props.dispatch(actions.addMetadataFieldAtPath('metadata', [], addPath));
        this.setState({ metadataFields: [] });
      } else {
        var updatePath = 'sequences/0/canvases/' + canvasIndex + '/metadata';
        this.props.dispatch(actions.updateMetadataFieldValueAtPath(metadataProperty, updatePath));
        this.setState({ metadataFields: metadataProperty });
      }
    }
  },
  componentWillReceiveProps: function(nextProps) {
    // Note: The panel needs to re-render whenever the current canvas changes or when a new metadata field is added for the current canvas.
    // For whatever reason, the "current prop", "previous prop", and "next prop" are always equal in every update lifecycle method.
    // In order to recognize that a metadata field has been updated in the panel, the metadata fields in the state are compared with the metadata fields in the new prop.
    var updatedMetadataProperty = this.getMetadataPropertyForCanvasWithId(nextProps.manifestoObject, nextProps.manifestData, nextProps.selectedCanvasId);
    if(this.props.selectedCanvasId !== nextProps.selectedCanvasId ||
       JSON.stringify(this.state.metadataFields) !== JSON.stringify(updatedMetadataProperty)) {
      this.setState({ metadataFields: updatedMetadataProperty });
    }
  },
  getCanvasIndexByCanvasId: function(manifestoObject, canvasId) {
    var canvasIndex = undefined;
    if(canvasId !== undefined) {
      var sequence = manifestoObject.getSequenceByIndex(0);
      var canvas = sequence.getCanvasById(canvasId);
      if(canvas !== undefined) {
        canvasIndex = sequence.getCanvasIndexById(canvasId);
      }
    }
    return canvasIndex;
  },
  getMetadataPropertyForCanvasWithId: function(manifestoObject, manifestData, canvasId) {
    if(canvasId !== undefined) {
      var canvasIndex = this.getCanvasIndexByCanvasId(manifestoObject, canvasId);
      if(canvasIndex !== undefined) {
        var metadataProperty = manifestData.sequences[0].canvases[canvasIndex].metadata;

        // Note: If the 'metadata' block contains anything other than an array, this is considered invalid data.
        // The manifest editor can only render a valid list of key/value pairs.
        // The original data is not lost and can always be viewed in the original manifest that was loaded.
        return metadataProperty !== undefined && Array.isArray(metadataProperty) ? metadataProperty : [];
      }
    }
    return undefined;
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