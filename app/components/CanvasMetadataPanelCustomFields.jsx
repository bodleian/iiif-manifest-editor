var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var MetadataFieldDialog = require('./MetadataFieldDialog');
var Utils = require('Utils');

var CanvasMetadataPanelCustomFields = React.createClass({
  getInitialState: function() {
    return {
      selectedMetadataFieldToViewJson: {
        label: undefined,
        value: undefined
      },
      activeMetadataFields: []
    }
  },
  componentWillMount: function() {
    // initialize the active metadata field list with the fields defined in the metadata block of the canvas
    if(this.props.selectedCanvasId !== undefined) {
      var sequence = this.props.manifestoObject.getSequenceByIndex(0);
      var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
      var canvasMetadataFields = canvas.__jsonld.metadata;
      if(canvasMetadataFields !== undefined && canvasMetadataFields.length > 0) {
        this.setState({
          activeMetadataFields: canvasMetadataFields
        });
      }
    }
  },
  addMetadataField: function(metadataFieldLabel, metadataFieldValue, path) {
    // create a copy of the active metadata field list
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // append the metadata field to the list of active metadata fields in the state
    var metadataFieldObject = { label: metadataFieldLabel, value: metadataFieldValue };
    activeMetadataFields.push(metadataFieldObject);

    // update the active metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      activeMetadataFields: activeMetadataFields
    });

    // add the metadata field object to the list at the given path to the manifest data object in the store
    this.props.dispatch(actions.addMetadataFieldToListAtPath(metadataFieldObject, path));
  },
  updateMetadataFieldValue: function(fieldValue, path) {
    // update the metadata field value for the manifest data object in the store
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  deleteMetadataField: function(path, fieldIndex) {
    // create a copy of the active metadata field list
    var activeMetadataFields = [...this.state.activeMetadataFields];

    // delete the metadata field from the list of active fields
    activeMetadataFields.splice(fieldIndex, 1);

    // update the active metadata field list in the state so that the component uses the correct values when rendering
    this.setState({
      activeMetadataFields: activeMetadataFields
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
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
    if(canvas !== null) {
      var selectedCanvasIndex = sequence.getCanvasIndexById(canvas.id);
      var canvasMetadataPath = "sequences/0/canvases/" + selectedCanvasIndex + "/metadata";
      var _this = this;
      return (
        <div>
          <MetadataFieldDialog ref="metadataFieldDialog" metadataField={this.state.selectedMetadataFieldToViewJson} />
          {
            Object.keys(this.state.activeMetadataFields).map(function(fieldIndex) {
              var metadataField = _this.state.activeMetadataFields[fieldIndex];
              return (
                <dl key={fieldIndex}>
                  <dt className="metadata-field-label">
                    {(() => {
                      if(typeof metadataField.label === 'string' || metadataField.label instanceof String) {
                        return (
                          <EditableTextArea fieldValue={metadataField.label.toString()} path={canvasMetadataPath + "/" + fieldIndex + "/label"} onUpdateHandler={_this.updateMetadataFieldValue}/>
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
                                <EditableTextArea fieldValue={metadataField.value.toString()} path={canvasMetadataPath + "/" + fieldIndex + "/value"} onUpdateHandler={_this.updateMetadataFieldValue}/>
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
                        <a href="javascript:;" title={"Delete " + metadataField.label + " field"} onClick={() => _this.deleteMetadataField(canvasMetadataPath, fieldIndex)}>
                          <span className="fa fa-times-circle"></span>
                        </a>
                      </dd>
                    );
                  })()}
                </dl>
              );
            })
          }
          <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={() => _this.addMetadataField('Label', 'Value', canvasMetadataPath)}>
            <span className="fa fa-plus"></span> Add metadata field
          </button>
        </div>
      );
    } else if(this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length < 1) {
      return (
        <div>
          This sequence does not have any canvases.
        </div>
      );
    } else {
      return (
        <div>
          The selected canvas has been deleted.
        </div>
      );
    }
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData,
      selectedCanvasId: state.manifestReducer.selectedCanvasId
    };
  }
)(CanvasMetadataPanelCustomFields);