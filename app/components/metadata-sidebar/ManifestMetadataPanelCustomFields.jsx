var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var EditablePrimitiveMetadataPropertyCard = require('EditablePrimitiveMetadataPropertyCard');
var EditableObjectMetadataPropertyCard = require('EditableObjectMetadataPropertyCard');
var Utils = require('Utils');

var ManifestMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    return {
      metadataFields: this.props.manifestData.metadata
    }
  },
  componentDidUpdate: function(prevProps, prevState) {
    // update the metadata field list with the value of the 'metadata' block defined in the manifest
    if(this.props.manifestData.metadata !== prevProps.manifestData.metadata) {
      this.setState({
        metadataFields: this.props.manifestData.metadata
      });
    }
  },
  addMetadataField: function(fieldLabel, fieldValue, addPath) {
    this.props.dispatch(actions.addMetadataFieldToListAtPath(fieldValue, addPath));
  },
  updateMetadataPropertyValue: function(fieldType, updatePath, fieldName, fieldValue) {
    var newUpdatePath = (fieldType == 'object') ? updatePath + '/' + fieldName : updatePath;
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, newUpdatePath));
  },
  deleteMetadataProperty: function(fieldIndex, updatePath, propertyIndex) {
    if(propertyIndex !== -1) {
      var propertyUpdatePath = updatePath + '/' + propertyIndex;
      this.props.dispatch(actions.deleteMetadataFieldFromListAtPathAndIndex(updatePath, propertyIndex));
    } else {
      this.props.dispatch(actions.deleteMetadataFieldFromListAtPathAndIndex(updatePath, fieldIndex));
    }
  },
  render: function() {
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
                        updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'string', 'metadata/' + fieldIndex + '/label')}
                        updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'object', 'metadata/' + fieldIndex + '/value', propertyIndex, propertyName)}
                        deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, 'metadata/' + fieldIndex + '/value', propertyIndex)}
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
                    updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'string', 'metadata/' + fieldIndex + '/label')}
                    updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'object', 'metadata/' + fieldIndex + '/value')}
                    deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, 'metadata', -1)}
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
                    updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'string', 'metadata/' + fieldIndex + '/label')}
                    updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'string', 'metadata/' + fieldIndex + '/value')}
                    deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, 'metadata', -1)}
                  />
                );
              }
            }
          })
        }
        <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={() => _this.addMetadataField('Label', { 'label': 'Label', 'value': 'Value' }, 'metadata')}>
          <span className="fa fa-plus"></span> Add metadata field
        </button>

        <button type="button" className="btn btn-default" title="Add language metadata field" onClick={() => _this.addMetadataField('Label', { 'label': 'Label', 'value': { '@value': '', '@language': '' } }, 'metadata')}>
          <span className="fa fa-plus"></span> Add language metadata field
        </button>
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
)(ManifestMetadataPanelCustomFields);