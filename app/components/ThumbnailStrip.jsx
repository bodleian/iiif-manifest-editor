var React = require('react');
var {connect} = require('react-redux');
var ReactDOM = require('react-dom');
var actions = require('actions');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');
var uuid = require('node-uuid');

var ThumbnailStrip = React.createClass({
  buildThumbnailStripCanvasComponents: function(sequence) {
    var thumbnailStripCanvasComponents = [];
    for(var canvasIndex = 0; canvasIndex < sequence.getCanvases().length; canvasIndex++) {
      var canvas = sequence.getCanvasByIndex(canvasIndex);
      thumbnailStripCanvasComponents.push(<ThumbnailStripCanvas key={canvasIndex} canvasIndex={canvasIndex} canvasId={canvas.id}/>);
    }
    return thumbnailStripCanvasComponents;
  },
  componentDidUpdate: function(prevProps) {
    // always display the selected canvas to the very left of the thumbnail strip using scrollLeft
    if(this.props.selectedCanvasId !== prevProps.selectedCanvasId) {
      var $thumbnailStrip = $(ReactDOM.findDOMNode(this));
      var $activeCanvas = $thumbnailStrip.find('.thumbnail-strip-canvas.active');
      if($activeCanvas.offset() !== undefined) {
        var leftOffset = $activeCanvas.offset().left + $thumbnailStrip.scrollLeft();
        $thumbnailStrip.scrollLeft(leftOffset);
      }
    }
  },
  appendEmptyCanvasToSequence: function() {
    // dispatch action to add empty canvas to end of sequence
    var targetCanvasIndex = this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length;
    var emptyCanvas = {
      "@id": uuid(),
      "@type": "sc:Canvas",
      "label": "Empty canvas",
      "height": 0,
      "width": 0,
      "images": []
    };
    this.props.dispatch(actions.addEmptyCanvasAtIndex(emptyCanvas, targetCanvasIndex));
  },
  render: function() {
    return (
      <div className="row thumbnail-strip-container">
        {this.buildThumbnailStripCanvasComponents(this.props.manifestoObject.getSequenceByIndex(0))}
        <button type="button" className="btn btn-default add-new-canvas-button" aria-label="Add new canvas to end of sequence" onClick={this.appendEmptyCanvasToSequence}>
          <span className="fa fa-plus-circle fa-2x" aria-hidden="true"></span><br />Add Canvas
        </button>
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
)(ThumbnailStrip);
