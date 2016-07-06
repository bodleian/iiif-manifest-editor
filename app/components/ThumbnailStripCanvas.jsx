var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var manifesto = require('manifesto.js');

var ThumbnailStripCanvas = React.createClass({
  setSelectedCanvasId: function() {
    var {dispatch, canvasId} = this.props;
    dispatch(actions.setSelectedCanvasId(canvasId));
  },
  setActiveClass: function() {
    if(this.props.selectedCanvasId !== undefined && this.props.canvasId === this.props.selectedCanvasId) {
      return "thumbnail-strip-canvas active";
    } else {
      return "thumbnail-strip-canvas";
    }
  },
  getMainImage: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return canvas.getThumbUri('100', '150');
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return (
      <div className={this.setActiveClass()} onClick={this.setSelectedCanvasId}>
        <img src={this.getMainImage()} alt={canvas.getLabel()} height="150" />
        <div className="thumbnail-strip-canvas-label">
          {canvas.getLabel()}
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      selectedCanvasId: state.manifestReducer.selectedCanvasId
    };
  }
)(ThumbnailStripCanvas);
