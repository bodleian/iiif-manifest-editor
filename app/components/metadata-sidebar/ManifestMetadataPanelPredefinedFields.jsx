var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var MetadataFieldFormSelect = require('MetadataFieldFormSelect');
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
          updatePath: 'related'
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
        value: 'N/A',
        isRequired: undefined,
        isMultiValued: undefined,
        addPath: undefined,
        updatePath: undefined
      };
      metadataFields.push(stubMetadataRecord);

      // update the metadata field list in the state
      this.setState({
        metadataFields: metadataFields
      });
    }
  },
  findOccurrenceIndexForFieldName: function(fieldName, fieldIndex) {
    // check how many times the currently updated field occurs in the UI (active fields) 
    // and return the index of occurrence (e.g. first occurrence => 0, second occurrence => 1, etc.)
    // this number corresponds to the array index of the multi-valued field in the store
    var fieldIndexMapping = [];
    var occurrenceCounter = 0;
    this.state.activeMetadataFields.map(function(metadataField, index) {
      // compare active field name with currently updated field name
      if(metadataField.name === fieldName) {
        fieldIndexMapping[index] = occurrenceCounter++;
      }
    });

    return fieldIndexMapping[fieldIndex];
  },
  updateMetadataFieldValue: function(fieldIndex, fieldName, path, fieldValue) {
    if(fieldName !== undefined) {
      // update the value in the metadata field list
      var metadataFields = [...this.state.metadataFields];
      metadataFields[fieldIndex].value = fieldValue;
      this.setState({
        metadataFields: metadataFields
      });

      // update the metadata field value to the manifest data object in the store
      if(this.state.metadataFields[fieldIndex].isMultiValued) {
        var updatePath = fieldName + '/' + this.findOccurrenceIndexForFieldName(fieldName, fieldIndex) + '/@id';
        this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, updatePath));
      } else {
        this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
      }
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
  updateMetadataFieldWithSelectedOption: function(selectedMetadataField, selectedFieldName) {
    // create a copy of the metadata field list
    var metadataFields = [...this.state.metadataFields];

    // delete the selected metadata field from the list of metadata fields
    var fieldIndex = this.getMetadataFieldIndexByFieldName(metadataFields, selectedFieldName);
    metadataFields.splice(fieldIndex, 1);

    // copy the properties of the selected metadata field to the empty stub metadata record
    var stubMetadataRecord = this.getMetadataFieldByName(metadataFields, undefined);
    for(var index in selectedMetadataField) {
      stubMetadataRecord[index] = selectedMetadataField[index];
    }

    // set the value of the selected metadata field based on the field type
    if(stubMetadataRecord.isMultiValued) {
      // TODO: refactor this logic for each type of multi-valued field, not just 'related'

      // add the new metadata value
      var metadataFieldValueToAdd = { '@id': 'A', label: 'B', format: 'C' };
      var newMetadataFieldValue = Utils.updateMetadataFieldValue(stubMetadataRecord.value, metadataFieldValueToAdd);
      stubMetadataRecord.value = newMetadataFieldValue;

      // add the metadata field object to the list at the given path to the manifest data object in the store
      this.props.dispatch(actions.updateMetadataFieldValueAtPath(stubMetadataRecord.value, stubMetadataRecord.updatePath));
    } else {
      // add the metadata field to the manifest data object in the store
      stubMetadataRecord.value = 'N/A';
      this.props.dispatch(actions.addMetadataFieldAtPath(stubMetadataRecord.name, stubMetadataRecord.value, stubMetadataRecord.addPath));
    }

    // update the metadata field list in the state
    this.setState({
      metadataFields: metadataFields
    });
  },
  render: function() {
    // get the list of available metadata fields that can be added
    var availableFieldsToAdd = this.state.metadataFields.filter(function(field) {
      return field.value === undefined || field.isMultiValued;
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
                  <dd className="metadata-field-value">N/A</dd>
                </dl>
              );
            } else if(metadataField.value !== undefined) {
              if(Array.isArray(metadataField.value)) {
                return metadataField.value.map((propertyValue, propertyIndex) => {
                  return (
                    <dl key={fieldIndex + '-' + propertyIndex}>
                      <dt className="metadata-field-label">{ metadataField.label }</dt>
                      <dd className="metadata-field-value">
                        { JSON.stringify(propertyValue) }
                      </dd>
                    </dl>
                  );
                });
              }
              else if(metadataField.value instanceof Object) {
                return (
                  <dl key={fieldIndex}>
                    <dt className="metadata-field-label">{ metadataField.label }</dt>
                    {
                      Object.keys(metadataField.value).map(function(propertyName, propertyIndex) {
                        var propertyValue = metadataField.value[propertyName];
                        return (
                          <dd key={propertyIndex} className="metadata-field-value">
                            { propertyName } : { propertyValue }
                          </dd>
                        );
                      })
                    }
                  </dl>
                );
              }
              else {
                return (
                  <dl key={fieldIndex}>
                    <dt className="metadata-field-label">{ metadataField.label }</dt>
                    <dd className="metadata-field-value">
                      <EditableTextArea
                        fieldValue={metadataField.value}
                        updateHandler={_this.updateMetadataFieldValue.bind(this, fieldIndex, metadataField.name, metadataField.updatePath)}
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
