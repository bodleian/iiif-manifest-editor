var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');
var uuid = require('uuid');
var {SortableItems, SortableItem} = require('react-sortable-component');
var OnScreenHelp = require('OnScreenHelp');

var ThumbnailStrip = React.createClass({
  getInitialState: function() {
    return {
      selectedCanvasStartIndex: undefined,
      selectedCanvasEndIndex: undefined,
      helpSection: ''
    }
  },
  showHelp: function(helpSection) {
    this.setState({
      helpSection: helpSection
    });
    var $onScreenHelp = $(ReactDOM.findDOMNode(this.refs.onScreenHelp));
    $onScreenHelp.modal({
      backdrop: 'static'
    });
  },
  scrollThumbnailStripByViewingDirection: function(viewingDirection) {
    // scroll to beginning or end of thumbnail strip depending on viewingDirection
    var $thumbnailStrip = $(ReactDOM.findDOMNode(this));
    var scrollPosition = 0;
    if(viewingDirection === 'right-to-left' || viewingDirection === 'bottom-to-top') {
      $thumbnailStrip.find('.sortable-item').each(function(index, elem){
        scrollPosition += ($(elem).width());
      });
    }
    $($thumbnailStrip).animate({
      scrollLeft: scrollPosition
    }, 300);
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.manifestData.viewingDirection !== nextProps.manifestData.viewingDirection) {
      this.scrollThumbnailStripByViewingDirection(nextProps.manifestData.viewingDirection);
    }
  },
  componentDidMount: function() {
    window.addEventListener("drop", function(e) {
      e = e || event;
      e.preventDefault();
    }, false);
    this.scrollThumbnailStripByViewingDirection(this.props.manifestData.viewingDirection);
  },
  componentDidUpdate: function(prevProps) {
    // center the selected canvas in the thumbnail strip using scrollLeft
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

    // deselect canvases on reorder
    this.deSelectCanvases();
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
  addCanvases: function(e) {
    // stops browsers from redirecting
    if(e.preventDefault) {
      e.preventDefault();
    }
    if(e.stopPropagation) {
      e.stopPropagation();
    }

    // get the index in the thumbnail strip to insert the selected canvases
    var insertIndex = e.target.getAttribute('data-canvas-index');

    // handle adding canvases to the beginning and end of a sequence (insertIndex is null)
    if (insertIndex === null) {
      // check mouse position to determine whether canvases were dropped to very beginning of sequence
      // everything above x = 20 is not beginning of sequence so either has an insertIndex or
      // if it is null it is assumed that canvases were dropped to the end of the sequence
      if (e.clientX > 20) {
        var sequence = this.props.manifestoObject.getSequenceByIndex(0);
        insertIndex = sequence.canvases.length;
      }
    }

    // raw canvas data is being passed as a JSON string
    var rawCanvasData = e.dataTransfer.getData('text/plain');
    if(rawCanvasData !== '') {
      var canvases = JSON.parse(rawCanvasData);
      for(var canvasIndex = canvases.length-1; canvasIndex >= 0; canvasIndex--) {
        this.props.dispatch(actions.addCanvasAtIndex(canvases[canvasIndex], insertIndex));
      }
    }

    // some browsers require a return false for handling drop events
    return false;
  },
  cancelDragOver: function(e) {
    // stops browsers from redirecting
    if(e.preventDefault) {
      e.preventDefault();
    }
    if(e.stopPropagation) {
      e.stopPropagation();
    }
    // some browsers require a return false for canceling the onDragOver event
    return false;
  },
  deSelectCanvases: function() {
    // reset the start and end range of the selected canvases
    this.setState({
      selectedCanvasStartIndex: undefined,
      selectedCanvasEndIndex: undefined
    });

    // hide the prompt to delete the selected canvases
    this.toggleDeleteSelectedCanvasesPrompt(false);
  },
  updateSelectedCanvasIndexes: function(clickedCanvasIndex) {
    // get the index of the active canvas
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
    var activeCanvasIndex = sequence.getCanvasIndexById(canvas.id);

    // set the start and end indexes for the selected range of canvases in the state
    var selectedCanvasStartIndex = (activeCanvasIndex > clickedCanvasIndex) ? clickedCanvasIndex : activeCanvasIndex;
    var selectedCanvasEndIndex = (activeCanvasIndex > clickedCanvasIndex) ? activeCanvasIndex : clickedCanvasIndex;
    this.setState({
      selectedCanvasStartIndex: selectedCanvasStartIndex,
      selectedCanvasEndIndex: selectedCanvasEndIndex
    });

    // show the prompt to delete the selected canvases
    this.toggleDeleteSelectedCanvasesPrompt(true);
  },
  toggleDeleteSelectedCanvasesPrompt: function(toggleDisplay) {
    var $deleteSelectedCanvasPrompt = $(ReactDOM.findDOMNode(this.refs.deleteSelectedCanvasPrompt));
    if(toggleDisplay) {
      $deleteSelectedCanvasPrompt.slideDown();
    } else {
      $deleteSelectedCanvasPrompt.slideUp();
    }
  },
  isCanvasSelected: function(currentCanvasIndex) {
    // return whether the canvas is selected if its index falls within the selected start and end range
    return currentCanvasIndex >= this.state.selectedCanvasStartIndex && currentCanvasIndex <= this.state.selectedCanvasEndIndex;
  },
  deleteSelectedCanvases: function() {
    // delete the selected canvases from the end of the thumbnail strip first; deleting from the front of the
    // thumbnail strip shifts the canvas indexes left causing subsequent deletions to fail
    var {dispatch, canvasIndex} = this.props;
    for(var canvasIndex = this.state.selectedCanvasEndIndex; canvasIndex >= this.state.selectedCanvasStartIndex; canvasIndex--) {
      // dispatch an action to reset the selected canvas id in the store if the active canvas is deleted
      if(canvasIndex == this.props.manifestoObject.getSequenceByIndex(0).getCanvasIndexById(this.props.selectedCanvasId)) {
        dispatch(actions.setSelectedCanvasId(undefined));
      }
      // dispatch an action to delete the selected canvas at the given index within the selected range
      dispatch(actions.deleteCanvasAtIndex(canvasIndex));
    }

    // deselect canvases after deleting canvases
    this.deSelectCanvases();
  },
  render: function() {
    var _this = this;
    return (
      <div className="thumbnail-strip-container" onDragOver={this.cancelDragOver} onDrop={this.addCanvases}>
        <OnScreenHelp ref="onScreenHelp" section={this.state.helpSection} />
        <div className="alert alert-danger delete-selected-canvases-prompt" ref="deleteSelectedCanvasPrompt">
          Delete selected canvases?
          <button type="button" className="btn btn-default" onClick={this.deleteSelectedCanvases}><i className="fa fa-check"></i> OK</button>
          <button type="button" className="btn btn-default" onClick={this.deSelectCanvases}><i className="fa fa-times"></i> Cancel</button>
        </div>
        <a className="help-icon" href="javascript:;" onClick={() => this.showHelp('ThumbnailStrip')} ><i className="fa fa-question-circle-o"></i></a>
        <SortableItems name="simple-sort" onSort={this.handleSort}>
          {
            this.props.manifestoObject.getSequenceByIndex(0).getCanvases().map(function(canvas, canvasIndex) {
              return (
                <SortableItem key={canvasIndex} draggable={true} className="simple-sort-item">
                  <ThumbnailStripCanvas key={canvasIndex} canvasIndex={canvasIndex} canvasId={canvas.id} isSelectedCanvas={_this.isCanvasSelected(canvasIndex)} onCanvasNormalClick={_this.deSelectCanvases} onCanvasShiftClick={_this.updateSelectedCanvasIndexes} />
                </SortableItem>
              );
            })
          }
        </SortableItems>
        <button type="button" className="btn btn-default add-new-canvas-button" title="Add new canvas to end of sequence" onClick={this.appendEmptyCanvasToSequence}>
          <span className="fa fa-plus-circle fa-2x"></span><br />Add Canvas
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
