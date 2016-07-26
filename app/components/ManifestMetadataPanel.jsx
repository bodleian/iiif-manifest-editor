var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var FormSelect = require('FormSelect');

var ManifestMetadataPanel = React.createClass({
  getInitialState: function() {
    return {
      availableMetadataFields: [
        {
          name: 'label',
          label: 'Label',
          value: undefined,
          isRequired: true,
          isUnique: true,
          addPath: '',
          updatePath: 'label'
        },
        {
          name: 'description',
          label: 'Description',
          value: undefined,
          isRequired: false,
          isUnique: true,
          addPath: 'description',
          updatePath: 'description/0/@value'
        },
        {
          name: 'attribution',
          label: 'Attribution',
          value: undefined,
          isRequired: false,
          isUnique: true,
          addPath: '',
          updatePath: 'attribution'
        },
        {
          name: 'license',
          label: 'License',
          value: undefined,
          isRequired: false,
          isUnique: true,
          addPath: '',
          updatePath: 'license'
        },
        {
          name: 'logo',
          label: 'Logo',
          value: undefined,
          isRequired: false,
          isUnique: true,
          addPath: '',
          updatePath: 'logo'
        }
      ],
      activeMetadataFields: []
    }
  },
  getAvailableMetadataFieldIndexByFieldName: function(availableMetadataFields, fieldName) {
    var availableMetadataFieldIndex = -1;
    Object.keys(availableMetadataFields).map(function(index) {
      var metadataField = availableMetadataFields[index];
      if(metadataField.name === fieldName) {
        availableMetadataFieldIndex = index;
      }
    });
    return availableMetadataFieldIndex;
  },
  setMetadataField: function(fieldName, fieldValue, availableMetadataFields, activeMetadataFields) {
    // find the available metadata field based on the field name
    var availableMetadataFieldIndex = this.getAvailableMetadataFieldIndexByFieldName(availableMetadataFields, fieldName);

    // append the metadata field to the list of active fields
    var availableMetadataField = availableMetadataFields[availableMetadataFieldIndex];
    availableMetadataField.value = fieldValue;
    activeMetadataFields.push(availableMetadataField);

    // delete the metadata field from the list of available fields for unique fields
    if(availableMetadataField.isUnique) {
      availableMetadataFields.splice(availableMetadataFieldIndex, 1);
    }
  },
  componentWillMount: function() {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];

    if(this.props.manifestoObject.getLabel() !== null) {  // manifest label
      this.setMetadataField('label', this.props.manifestoObject.getLabel(), availableMetadataFields, activeMetadataFields);
    }
    if(this.props.manifestoObject.getDescription() !== null) {  // description
      this.setMetadataField('description', this.props.manifestoObject.getDescription(), availableMetadataFields, activeMetadataFields);
    }
    if(this.props.manifestoObject.getAttribution() !== null) {  // attribution
      this.setMetadataField('attribution', this.props.manifestoObject.getAttribution(), availableMetadataFields, activeMetadataFields);
    }
    if(this.props.manifestoObject.getLicense() !== null) {  // license
      this.setMetadataField('license', this.props.manifestoObject.getLicense(), availableMetadataFields, activeMetadataFields);
    }
    if(this.props.manifestoObject.getLogo() !== null) {  // logo
      this.setMetadataField('logo', this.props.manifestoObject.getLogo(), availableMetadataFields, activeMetadataFields);
    }

    // update the metadata field lists in the state so that the component uses the correct values when rendering
    this.setState({
      availableMetadataFields: availableMetadataFields,
      activeMetadataFields: activeMetadataFields
    });
  },
  addMetadataField: function() {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // append an empty metadata field to the active metadata list
    if(availableMetadataFields.length > 0) {
      var newMetadataField = { name: undefined, value: 'N/A' };
      activeMetadataFields.push(newMetadataField);

      // update the metadata field lists in the state
      this.setState({
        activeMetadataFields: activeMetadataFields
      });
    }
  },
  updateMetadataFieldValue: function(fieldValue, path, fieldName) {
    // update the metadata field value to the manifest data object in the store
    if(fieldName !== undefined) {
      this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
    }
  },
  deleteMetadataField: function(metadataFieldToDelete, index) {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // append the metadata field to delete to the list of available fields
    if(metadataFieldToDelete.name !== undefined) {
      metadataFieldToDelete.value = undefined;
      availableMetadataFields.push(metadataFieldToDelete);
    }

    // delete the metadata field from the list of active fields
    activeMetadataFields.splice(index, 1);

    // update the metadata field lists in the state so that the component uses the correct values when rendering
    this.setState({
      availableMetadataFields: availableMetadataFields,
      activeMetadataFields: activeMetadataFields
    });

    // delete the metadata field to the manifest data object in the store
    if(metadataFieldToDelete.name !== undefined) {
      this.props.dispatch(actions.deleteMetadataFieldAtPath(metadataFieldToDelete.updatePath));
    }
  },
  updateMetadataFieldsWithSelectedOption: function(menuIndex, selectedFieldName) {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // delete the selected menu at the given index in the active list of metadata fields
    activeMetadataFields.splice(menuIndex, 1);

    // find the available metadata field based on the field name
    var availableMetadataFieldIndex = this.getAvailableMetadataFieldIndexByFieldName(availableMetadataFields, selectedFieldName);
    var availableMetadataField = availableMetadataFields[availableMetadataFieldIndex];
    availableMetadataField.value = 'N/A';

    // insert the available field at the location of the deleted field
    activeMetadataFields.splice(menuIndex, 0, availableMetadataField);

    // delete the available field
    availableMetadataFields.splice(availableMetadataFieldIndex, 1);

    // update the metadata field lists in the state so that the component uses the correct values when rendering
    this.setState({
      availableMetadataFields: availableMetadataFields,
      activeMetadataFields: activeMetadataFields
    });

    // add the metadata field to the manifest data object in the store
    this.props.dispatch(actions.addMetadataFieldAtPath(availableMetadataField.name, availableMetadataField.value, availableMetadataField.addPath));
  },
  render: function() {
    var that = this;
    return (
      <div className="metadata-sidebar-panel">
        {
          Object.keys(this.state.activeMetadataFields).map(function(fieldIndex) {
            var metadataField = that.state.activeMetadataFields[fieldIndex];
            return (
              <div className="row" key={fieldIndex}>
                <div className="col-md-3 metadata-field-label">
                  {(() => {
                    if(metadataField.name === undefined) {
                      return (
                        <FormSelect id={fieldIndex} options={that.state.availableMetadataFields} placeholder="Choose field" selectedOption="" onChange={that.updateMetadataFieldsWithSelectedOption}/>
                      );
                    } else {
                      return (
                        metadataField.label
                      );
                    }
                  })()}
                </div>
                <div className="col-md-7 metadata-field-value">
                  {(() => {
                    if(metadataField.name === undefined) {
                      return (
                        <div>N/A</div>
                      );
                    } else {
                      return (
                        <EditableTextArea fieldValue={metadataField.value} path={metadataField.updatePath} onUpdateHandler={that.updateMetadataFieldValue}/>
                      );
                    }
                  })()}
                </div>
                {(() => {
                  if(!metadataField.isRequired) {
                    return (
                      <div className="col-md-2">
                        <button type="button" className="btn btn-danger btn-xs" aria-label="Delete metadata field" onClick={() => that.deleteMetadataField(metadataField, fieldIndex)}>
                          <span className="fa fa-remove" aria-hidden="true"></span>
                        </button>
                      </div>
                    );
                  }
                })()}
              </div>
            );
          })
        }
        {(() => {
          if(Object.keys(that.state.availableMetadataFields).length > 0) {
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
