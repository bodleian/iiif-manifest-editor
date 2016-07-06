var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');

var CanvasMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = this.props.selectedCanvasData;
    var canvasLabel = canvas.getLabel();
    var image = canvas.getImages()[0];
    var canvasIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/id";
    var canvasLabelPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/label";
    var canvasImageIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/images/0/id";
    return (
      <div className="metadata-sidebar-panel">
        <ThumbnailStripCanvas canvas={this.props.selectedCanvasData}/>
        <hr/>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas ID:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={canvas.id} path={canvasIdPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas Label:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={canvasLabel} path={canvasLabelPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Image URI:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={image.id} path={canvasImageIdPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
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
      selectedCanvasData: state.manifestReducer.selectedCanvasData
    };
  }
)(CanvasMetadataPanel);
