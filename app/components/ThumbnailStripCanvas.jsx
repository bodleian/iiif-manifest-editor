var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var manifesto = require('manifesto.js');

var ThumbnailStripCanvas = React.createClass({
  getInitialState: function() {
    return {
      contextMenu: undefined
    }
  },
  componentDidMount: function() {
    var $canvas = $(ReactDOM.findDOMNode(this));

    // attach contextmenu event to the canvas to show menu options on a right-click event
    this.attachContextMenuEventToCanvas($canvas);

    // attach click event to the entire document to hide displayed menu options when clicking anywhere in the view
    this.attachClickEventToDocument($canvas);
  },
  attachContextMenuEventToCanvas: function($canvas) {
    var that = this;
    $canvas.bind('contextmenu', function(e) {
      e.preventDefault();

      // hide every displayed context menu before displaying the one for the current selected canvas
      var $parentOfCanvas = $(ReactDOM.findDOMNode(this).parentNode);
      for(var canvasIndex = 0; canvasIndex < $parentOfCanvas.children().length; canvasIndex++) {
        var $currentCanvas = $($parentOfCanvas.children()[canvasIndex]);
        var $currentCanvasMenu = $currentCanvas.children('ul.custom-menu:first');
        $currentCanvasMenu.hide();
      }
      var $contextMenu = $canvas.children('ul.custom-menu:first');
      // show the context menu and position it at the clicked mouse coordinates
      $contextMenu
        .toggle()
        .css({
          top: (e.pageY - $contextMenu.height()) + "px",
          left: e.pageX + "px"
        });

      // save the currently displayed context menu to the state so we can hide it later when needed
      that.setState({ contextMenu: $contextMenu });
    });
  },
  attachClickEventToDocument: function($canvas) {
    var that = this;
    $(document).bind('click', function(e) {
      // hide the context menu when clicking anywhere in the view
      if(that.state.contextMenu !== undefined) {
        that.state.contextMenu.hide();
      }
    });
  },
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
    return canvas.getThumbUri('', '150');
  },
  addCanvasLeft: function() {
    console.log('Add canvas on the left');
  },
  addCanvasRight: function() {
    console.log('Add canvas on the right');
  },
  duplicateCanvas: function() {
    console.log('Duplicate canvas');
  },
  deleteCanvas: function() {
    // dispatch an action to delete the canvas at the given index from the thumbnail strip
    var {dispatch, canvasIndex} = this.props;
    dispatch(actions.deleteCanvasAtIndex(canvasIndex));
    if (canvasIndex == this.props.manifestoObject.getSequenceByIndex(0).getCanvasIndexById(this.props.selectedCanvasId)) {
      dispatch(actions.setSelectedCanvasId(undefined));
    }
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return (
      <div>
        <ul className='custom-menu'>
          <li onClick={this.addCanvasLeft}><i className="context-menu-item fa fa-arrow-left"></i> Add canvas left</li>
          <li onClick={this.addCanvasRight}><i className="context-menu-item fa fa-arrow-right"></i> Add canvas right</li>
          <li onClick={this.duplicateCanvas}><i className="context-menu-item fa fa-files-o"></i> Duplicate canvas</li>
          <li onClick={this.deleteCanvas}><i className="context-menu-item fa fa-trash"></i> Delete canvas</li>
        </ul>
        <div className={this.setActiveClass()} onClick={this.setSelectedCanvasId}>
          <img src={this.getMainImage()} alt={canvas.getLabel()} height="150" />
          <div className="canvas-label">
            {canvas.getLabel()}
          </div>
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
