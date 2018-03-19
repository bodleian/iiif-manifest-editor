var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var deepcopy = require('deepcopy');
var EditableTextArea = require('EditableTextArea');
var MetadataFieldFormSelect = require('MetadataFieldFormSelect');
var MetadataPropertyObjectValue = require('MetadataPropertyObjectValue');
var Utils = require('Utils');

var ManifestMetadataPanelPredefinedFields = React.createClass({
  getInitialState: function() {
    return {
      metadataFields: [
        {
          name: 'label',
          label: 'Label',
          value: undefined,
          isRequired: true,
          isMultiValued: false,
          addPath: '',
          updatePath: 'label'
        },
        {
          name: 'description',
          label: 'Description',
          value: undefined,
          isRequired: false,
          isMultiValued: false,
          addPath: '',
          updatePath: 'description'
        },
        {
          name: 'attribution',
          label: 'Attribution',
          value: undefined,
          isRequired: false,
          isMultiValued: false,
          addPath: '',
          updatePath: 'attribution'
        },
        {
          name: 'license',
          label: 'License',
          value: undefined,
          isRequired: false,
          isMultiValued: false,
          addPath: '',
          updatePath: 'license'
        },
        {
          name: 'logo',
          label: 'Logo',
          value: undefined,
          isRequired: false,
          isMultiValued: false,
          addPath: '',
          updatePath: 'logo'
        },
        {
          name: 'related',
          label: 'Related',
          value: undefined,
          isRequired: false,
          isMultiValued: true,
          addPath: '',
          updatePath: 'related',
          propertyValueTemplate: { '@id': undefined, label: undefined, format: undefined }
        },
        {
          name: 'seeAlso',
          label: 'See Also',
          value: undefined,
          isRequired: false,
          isMultiValued: false,
          addPath: '',
          updatePath: 'seeAlso'
        },
        {
          name: 'viewingDirection',
          label: 'Viewing Direction',
          value: undefined,
          isRequired: false,
          isMultiValued: false,
          addPath: '',
          updatePath: 'viewingDirection'
        },
        {
          name: 'viewingHint',
          label: 'Viewing Hint',
          value: undefined,
          isRequired: false,
          isMultiValued: false,
          addPath: '',
          updatePath: 'viewingHint'
        }
      ]
    }
  },
  getMetadataFieldByName: function(metadataFields, fieldName) {
    for(var fieldIndex = 0; fieldIndex < metadataFields.length; fieldIndex++) {
      var metadataField = metadataFields[fieldIndex];
      if(metadataField.name === fieldName) {
        return metadataField;
      }
    }
    return undefined;
  },
  getMetadataFieldIndexByFieldName: function(metadataFields, fieldName) {
    var metadataFieldIndex = -1;
    for(var fieldIndex = 0; fieldIndex < metadataFields.length; fieldIndex++) {
      var metadataField = metadataFields[fieldIndex];
      if(metadataField.name === fieldName) {
        metadataFieldIndex = fieldIndex;
        break;
      }
    }
    return metadataFieldIndex;
  },
  updateFieldValueInList: function(fieldName, fieldValue, metadataFields) {
    var fieldIndex = this.getMetadataFieldIndexByFieldName(metadataFields, fieldName);
    metadataFields[fieldIndex].value = fieldValue;
  },
  componentWillMount: function() {
    // create a copy of the metadata field list
    var metadataFields = [...this.state.metadataFields];

    // set the values for the following fields using the values in the store
    if(this.props.manifestoObject.getLabel()) {  // manifest label
      this.updateFieldValueInList('label', this.props.manifestoObject.getLabel(), metadataFields);
    }
    if(this.props.manifestoObject.getDescription()) {  // description
      this.updateFieldValueInList('description', this.props.manifestoObject.getDescription(), metadataFields);
    }
    if(this.props.manifestoObject.getAttribution()) {  // attribution
      this.updateFieldValueInList('attribution', this.props.manifestoObject.getAttribution(), metadataFields);
    }
    if(this.props.manifestoObject.getLicense()) {  // license
      this.updateFieldValueInList('license', this.props.manifestoObject.getLicense(), metadataFields);
    }
    if(this.props.manifestoObject.getLogo()) {  // logo
      this.updateFieldValueInList('logo', this.props.manifestoObject.getLogo(), metadataFields);
    }
    if(this.props.manifestData.related) {  // related
      this.updateFieldValueInList('related', this.props.manifestData.related, metadataFields);
    }
    if(this.props.manifestData.seeAlso) {  // see also
      this.updateFieldValueInList('seeAlso', this.props.manifestData.seeAlso.toString(), metadataFields);
    }
    if(this.props.manifestData.viewingDirection) {  // viewing direction
      this.updateFieldValueInList('viewingDirection', this.props.manifestData.viewingDirection, metadataFields);
    }
    if(this.props.manifestData.viewingHint) {  // viewing hint
      this.updateFieldValueInList('viewingHint', this.props.manifestData.viewingHint, metadataFields);
    }

    // update the metadata field list in the state
    this.setState({
      metadataFields: metadataFields
    });
  },
  componentDidUpdate: function(prevProps, prevState) {
    // update the viewing direction field if it has been changed in the Sequence Metadata panel
    if(this.props.manifestData.viewingDirection !== prevProps.manifestData.viewingDirection && this.props.manifestData.viewingDirection !== undefined) {
      // create a copy of the metadata field list
      var metadataFields = [...this.state.metadataFields];

      // update the value of the viewing direction field
      this.updateFieldValueInList('viewingDirection', this.props.manifestData.viewingDirection, metadataFields);

      // update the metadata field list in the state
      this.setState({
        metadataFields: metadataFields
      });
    }
  },
  addMetadataField: function() {
    // create a copy of the metadata field list
    var metadataFields = [...this.state.metadataFields];

    // append an empty stub metadata record to the metadata list
    if(metadataFields.length > 0) {
      var stubMetadataRecord = {
        name: undefined,
        label: undefined,
        value: undefined,
        isRequired: undefined,
        isMultiValued: undefined,
        addPath: undefined,
        updatePath: undefined,
        propertyValueTemplate: undefined
      };
      metadataFields.push(stubMetadataRecord);

      // update the metadata field list in the state
      this.setState({
        metadataFields: metadataFields
      });
    }
  },
  updateMetadataFieldWithSelectedOption: function(selectedOptionObject) {
    // update the property value in the metadata list
    var metadataFields = [...this.state.metadataFields];

    // find the existing field by name
    var activeMetadataField = this.getMetadataFieldByName(metadataFields, selectedOptionObject.name);

    // set the default value of the property value based on whether the field is multi-valued
    var defaultFieldValue = '';
    if(activeMetadataField.isMultiValued) {
      // Note: The following code assumes that the 'propertyValueTemplate' is set for multi-valued fields.
      defaultFieldValue = deepcopy(activeMetadataField.propertyValueTemplate);
    }

    // add a new property with a default value if one doesn't already exist
    var newMetadataFieldValue = Utils.addMetadataFieldValue(activeMetadataField.value, defaultFieldValue);
    activeMetadataField.value = newMetadataFieldValue;

    // delete the empty stub metadata record
    var stubRecordFieldIndex = this.getMetadataFieldIndexByFieldName(metadataFields, undefined);
    metadataFields.splice(stubRecordFieldIndex, 1);

    // save the updated metadata list to the state so the component re-renders
    this.setState({ metadataFields: metadataFields });

    // update the property value in the store
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(activeMetadataField.value, activeMetadataField.updatePath));
  },
  updateMetadataPropertyValue: function(propertyIndex, updatePath, propertyName, propertyValue) {
    // update the property value in the metadata list
    var metadataFields = [...this.state.metadataFields];

    // find the existing field by name
    var activeMetadataField = this.getMetadataFieldByName(metadataFields, propertyName);

    // update the existing property with the given value if one already exists
    var newMetadataPropertyValue = Utils.updateMetadataFieldValue(activeMetadataField.value, propertyValue, propertyIndex);
    activeMetadataField.value = newMetadataPropertyValue;

    // save the updated metadata list to the state so the component re-renders
    this.setState({ metadataFields: metadataFields });

    // update the property value in the store
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(activeMetadataField.value, activeMetadataField.updatePath));
  },
  updateMetadataPropertyObjectValue: function(fieldIndex, updatePath, propertyIndex, propertyName, propertyValue) {
    if(propertyName !== undefined) {
      // update the value in the metadata field
      var metadataFields = [...this.state.metadataFields];
      if(propertyIndex !== -1) {
        metadataFields[fieldIndex].value[propertyIndex][propertyName] = propertyValue;
      } else {
        metadataFields[fieldIndex].value[propertyName] = propertyValue;
      }
      this.setState({
        metadataFields: metadataFields
      });

      // update the metadata field value to the manifest data object in the store
      var propertyUpdatePath = (propertyIndex !== -1)
        ? updatePath + '/' + propertyIndex + '/' + propertyName
        : updatePath + '/' + propertyName;
      this.props.dispatch(actions.updateMetadataFieldValueAtPath(propertyValue, propertyUpdatePath));
    }
  },
  deleteMetadataField: function(metadataFieldToDelete, index) {
    // delete the metadata field to the manifest data object in the store
    // TODO: which related field should be deleted from the store? Need an index! Use deleteMetadataFieldFromListAtPathAndIndex action!
    if(metadataFieldToDelete.name !== undefined) {
      if(metadataFieldToDelete.isMultiValued) {
        var occurrenceIndex = this.findOccurrenceIndexForFieldName(metadataFieldToDelete.name, index);
        this.props.dispatch(actions.deleteMetadataFieldFromListAtPathAndIndex(metadataFieldToDelete.updatePath, occurrenceIndex));
      } else {
        this.props.dispatch(actions.deleteMetadataFieldAtPath(metadataFieldToDelete.updatePath));
      }
    }

    // TODO: after the metadata field has been deleted from the store, update the value of the metadata field with the new value

    // create a copy of the metadata field list
    var metadataFields = [...this.state.metadataFields];

    // TODO: find the field to delete in the metadata field list

    // TODO: set the value of the deleted field to 'undefined'

    // update the metadata field list in the state
    this.setState({
      metadataFields: metadataFields
    });
  },
  render: function() {
    // get the list of available metadata fields that can be added
    var availableFieldsToAdd = this.state.metadataFields.filter(function(field) {
      return field.name !== undefined && (field.value === undefined || field.isMultiValued);
    });

    var _this = this;
    return (
      <div>
        <dl>
          <dt className="metadata-field-label">Manifest URI</dt>
          <dd className="metadata-field-value">
            <a href={this.props.manifestoObject.id} target="_blank">{this.props.manifestoObject.id}</a>
          </dd>
        </dl>
        {
          this.state.metadataFields.map((metadataField, fieldIndex) => {
            if(metadataField.name === undefined) {
              return (
                <dl key={fieldIndex}>
                  <dt className="metadata-field-label">
                    <MetadataFieldFormSelect id={fieldIndex} options={availableFieldsToAdd} placeholder="Choose field" selectedOption="" onChange={_this.updateMetadataFieldWithSelectedOption}/>
                  </dt>
                  <dd className="metadata-field-value"></dd>
                </dl>
              );
            } else if(metadataField.value !== undefined) {
              if(Array.isArray(metadataField.value)) {
                return metadataField.value.map((propertyValue, propertyIndex) => {
                  return (
                    <dl key={fieldIndex + '-' + propertyIndex}>
                      <dt className="metadata-field-label">
                        {metadataField.label}
                      </dt>
                      {(() => {
                        if(propertyValue instanceof Object) {
                          return (
                            <MetadataPropertyObjectValue
                              fieldName={metadataField.name}
                              fieldValue={propertyValue}
                              updateHandler={_this.updateMetadataPropertyObjectValue.bind(this, fieldIndex, metadataField.updatePath, propertyIndex)}
                            />
                          );
                        } else if(!Array.isArray(propertyValue)) {
                          return (
                            <dd className="metadata-field-value">
                              <EditableTextArea
                                fieldName={metadataField.name}
                                fieldValue={propertyValue}
                                updateHandler={_this.updateMetadataPropertyValue.bind(this, propertyIndex, metadataField.updatePath)}
                              />
                            </dd>
                          );
                        } else {
                          // arrays of arrays are not supported
                        }
                      })()}
                    </dl>
                  );
                });
              }
              else if(metadataField.value instanceof Object) {
                return (
                  <dl key={fieldIndex}>
                    <dt className="metadata-field-label">
                      {metadataField.label}
                    </dt>
                    <MetadataPropertyObjectValue
                      fieldValue={metadataField.value}
                      updateHandler={_this.updateMetadataPropertyObjectValue.bind(this, fieldIndex, metadataField.updatePath, -1)}
                    />
                  </dl>
                );
              }
              else {
                return (
                  <dl key={fieldIndex}>
                    <dt className="metadata-field-label">
                      {metadataField.label}
                    </dt>
                    <dd className="metadata-field-value">
                      <EditableTextArea
                        fieldName={metadataField.name}
                        fieldValue={metadataField.value}
                        updateHandler={_this.updateMetadataPropertyValue.bind(this, fieldIndex, metadataField.updatePath)}
                      />
                    </dd>
                  </dl>
                );
              }
            }
            {(() => {
              if(!metadataField.isRequired) {
                return (
                  <dd className="metadata-field-delete">
                    <a href="javascript:;" title={"Delete " + metadataField.label + " field"} onClick={() => _this.deleteMetadataField(metadataField, fieldIndex)}>
                      <span className="fa fa-times-circle"></span>
                    </a>
                  </dd>
                );
              }
            })()}
          })
        }
        {(() => {
          if(Object.keys(availableFieldsToAdd).length > 0) {
            return (
              <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={_this.addMetadataField}>
                <span className="fa fa-plus"></span> Add metadata field
              </button>
            );
          }
        })()}
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
)(ManifestMetadataPanelPredefinedFields);
