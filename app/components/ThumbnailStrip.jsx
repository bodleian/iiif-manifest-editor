var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');

var ThumbnailStrip = React.createClass({
  buildThumbnailStripCanvasComponents: function(sequence) {
    var thumbnailStripCanvasComponents = [];
    for(var canvasIndex = 0; canvasIndex < sequence.getCanvases().length; canvasIndex++) {
      var canvas = sequence.getCanvasByIndex(canvasIndex);
      thumbnailStripCanvasComponents.push(<ThumbnailStripCanvas key={canvasIndex} canvasIndex={canvasIndex} canvasId={canvas.id}/>);
    }
    return thumbnailStripCanvasComponents;
  },
  render: function() {
    return (
      <div className="row thumbnail-strip-container">
        {this.buildThumbnailStripCanvasComponents(this.props.manifestoObject.getSequenceByIndex(0))}
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
)(ThumbnailStrip);
