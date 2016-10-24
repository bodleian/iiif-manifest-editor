var React = require('react');
var {connect} = require('react-redux');

var ManifestMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    return {
      activeMetadataFields: []
    }
  },
  componentWillMount: function() {
    // initialize the active metadata field list with the fields defined in the manifest
    this.setState({
      activeMetadataFields: this.props.manifestoObject.getMetadata()
    });
  },
  addMetadataField: function(metadataFieldLabel, metadataFieldValue) {
    // create a copy of the active metadata field list
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // append the metadata field to the list of active metadata fields in the state
    activeMetadataFields.push({ label: metadataFieldLabel, value: metadataFieldValue });

    // update the active metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      activeMetadataFields: activeMetadataFields
    });
  },
  deleteMetadataField: function(fieldIndex) {
    // create a copy of the active metadata field list
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // delete the metadata field from the list of active fields
    activeMetadataFields.splice(fieldIndex, 1);

    // update the active metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      activeMetadataFields: activeMetadataFields
    });

    // TODO: delete the metadata field from the manifest data object in the store
    // this.props.dispatch(actions.deleteMetadataFieldAtPath(metadataFieldToDelete.updatePath));
  },
  render: function() {
    var _this = this;
    return (
      <div>
        {
          Object.keys(this.state.activeMetadataFields).map(function(fieldIndex) {
            var metadataField = _this.state.activeMetadataFields[fieldIndex];
            return (
              <dl key={fieldIndex}>
                {(() => {
                  if(metadataField.label === undefined) {
                    return (
                      <dt className="metadata-field-label">
                        Show text area
                      </dt>
                    );
                  } else {
                    return (
                      <dt className="metadata-field-label">
                        {metadataField.label}
                      </dt>
                    );
                  }
                })()}
                {(() => {
                  if(metadataField.value === undefined) {
                    return (
                      <dd className="metadata-field-value">N/A</dd>
                    );
                  } else {
                    return (
                      <dd className="metadata-field-value">
                        {(() => {
                          if(typeof metadataField.value === 'string' || metadataField.value instanceof String) {
                            return (
                              <EditableTextArea fieldName={metadataField.label} fieldValue={metadataField.value.toString()} path="" onUpdateHandler={_this.updateMetadataFieldValue}/>
                            );
                          } else {
                            return (
                              <span>{JSON.stringify(metadataField.value)}</span>
                            );
                          }
                        })()}                    
                      </dd>
                    );
                  }
                })()}                    
                {(() => {
                  return (
                    <dd className="metadata-field-delete">
                      <a href="javascript:;" title={"Delete " + metadataField.label + " field"} onClick={() => _this.deleteMetadataField(fieldIndex)}>
                        <span className="fa fa-times-circle"></span>
                      </a>
                    </dd>
                  );
                })()}
              </dl>
            );
          })
        }
        <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={() => _this.addMetadataField(undefined, undefined)}>
          <span className="fa fa-plus"></span> Add metadata field
        </button>
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
)(ManifestMetadataPanelCustomFields);