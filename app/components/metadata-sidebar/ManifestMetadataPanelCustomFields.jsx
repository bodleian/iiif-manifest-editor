var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var EditablePrimitiveMetadataPropertyCard = require('EditablePrimitiveMetadataPropertyCard');
var EditableObjectMetadataPropertyCard = require('EditableObjectMetadataPropertyCard');
var Utils = require('Utils');

var ManifestMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    return {
      metadataFields: []
    }
  },
  componentWillMount: function() {
    // initialize the metadata field list with the value of the 'metadata' block defined in the manifest
    if(this.props.manifestData.metadata) {
      this.setState({
        metadataFields: this.props.manifestData.metadata
      });
    }
  },
  addMetadataField: function(metadataFieldLabel, metadataFieldValue, path) {
    // create a copy of the metadata field list
    var metadataFields = [...this.state.metadataFields];

    // append the metadata field to the list of metadata fields in the state
    var metadataFieldObject = { label: metadataFieldLabel, value: metadataFieldValue };
    metadataFields.push(metadataFieldObject);

    // update the metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      metadataFields: metadataFields
    });

    // add the metadata field object to the list at the given path to the manifest data object in the store
    this.props.dispatch(actions.addMetadataFieldToListAtPath(metadataFieldObject, path));
  },
  updateMetadataPropertyValue: function(updatePath, fieldName, fieldValue) {
    // update the metadata field value for the manifest data object in the store
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, updatePath));
  },
  deleteMetadataProperty: function(path, fieldIndex) {
    // create a copy of the metadata field list
    var metadataFields = [...this.state.metadataFields];

    // delete the metadata field from the list of fields
    metadataFields.splice(fieldIndex, 1);

    // update the metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      metadataFields: metadataFields
    });

    // delete the metadata field at the given path and index from the manifest data object in the store
    this.props.dispatch(actions.deleteMetadataFieldFromListAtPathAndIndex(path, fieldIndex));
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
                  if(propertyValue instanceof Object) {
                    return (
                      <EditableObjectMetadataPropertyCard
                        key={fieldIndex + '-' + propertyIndex}
                        name={metadataField.name}
                        label={Utils.getMetadataField('label', metadataField.label)}
                        value={propertyValue}
                        isMultiLingual={true}
                        isEditableLabel
                        updateLabelHandler={false}
                        updateValueHandler={false}
                        deleteHandler={false}
                      />
                    );
                  }
                  else if(Array.isArray(propertyValue)) {
                    // arrays of arrays are not supported
                  }
                  else {
                    return (
                      <EditablePrimitiveMetadataPropertyCard
                        key={fieldIndex + '-' + propertyIndex}
                        name={metadataField.name}
                        label={Utils.getMetadataField('label', metadataField.label)}
                        value={propertyValue}
                        isEditableLabel
                        updateLabelHandler={false}
                        updateValueHandler={false}
                        deleteHandler={false}
                      />
                    );
                  }
                });
              }
              else if(metadataField.value instanceof Object) {
                return (
                  <EditableObjectMetadataPropertyCard
                    key={fieldIndex}
                    label={metadataField.label}
                    value={metadataField.value}
                    isMultiLingual={true}
                    isEditableLabel
                    updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'metadata/' + fieldIndex + '/label')}
                    updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'metadata/' + fieldIndex + '/value')}
                    deleteHandler={_this.deleteMetadataProperty.bind(this, 'metadata', fieldIndex)}
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
                    updateLabelHandler={_this.updateMetadataPropertyValue.bind(this, 'metadata/' + fieldIndex + '/label')}
                    updateValueHandler={_this.updateMetadataPropertyValue.bind(this, 'metadata/' + fieldIndex + '/value')}
                    deleteHandler={_this.deleteMetadataProperty.bind(this, 'metadata', fieldIndex)}
                  />
                );
              }
            }
          })
        }
        <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={() => _this.addMetadataField('Label', 'Value', 'metadata')}>
          <span className="fa fa-plus"></span> Add metadata field
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