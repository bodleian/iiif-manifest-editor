var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var FormSelect = require('FormSelect');

var ManifestMetadataPanel = React.createClass({
  getInitialState: function() {
    return {
      mandatoryMetadataFields: {},
      optionalMetadataFields: {},
      allowableMetadataFieldNames: ['description', 'attribution', 'license', 'logo'],
      availableMetadataFieldNames: []
    }
  },
  componentWillMount: function() {
    // initialize the list of mandatory and optional metadata fields using metadata from the manifest
    this.loadMetadataFromManifest();
  },
  componentDidMount: function() {
    // initialize the list of allowable metadata field names based on the ones that have already been loaded
    this.setAvailableMetadataFieldNames();
  },
  loadMetadataFromManifest: function() {
    // update a copy of the mandatory metadata fields in the state with values from the loaded manifest
    var updatedMandatoryMetadataFields = {
      ...this.state.mandatoryMetadataFields
    };
    if(this.props.manifestoObject.getLabel() !== null) {  // manifest label
      updatedMandatoryMetadataFields.label = { label: 'Label', path: 'label', value: this.props.manifestoObject.getLabel() };
    }

    // update a copy of the optional metadata fields in the state with values from the loaded manifest
    var updatedOptionalMetadataFields = {
      ...this.state.optionalMetadataFields
    };
    if(this.props.manifestoObject.getDescription() !== null) {  // description
      updatedOptionalMetadataFields.description = { label: 'Description', path: 'description/1/label', value: this.props.manifestoObject.getDescription() };
    }
    if(this.props.manifestoObject.getAttribution() !== null) {  // attribution
      updatedOptionalMetadataFields.attribution = { label: 'Attribution', path: 'attribution', value: this.props.manifestoObject.getAttribution() };
    }
    if(this.props.manifestoObject.getLicense() !== null) {  // license
      updatedOptionalMetadataFields.license = { label: 'License', path: 'license', value: this.props.manifestoObject.getLicense() };
    }
    if(this.props.manifestoObject.getLogo() !== null) {  // logo
      updatedOptionalMetadataFields.license = { label: 'Logo', path: 'logo', value: this.props.manifestoObject.getLogo() };
    }

    // update the state with the list of mandatory and optional metadata fields so that the component uses the correct values when rendering
    this.setState({
      mandatoryMetadataFields: updatedMandatoryMetadataFields,
      optionalMetadataFields: updatedOptionalMetadataFields
    });
  },
  setAvailableMetadataFieldNames: function() {
    var usedMetadataFieldNames = Object.keys(this.state.optionalMetadataFields);

    // filter out the metadata fields that are already in use
    var availableMetadataFieldNames = this.state.allowableMetadataFieldNames.filter(function(fieldName) {
      return usedMetadataFieldNames.indexOf(fieldName) < 0;
    });

    // update the state with the list of available metadata field names
    this.setState({
      availableMetadataFieldNames: availableMetadataFieldNames
    });
  },
  addMetadataField: function(fieldName, fieldValue, path) {
    // TODO: append the new metadata field to the list of optional metadata fields

    // TODO: update the list of available metadata field names to include the newly added field name
  },
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  render: function() {
    var that = this;
    return (
      <div className="metadata-sidebar-panel">
        {
          Object.keys(this.state.mandatoryMetadataFields).map(function(key) {
            var mandatoryField = that.state.mandatoryMetadataFields[key];
            return (
              <div className="row" key={key}>
                <div className="col-md-3 metadata-field-label">
                  {mandatoryField.label}
                </div>
                <div className="col-md-9 metadata-field-value">
                  <EditableTextArea fieldValue={mandatoryField.value} path={mandatoryField.path} onUpdateHandler={that.saveMetadataFieldToStore}/>
                </div>
              </div>
            );
          })
        }
        {
          Object.keys(this.state.optionalMetadataFields).map(function(key) {
            var optionalField = that.state.optionalMetadataFields[key];
            {
              if(optionalField.value !== undefined) {
                return (
                  <div className="row" key={key}>
                    <div className="col-md-3 metadata-field-label">
                      <FormSelect options={that.state.allowableMetadataFieldNames} placeholder="Choose metadata field" selectedOption={key}/>
                    </div>
                    <div className="col-md-9 metadata-field-value">
                      <EditableTextArea fieldValue={optionalField.value} path={optionalField.path} onUpdateHandler={that.saveMetadataFieldToStore}/>
                    </div>
                  </div>
                );
              }
            }
          })
        }
        {(() => {
          if(this.state.availableMetadataFieldNames.length > 0) {
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
