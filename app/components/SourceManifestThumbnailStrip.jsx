var React = require('react');
var SourceManifestThumbnailStripCanvas = require('SourceManifestThumbnailStripCanvas');

var SourceManifestThumbnailStrip = React.createClass({
  getInitialState: function() {
    return {
      selectedCanvasStartIndex: undefined,
      selectedCanvasEndIndex: undefined
    }
  },
  setCanvasStartIndex: function(startCanvasIndex) {
    // set the start index for the range of selected canvases
    this.setState({
      selectedCanvasStartIndex: startCanvasIndex,
      selectedCanvasEndIndex: undefined
    });

    // refresh the viewer with selected canvas
    this.props.onSelectHandler(startCanvasIndex);
  },
  setCanvasEndIndex: function(endCanvasIndex) {
    // set the start and end indexes for the range of selected canvases
    var selectedCanvasStartIndex = this.state.selectedCanvasStartIndex !== undefined ? this.state.selectedCanvasStartIndex : endCanvasIndex;
    var selectedCanvasEndIndex = endCanvasIndex;
    if(this.state.selectedCanvasStartIndex > endCanvasIndex) {
      selectedCanvasStartIndex = endCanvasIndex;
      selectedCanvasEndIndex = this.state.selectedCanvasStartIndex;
    }
    this.setState({
      selectedCanvasStartIndex: selectedCanvasStartIndex,
      selectedCanvasEndIndex: selectedCanvasEndIndex
    });
  },
  isCanvasSelected: function(currentCanvasIndex) {
    // return whether the canvas is selected if its index falls within the selected start and end range
    if(this.state.selectedCanvasStartIndex !== undefined && this.state.selectedCanvasEndIndex !== undefined) {
      return currentCanvasIndex >= this.state.selectedCanvasStartIndex && currentCanvasIndex <= this.state.selectedCanvasEndIndex;
    }
    // select the current canvas if an incomplete range is specified
    else {
      return currentCanvasIndex == this.state.selectedCanvasStartIndex || currentCanvasIndex == this.state.selectedCanvasEndIndex;
    }
  },
  setCanvasData: function(e) {
    var rawCanvasData = [];
    var canvases = this.props.sequence.getCanvases();
    var draggedCanvasIndex = e.target.getAttribute('data-canvas-index');
    
    // Case 1: both start and end index are defined
    if(this.state.selectedCanvasStartIndex !== undefined && this.state.selectedCanvasEndIndex !== undefined) {
      if(draggedCanvasIndex < this.state.selectedCanvasStartIndex || draggedCanvasIndex > this.state.selectedCanvasEndIndex) {
        var canvas = canvases[draggedCanvasIndex];
        rawCanvasData.push(canvas.__jsonld);  
      } else {
        for(var canvasIndex = this.state.selectedCanvasStartIndex; canvasIndex <= this.state.selectedCanvasEndIndex; canvasIndex++) {
          var canvas = canvases[canvasIndex];
          rawCanvasData.push(canvas.__jsonld);
        }
      }
    }

    // Case 2: only start index is defined (single canvas)
    else if(this.state.selectedCanvasStartIndex !== undefined && this.state.selectedCanvasEndIndex === undefined) {
      var canvas = canvases[this.state.selectedCanvasStartIndex];
      if(draggedCanvasIndex !== this.state.selectedCanvasStartIndex) {
        canvas = canvases[draggedCanvasIndex];
      }
      rawCanvasData.push(canvas.__jsonld);  
    }

    // Case 3: neither start nor end index are defined
    else if(this.state.selectedCanvasStartIndex === undefined && this.state.selectedCanvasEndIndex === undefined) {
      var canvas = canvases[draggedCanvasIndex];
      rawCanvasData.push(canvas.__jsonld);  
    }

    // Case 4: only end index is defined => this scenario should not occur
    else if(this.state.selectedCanvasStartIndex === undefined && this.state.selectedCanvasEndIndex !== undefined) {
      
    }
    
    e.dataTransfer.setData("text/plain", JSON.stringify(rawCanvasData));
  },
  render: function() {
    var _this = this;
    return (
      <div className="source-manifest-thumbnail-strip" onDragStart={this.setCanvasData}>
        {
          this.props.sequence.getCanvases().map(function(canvas, canvasIndex) {
            return (
              <SourceManifestThumbnailStripCanvas key={canvasIndex} canvas={canvas} canvasIndex={canvasIndex} isSelectedCanvas={_this.isCanvasSelected(canvasIndex)} onCanvasNormalClick={_this.setCanvasStartIndex} onCanvasShiftClick={_this.setCanvasEndIndex}/>
            );
          })
        }
      </div>
    );
  }
});

module.exports = SourceManifestThumbnailStrip;