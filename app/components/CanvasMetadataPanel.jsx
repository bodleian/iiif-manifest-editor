var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');

var CanvasMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldName, fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));

    // udpate the selected canvas id in the store so it updates in the thumbnail strip
    if(fieldName === "canvasId") {
      this.props.dispatch(actions.setSelectedCanvasId(fieldValue));
    }
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
    var image = canvas.getImages()[0];
    var canvasIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/@id";
    var canvasLabelPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/label";
    var canvasImageIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/images/0/@id";
    return (
      <div className="metadata-sidebar-panel">
        <ThumbnailStripCanvas canvasId={this.props.selectedCanvasId}/>
        <hr/>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas ID:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="canvasId" fieldValue={canvas.id} path={canvasIdPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas Label:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="canvaLabel" fieldValue={canvas.getLabel()} path={canvasLabelPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Image URI:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="imageId" fieldValue={image.id} path={canvasImageIdPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
      </div>
    );
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
)(CanvasMetadataPanel);
