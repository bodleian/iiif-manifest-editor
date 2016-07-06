var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');

var ThumbnailStrip = React.createClass({
  componentWillMount: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var firstCanvas = sequence.getCanvasByIndex(0);
    // Set first canvas as selectedCanvasData on initial load to set active class on first canvas in thumbnail strip
    this.props.dispatch(actions.setSelectedCanvasData(firstCanvas));
  },
  buildThumbnailStripCanvasComponents: function(sequence) {
    var thumbnailStripCanvasComponents = [];
    for(var canvasIndex = 0; canvasIndex < sequence.getCanvases().length; canvasIndex++) {
      var canvas = sequence.getCanvasByIndex(canvasIndex);
      thumbnailStripCanvasComponents.push(<ThumbnailStripCanvas key={canvasIndex} canvas={canvas}/>);
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
