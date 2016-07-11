var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var EditableTextArea = require('EditableTextArea');
var MetadataSidebarCanvas = require('MetadataSidebarCanvas');

var CanvasMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldName, fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));

    // udpate the selected canvas id in the store so it updates in the thumbnail strip
    if(fieldName === "canvasId") {
      this.props.dispatch(actions.setSelectedCanvasId(fieldValue));
    }
  },
  updateImageAnnotationForCanvasWithId: function(fieldName, fieldValue, path) {
    // fetch new image annotation remotely
    var {dispatch} = this.props;
    dispatch(actions.startImageAnnotationFetch());
    var that = this;
    axios.get(fieldValue)
      .then(function(response) {
        var updatedImageAnnotation = response.data;
        // update the on property on the fetched image annotation to set it to the original canvas ID
        updatedImageAnnotation.on = that.props.selectedCanvasId;
        dispatch(actions.completeImageAnnotationFetch());
        // dispatch action to store to replace existing image annotation with fetched image annotation
        dispatch(actions.updateMetadataFieldValueAtPath(updatedImageAnnotation, path));
      })
      .catch(function(error) {
        dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'Error loading image annotation. Please provide a valid image annotation URI.'));
      });
  },
  displayImageAnnotationFetchErrors: function() {
    var {error} = this.props;
    if(error !== undefined) {
      return (
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <div className="alert alert-danger image-annotation-fetch-error">
              {error.message}
            </div>
          </div>
        </div>
      );
    }
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
    var image = canvas.getImages()[0];
    var canvasIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/@id";
    var canvasLabelPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/label";
    var canvasImageIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/images/0";
    return (
      <div className="metadata-sidebar-panel">
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas ID:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="canvasId" fieldValue={canvas.id} path={canvasIdPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas Label:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="canvaLabel" fieldValue={canvas.getLabel()} path={canvasLabelPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Image Annotation URI:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="imageId" fieldValue={image.id} path={canvasImageIdPath} onUpdateHandler={this.updateImageAnnotationForCanvasWithId}/>
          {this.displayImageAnnotationFetchErrors()}
        </div>
        <hr/>
        <MetadataSidebarCanvas canvasId={this.props.selectedCanvasId}/>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData,
      selectedCanvasId: state.manifestReducer.selectedCanvasId,
      error: state.manifestReducer.error
    };
  }
)(CanvasMetadataPanel);
