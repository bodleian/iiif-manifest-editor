var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var MetadataFieldDialog = require('MetadataFieldDialog');
var Utils = require('Utils');

var ManifestMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    return {
      selectedMetadataFieldToViewJson: {
        label: undefined,
        value: undefined
      },
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
  deleteMetadataField: function(path, fieldIndex) {
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
  viewJsonMetadata: function(metadataFieldLabel, metadataFieldValue) {
    // set the selected metadata field in the state to display the metadata field dialog with the correct data
    this.setState({
      selectedMetadataFieldToViewJson: {
        label: metadataFieldLabel,
        value: metadataFieldValue
      }
    });

    // open the metadata field dialog
    var $metadataFieldDialog = $(ReactDOM.findDOMNode(this.refs.metadataFieldDialog));
    $metadataFieldDialog.modal({
      backdrop: 'static'
    });
  },
  render: function() {
    var _this = this;
    return (
      <div>
        <MetadataFieldDialog ref="metadataFieldDialog" metadataField={this.state.selectedMetadataFieldToViewJson} />
        {
          this.state.metadataFields.map((metadataField, fieldIndex) => {
            return (
              <dl key={fieldIndex}>
                <dt className="metadata-field-label">
                  {(() => {
                    if(typeof metadataField.label === 'string' || metadataField.label instanceof String) {
                      return (
                        <EditableTextArea
                          fieldValue={metadataField.label.toString()}
                          updateHandler={_this.updateMetadataPropertyValue.bind(this, "metadata/" + fieldIndex + "/label")}
                        />
                      );
                    } else {
                      return (
                        <span>{Utils.getMetadataField('label', metadataField.label)}</span>
                      );
                    }
                  })()}
                </dt>
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
                              <EditableTextArea
                                fieldValue={metadataField.value.toString()}
                                updateHandler={_this.updateMetadataPropertyValue.bind(this, "metadata/" + fieldIndex + "/value")}
                              />
                            );
                          } else {
                            return (
                              <span><a href="javascript:;" title="View JSON metadata" onClick={() => _this.viewJsonMetadata(metadataField.label, JSON.stringify(metadataField.value, null, 2))}>View JSON metadata</a></span>
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
                      <a href="javascript:;" title={"Delete " + metadataField.label + " field"} onClick={() => _this.deleteMetadataField('metadata', fieldIndex)}>
                        <span className="fa fa-times-circle"></span>
                      </a>
                    </dd>
                  );
                })()}
              </dl>
            );
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