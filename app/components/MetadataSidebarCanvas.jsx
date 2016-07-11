var React = require('react');
var {connect} = require('react-redux');
var manifesto = require('manifesto.js');

var MetadataSidebarCanvas = React.createClass({
  getMainImage: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return canvas.getThumbUri('', '150');
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return (
      <div className="metadata-sidebar-canvas">
        <img src={this.getMainImage()} alt={canvas.getLabel()} height="150" />
        <div className="canvas-label">
          {canvas.getLabel()}
        </div>
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
)(MetadataSidebarCanvas);
