var React = require('react');
var {connect} = require('react-redux');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');
var EditableTextArea = require('EditableTextArea');


var CanvasMetadataPanel = React.createClass({
  render: function() {
    var canvas = this.props.selectedCanvasData;
    var canvasLabel = canvas.getLabel();
    var image = canvas.getImages()[0];
    return (
      <div className="metadata-sidebar-panel">
        <ThumbnailStripCanvas canvas={this.props.selectedCanvasData}/>
        <hr/>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas ID:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="label" fieldValue={canvas.id} onUpdateHandler={()=>{}}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Canvas Label:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="label" fieldValue={canvasLabel} onUpdateHandler={()=>{}}/>
        </div>
        <div className="row">
          <div className="col-md-3 metadata-field-label">Image URI:</div>
          <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="label" fieldValue={image.id} onUpdateHandler={()=>{}}/>
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      selectedCanvasData: state.manifestReducer.selectedCanvasData
    };
  }
)(CanvasMetadataPanel);
