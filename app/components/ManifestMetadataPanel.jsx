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
          id: 'label',
          label: 'Label',
          value: undefined,
          isRequired: true,
          isUnique: true,
          path: 'label'
        },
        {
          id: 'description',
          label: 'Description',
          value: undefined,
          isRequired: false,
          isUnique: true,
          path: 'description/0/@value'
        },
        {
          id: 'attribution',
          label: 'Attribution',
          value: undefined,
          isRequired: false,
          isUnique: true,
          path: 'attribution'
        },
        {
          id: 'license',
          label: 'License',
          value: undefined,
          isRequired: false,
          isUnique: true,
          path: 'license'
        },
        {
          id: 'logo',
          label: 'Logo',
          value: undefined,
          isRequired: false,
          isUnique: true,
          path: 'logo'
        }
      ],
      activeMetadataFields: []
    }
  },
  setMetadataField: function(fieldId, fieldValue, availableMetadataFields, activeMetadataFields) {
    // find the available metadata field based on the field id
    var availableMetadataFieldIndex = -1;
    Object.keys(availableMetadataFields).map(function(index) {
      var metadataField = availableMetadataFields[index];
      if(metadataField.id === fieldId) {
        availableMetadataFieldIndex = index;
      }
    });

    // append the metadata field to the list of used fields
    var availableMetadataField = availableMetadataFields[availableMetadataFieldIndex];
    availableMetadataField.value = fieldValue;
    activeMetadataFields.push(availableMetadataField);

    // delete the metadata field from list of available fields for unique fields
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
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // append the first optional metadata field to the list
    activeMetadataFields.push({
      id: undefined,
      label: 'Choose a field',
      value: 'N/A',
      isRequired: false,
      isUnique: true,
      path: undefined
    });

    // update the state
    this.setState({
      activeMetadataFields: activeMetadataFields
    });

    // TODO: add the metadata field to the manifest data object in the store
    // this.props.dispatch(actions.addMetadataFieldAtPath('dougkim', 'Douglas Kim is here'));
  },
  updateMetadataFieldName: function(previousSelectedOption, currentSelectedOption) {
    // create a copy of the metadata fields to update
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // append the first optional metadata field to the list
    activeMetadataFields.push({
      id: 'description',
      label: 'Description',
      value: 'N/A',
      isRequired: false,
      path: 'description/1/label'
    });

    // update the state
    this.setState({
      activeMetadataFields: activeMetadataFields
    });

    // TODO: update the metadata field to the manifest data object in the store
  },
  updateMetadataFieldValue: function(fieldValue, path) {
    // update the metadata field value to the manifest data object in the store
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  deleteMetadataField: function() {
    console.log('Delete metadata field');

    // TODO: move the metadata field to the list of available

    // TODO: delete the metadata field from the list of used
  },
  render: function() {
    var that = this;
    console.log('Metadata Fields', this.state.activeMetadataFields);
    return (
      <div className="metadata-sidebar-panel">
        {
          Object.keys(this.state.activeMetadataFields).map(function(index) {
            var metadataField = that.state.activeMetadataFields[index];
            return (
              <div className="row" key={index}>
                <div className="col-md-3 metadata-field-label">
                  {(() => {
                    if(metadataField.id === undefined) {
                      return (
                        <FormSelect options={that.state.availableMetadataFields} selectedOption={metadataField.id} onChange={that.updateMetadataFieldsWithSelectedOption}/>
                      );
                    } else {
                      return (
                        metadataField.label
                      );
                    }
                  })()}
                </div>
                <div className="col-md-7 metadata-field-value">
                  <EditableTextArea fieldValue={metadataField.value} path={metadataField.path} onUpdateHandler={that.updateMetadataFieldValue}/>
                </div>
                {(() => {
                  if(!metadataField.isRequired) {
                    return (
                      <div className="col-md-2">
                        <button type="button" className="btn btn-default" aria-label="Delete metadata field" onClick={that.deleteMetadataField}>
                          <span className="fa fa-trash" aria-hidden="true"></span>
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
