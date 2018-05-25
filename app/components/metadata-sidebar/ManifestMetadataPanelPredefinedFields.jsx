var React = require('react');
var ReactDOM = require('react-dom');
var { connect } = require('react-redux');
var actions = require('actions');
var deepcopy = require('deepcopy');
var MetadataSidebarCanvas = require('MetadataSidebarCanvas');
var CanvasSelectorDialog = require('CanvasSelectorDialog');
var EmptyMetadataPropertyCard = require('EmptyMetadataPropertyCard');
var LinkedMetadataPropertyCard = require('LinkedMetadataPropertyCard');
var EditablePrimitiveMetadataPropertyCard = require('EditablePrimitiveMetadataPropertyCard');
var EditableObjectMetadataPropertyCard = require('EditableObjectMetadataPropertyCard');
var Utils = require('Utils');

var ManifestMetadataPanelPredefinedFields = React.createClass({
  getInitialState: function() {
    return {
      metadataFields: [
        {
          name: 'label',
          label: 'Label',
          value: undefined,
          isRequired: false,
          isMultiValued: true,
          isMultiLingual: true,
          addPath: '',
          updatePath: 'label',
          propertyValueTemplate: { '@value': undefined, '@language': undefined }
        },
        {
          name: 'description',
          label: 'Description',
          value: undefined,
          isRequired: false,
          isMultiValued: true,
          isMultiLingual: true,
          addPath: '',
          updatePath: 'description',
          propertyValueTemplate: { '@value': undefined, '@language': undefined }
        },
        {
          name: 'attribution',
          label: 'Attribution',
          value: undefined,
          isRequired: false,
          isMultiValued: true,
          isMultiLingual: true,
          addPath: '',
          updatePath: 'attribution',
          propertyValueTemplate: { '@value': undefined, '@language': undefined }
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
          updatePath: 'seeAlso',
          propertyValueTemplate: { '@id': undefined, format: undefined, profile: undefined }
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
      this.updateFieldValueInList('description', this.props.manifestData.description, metadataFields);
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
      this.updateFieldValueInList('seeAlso', this.props.manifestData.seeAlso, metadataFields);
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
  updateMetadataFieldWithSelectedOption: function(fieldIndex, selectedOptionObject) {
    // update the property value in the metadata list
    var metadataFields = [...this.state.metadataFields];

    // find the existing field by name
    var activeMetadataField = this.getMetadataFieldByName(metadataFields, selectedOptionObject.name);

    // set the default value of the property value based on whether the field is multi-valued
    var defaultFieldValue = '';
    if(activeMetadataField.propertyValueTemplate !== undefined) {
      // Note: The following code assumes that the 'propertyValueTemplate' is set for multi-valued fields.
      defaultFieldValue = deepcopy(activeMetadataField.propertyValueTemplate);
    }

    // add a new property with a default value if one doesn't already exist
    var newMetadataFieldValue = Utils.addMetadataFieldValue(activeMetadataField.value, defaultFieldValue);
    activeMetadataField.value = newMetadataFieldValue;

    // delete the empty stub metadata record
    metadataFields.splice(fieldIndex, 1);

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
  deleteMetadataProperty: function(fieldIndex, updatePath, propertyIndex, propertyName) {
    if(propertyName === undefined) {
      // delete the empty stub metadata record
      var metadataFields = [...this.state.metadataFields];
      metadataFields.splice(fieldIndex, 1);
      this.setState({ metadataFields: metadataFields });
    } else {
      // reset the value of the metadata property
      var metadataFields = [...this.state.metadataFields];
      if(propertyIndex !== -1) {
        metadataFields[fieldIndex].value.splice(propertyIndex, 1);
        // set empty arrays to undefined so the field can be included in the list of available fields to add
        if(metadataFields[fieldIndex].value.length == 0) {
          metadataFields[fieldIndex].value = undefined;
        }
      } else {
        metadataFields[fieldIndex].value = undefined;
      }
      this.setState({ metadataFields: metadataFields });

      // delete the metadata property from the manifest data object in the store
      if(propertyIndex !== -1) {
        var propertyUpdatePath = updatePath + '/' + propertyIndex;
        this.props.dispatch(actions.deleteMetadataFieldFromListAtPathAndIndex(updatePath, propertyIndex));
      } else {
        this.props.dispatch(actions.deleteMetadataFieldAtPath(updatePath));
      }
    }
  },
  openCanvasSelectorDialog: function() {
    // open the canvas selector modal dialog
    var $canvasSelectorDialog = $(ReactDOM.findDOMNode(this.refs.canvasSelectorDialog));
    $canvasSelectorDialog.modal({
      backdrop: 'static'
    });
  },
  handleCanvasSelection: function(selectedCanvasId) {
    // add the 'thumbnail' property if it doesn't exist and update its '@id' property value
    if(this.props.manifestData.thumbnail == undefined) {
      this.props.dispatch(actions.addMetadataFieldAtPath('thumbnail', '', ''));
      this.props.dispatch(actions.updateMetadataFieldValueAtPath({ '@id': selectedCanvasId }, 'thumbnail'));
    }
    // update the '@id' property value; Note: this will add the '@id' property if it doesn't exist
    else {
      this.props.dispatch(actions.updateMetadataFieldValueAtPath(selectedCanvasId, 'thumbnail/@id'));
    }
  },
  render: function() {
    // get the list of available metadata properties that can be added
    var availablePropertiesToAdd = this.state.metadataFields.filter(function(field) {
      return field.name !== undefined && (field.value === undefined || field.isMultiValued);
    });

    var _this = this;
    var thumbnailCanvasId = (this.props.manifestData.thumbnail !== undefined && this.props.manifestData.thumbnail['@id'] !== undefined) ? this.props.manifestData.thumbnail['@id'] : undefined;
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(thumbnailCanvasId);

    return (
      <div>
        <h5 className="text-center">Manifest Thumbnail</h5>
        <CanvasSelectorDialog ref="canvasSelectorDialog" onSubmitHandler={this.handleCanvasSelection} canvas={thumbnailCanvasId} addOrReplace={thumbnailCanvasId !== undefined ? 'replace' : 'add'} />
        {(() => {
          if(thumbnailCanvasId !== undefined && canvas == null) {
            return (
              <div className="alert alert-danger manifest-thumbnail-message">
                The preview thumbnail for this manifest is invalid because it does not exist in the sequence.
              </div>
            );
          } else if(thumbnailCanvasId == undefined) {
            return (
              <p className="manifest-thumbnail-message">There is no preview thumbnail for this manifest.</p>
            );
          } else {
            return (
              <MetadataSidebarCanvas canvasId={thumbnailCanvasId} />
            );
          }
        })()}

        <div className="row">
          <div className="col-md-12">
            <button onClick={this.openCanvasSelectorDialog} className="btn btn-default center-block add-replace-image-on-canvas-button">
              <i className={thumbnailCanvasId !== undefined ? 'fa fa-refresh' : 'fa fa-plus-circle'}></i> {thumbnailCanvasId !== undefined ? 'Replace Manifest Thumbnail' : 'Add Manifest Thumbnail'}
            </button>
          </div>
        </div>

        <hr/>

        <LinkedMetadataPropertyCard
          label="Manifest URI"
          value={this.props.manifestoObject.id}
        />

        {
          this.state.metadataFields.map((metadataField, fieldIndex) => {
            if(metadataField.name === undefined) {
              return (
                <EmptyMetadataPropertyCard
                  key={fieldIndex}
                  labelOptions={availablePropertiesToAdd}
                  updateLabelHandler={_this.updateMetadataFieldWithSelectedOption.bind(this, fieldIndex)}
                  deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, -1, metadataField.name)}
                />
              );
            } else if(metadataField.value !== undefined) {
              if(Array.isArray(metadataField.value)) {
                return metadataField.value.map((propertyValue, propertyIndex) => {
                  if(propertyValue instanceof Object) {
                    return (
                      <EditableObjectMetadataPropertyCard
                        key={fieldIndex + '-' + propertyIndex}
                        name={metadataField.name}
                        label={metadataField.label}
                        value={propertyValue}
                        isRequired={metadataField.isRequired}
                        isMultiLingual={metadataField.isMultiLingual}
                        updateValueHandler={_this.updateMetadataPropertyObjectValue.bind(this, fieldIndex, metadataField.updatePath, propertyIndex)}
                        deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, propertyIndex, metadataField.name)}
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
                        label={metadataField.label}
                        value={propertyValue}
                        isRequired={metadataField.isRequired}
                        updateValueHandler={_this.updateMetadataPropertyValue.bind(this, fieldIndex, metadataField.updatePath)}
                        deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, propertyIndex, metadataField.name)}
                      />
                    );
                  }
                });
              }
              else if(metadataField.value instanceof Object) {
                return (
                  <EditableObjectMetadataPropertyCard
                    key={fieldIndex}
                    name={metadataField.name}
                    label={metadataField.label}
                    value={metadataField.value}
                    isRequired={metadataField.isRequired}
                    isMultiLingual={metadataField.isMultiLingual}
                    updateValueHandler={_this.updateMetadataPropertyObjectValue.bind(this, fieldIndex, metadataField.updatePath, -1)}
                    deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, -1, metadataField.name)}
                  />
                );
              }
              else {
                return (
                  <EditablePrimitiveMetadataPropertyCard
                    key={fieldIndex}
                    name={metadataField.name}
                    label={metadataField.label}
                    value={metadataField.value}
                    isRequired={metadataField.isRequired}
                    updateValueHandler={_this.updateMetadataPropertyValue.bind(this, fieldIndex, metadataField.updatePath)}
                    deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, -1, metadataField.name)}
                  />
                );
              }
            }
          })
        }
        {(() => {
          if(Object.keys(availablePropertiesToAdd).length > 0) {
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
