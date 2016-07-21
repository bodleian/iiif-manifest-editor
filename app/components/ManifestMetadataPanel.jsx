var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var FormSelect = require('FormSelect');

var ManifestMetadataPanel = React.createClass({
  getInitialState: function() {
    return {
      metadataFields: {
        label: {
          displayLabel: 'Label',
          value: undefined,
          path: 'label',
          isRequired: true
        },
        description: {
          displayLabel: 'Description',
          value: undefined,
          path: 'description/1/label',
          isRequired: false
        },
        attribution: {
          displayLabel: 'Attribution',
          value: undefined,
          path: 'attribution',
          isRequired: false
        },
        license: {
          displayLabel: 'License',
          value: undefined,
          path: 'license',
          isRequired: false
        },
        logo: {
          displayLabel: 'Logo',
          value: undefined,
          path: 'logo',
          isRequired: false
        }
      },
      availableMetadataFields: undefined
    }
  },
  componentWillMount: function() {
    // initialize the list of mandatory and optional metadata fields using metadata from the manifest
    this.loadMetadataFromManifest();
  },
  loadMetadataFromManifest: function() {
    // create a copy of the metadata fields to update with values from the loaded manifest
    var updatedMetadataFields = {
      ...this.state.metadataFields
    };
    if(this.props.manifestoObject.getLabel() !== null) {  // manifest label
      updatedMetadataFields.label.value = this.props.manifestoObject.getLabel();
    }
    if(this.props.manifestoObject.getDescription() !== null) {  // description
      updatedMetadataFields.description.value = this.props.manifestoObject.getDescription();
    }
    if(this.props.manifestoObject.getAttribution() !== null) {  // attribution
      updatedMetadataFields.attribution.value = this.props.manifestoObject.getAttribution();
    }
    if(this.props.manifestoObject.getLicense() !== null) {  // license
      updatedMetadataFields.license.value = this.props.manifestoObject.getLicense();
    }
    if(this.props.manifestoObject.getLogo() !== null) {  // logo
      updatedMetadataFields.logo.value = this.props.manifestoObject.getLogo();
    }

    // set the list of available metadata fields in the state
    var availableMetadataFields = this.getAvailableMetadataFields();

    // update the metadata fields in the state so that the component uses the correct values when rendering
    this.setState({
      metadataFields: updatedMetadataFields,
      availableMetadataFields: availableMetadataFields
    });
  },
  getAvailableMetadataFields: function() {
    // create a copy of the metadata fields and delete the ones that are already in use
    var availableMetadataFields = {
      ...this.state.metadataFields
    };
    Object.keys(availableMetadataFields).map(function(fieldName) {
      // do not include required fields or fields that have already been assigned a value
      var metadataField = availableMetadataFields[fieldName];
      if(metadataField.isRequired || metadataField.value !== undefined) {
        delete availableMetadataFields[fieldName];
      }
    });
    return availableMetadataFields;
  },
  addMetadataField: function() {
    // get the first available metadata field to use
    var updatedAvailableMetadataFields = {
      ...this.state.availableMetadataFields
    };
    var metadataFieldNameToUse = Object.keys(updatedAvailableMetadataFields)[0];

    // update the value of the metadata field
    var updatedMetadataFields = {
      ...this.state.metadataFields
    };
    updatedMetadataFields[metadataFieldNameToUse].value = 'N/A';

    // remove the used metadata field from the list of available metadata fields
    delete updatedAvailableMetadataFields[metadataFieldNameToUse];

    // update the state
    this.setState({
      metadataFields: updatedMetadataFields,
      availableMetadataFields: updatedAvailableMetadataFields
    });
  },
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  getAvailableMetadataFieldsForFormSelect: function(fieldNameToInclude) {
    // create a copy of the metadata fields and delete the ones that are already in use
    var updatedMetadataFields = {
      ...this.state.metadataFields
    };
    Object.keys(updatedMetadataFields).map(function(fieldName) {
      // always include the given field to include
      if(fieldName !== fieldNameToInclude) {
        // do not include required fields or fields that have already been assigned a value
        var metadataField = updatedMetadataFields[fieldName];
        if(metadataField.isRequired || metadataField.value !== undefined) {
          delete updatedMetadataFields[fieldName];
        }
      }
    });
    return updatedMetadataFields;
  },
  render: function() {
    var that = this;
    return (
      <div className="metadata-sidebar-panel">
        {
          Object.keys(this.state.metadataFields).map(function(fieldName) {
            var metadataField = that.state.metadataFields[fieldName];
            return (
              <div className="row" key={fieldName}>
                <div className="col-md-3 metadata-field-label">
                  {(() => {
                    if(metadataField.isRequired) {
                      return (
                        metadataField.displayLabel
                      );
                    } else if(metadataField.value !== undefined) {
                      var allowableMetadataFields = that.getAvailableMetadataFieldsForFormSelect(fieldName);
                      return (
                        <FormSelect options={allowableMetadataFields} selectedOption={fieldName}/>
                      );
                    }
                  })()}
                </div>
                <div className="col-md-9 metadata-field-value">
                  <EditableTextArea fieldValue={metadataField.value} path={metadataField.path} onUpdateHandler={that.saveMetadataFieldToStore}/>
                </div>
              </div>
            );
          })
        }
        {(() => {
          if(Object.keys(this.state.availableMetadataFields).length > 0) {
            return (
              <button type="button" className="btn btn-default add-metadata-field-button" aria-label="Add metadata field" onClick={that.addMetadataField}>
                <span className="fa fa-plus-circle" aria-hidden="true"></span> Add metadata field
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
      manifestoObject: state.manifestReducer.manifestoObject
    };
  }
)(ManifestMetadataPanel);
