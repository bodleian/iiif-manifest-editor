var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var FormSelect = require('FormSelect');

var ManifestMetadataPanel = React.createClass({
  getInitialState: function() {
    return {
      mandatoryMetadataFields: {
        label: {
          label: 'Label',
          path: 'label',
          value: undefined
        }
      },
      optionalMetadataFields: {
        description: {
          label: 'Description',
          path: 'description/1/label',
          value: undefined
        },
        attribution: {
          label: 'Attribution',
          path: 'attribution',
          value: undefined
        },
        license: {
          label: 'License',
          path: 'license',
          value: undefined
        },
        format: {
          label: 'Format',
          path: undefined,
          value: undefined
        },
        width: {
          label: 'Width',
          path: undefined,
          value: undefined
        },
        height: {
          label: 'Height',
          path: undefined,
          value: undefined
        },
        viewingDirection: {
          label: 'Viewing Direction',
          path: undefined,
          value: undefined
        },
        viewingHint: {
          label: 'Viewing Hint',
          path: undefined,
          value: undefined
        },
        logo: {
          label: 'Logo',
          path: undefined,
          value: undefined
        }
      }
    }
  },
  componentWillMount: function() {
    // update the mandatory metadata fields with values from the loaded manifest
    var updatedMandatoryMetadataFields = {
      ...this.state.mandatoryMetadataFields
    };
    updatedMandatoryMetadataFields.label.value = this.props.manifestoObject.getLabel();

    // update the optional metadata fields with values from the loaded manifest
    var updatedOptionalMetadataFields = {
      ...this.state.optionalMetadataFields
    };
    updatedOptionalMetadataFields.description.value = this.props.manifestoObject.getDescription();
    updatedOptionalMetadataFields.attribution.value = this.props.manifestoObject.getAttribution();
    updatedOptionalMetadataFields.license.value = this.props.manifestoObject.getLicense();

    // update the state variables so that the initial render of the component uses the correct values
    this.setState({
      mandatoryMetadataFields: updatedMandatoryMetadataFields,
      optionalMetadataFields: updatedOptionalMetadataFields
    });
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
                      <FormSelect options={that.state.optionalMetadataFields} placeholder="Choose field" selectedOption={key}/>
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
