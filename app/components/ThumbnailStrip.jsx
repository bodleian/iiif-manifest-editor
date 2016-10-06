var React = require('react');
var {connect} = require('react-redux');
var ReactDOM = require('react-dom');
var actions = require('actions');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');
var uuid = require('node-uuid');
var {SortableItems, SortableItem} = require('react-sortable-component');

var ThumbnailStrip = React.createClass({
  componentDidMount: function() {
    window.addEventListener("drop",function(e){
      e = e || event;
      e.preventDefault();
    },false);
  },
  buildThumbnailStripCanvasComponents: function(sequence) {
    var thumbnailStripCanvasComponents = [];
    for(var canvasIndex = 0; canvasIndex < sequence.getCanvases().length; canvasIndex++) {
      var canvas = sequence.getCanvasByIndex(canvasIndex);
      thumbnailStripCanvasComponents.push(
        <SortableItem key={canvas.id} draggable={true} className="simple-sort-item">
        <ThumbnailStripCanvas key={canvasIndex} canvasIndex={canvasIndex} canvasId={canvas.id}/>
        </SortableItem>
      );
    }
    return thumbnailStripCanvasComponents;
  },
  componentDidUpdate: function(prevProps) {
    // always display the selected canvas to the very left of the thumbnail strip using scrollLeft
    if(this.props.selectedCanvasId !== prevProps.selectedCanvasId) {
      var $thumbnailStrip = $(ReactDOM.findDOMNode(this));
      var $activeCanvas = $thumbnailStrip.find('.thumbnail-strip-canvas.active');
      if($activeCanvas.offset() !== undefined) {
        var scrollPosition = $thumbnailStrip.scrollLeft() + ($activeCanvas.offset().left + $activeCanvas.width()/2) - $thumbnailStrip.width()/2;
        $activeCanvas.css({opacity:0.6});
        $($thumbnailStrip).animate({
          scrollLeft: scrollPosition,
        }, 300, function() {
          $activeCanvas.css({opacity:1.0});
        });
      }
    }
  },
  handleSort: function(updatedSortOrder) {
    this.props.dispatch(actions.reorderCanvases(updatedSortOrder));
  },

  appendEmptyCanvasToSequence: function() {
    // dispatch action to add empty canvas to end of sequence
    var targetCanvasIndex = this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length;
    var emptyCanvas = {
      "@id": "http://" + uuid(),
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
        <SortableItems name="simple-sort" onSort={this.handleSort}>
        {this.buildThumbnailStripCanvasComponents(this.props.manifestoObject.getSequenceByIndex(0))}
        </SortableItems>
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
