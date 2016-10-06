var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var manifesto = require('manifesto.js');
var uuid = require('node-uuid');

var ThumbnailStripCanvas = React.createClass({
  componentDidMount: function() {
    var $canvas = $(ReactDOM.findDOMNode(this));

    // attach hover event to the canvas to fade in and out canvas menu options
    this.attachHoverEventToCanvas($canvas);
  },
  attachHoverEventToCanvas: function($canvas) {
    var fadeInterval = 400;

    // fade in and out the canvas menu options
    var $canvasMenuOptions = $canvas.find('.canvas-menu-options');
    $canvas.hover(function() {
      $canvasMenuOptions.stop(true, true).fadeIn(fadeInterval);
    }, function () {
      $canvasMenuOptions.stop(true, true).fadeOut(fadeInterval);
    });

    // fade in and out the delete canvas button
    var $deleteCanvasButton = $canvas.find('.delete-canvas-button');
    $canvas.hover(function() {
      $deleteCanvasButton.stop(true, true).fadeIn(fadeInterval);
    }, function () {
      $deleteCanvasButton.stop(true, true).fadeOut(fadeInterval);
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
  getMainImage: function(canvas) {
    return canvas.getImages().length > 0 ? canvas.getThumbUri('', '150') : 'https://placeholdit.imgix.net/~text?txtsize=20&txt=Empty+Canvas&w=100&h=150';
  },
  getMainImageLabel: function(canvas) {
    return canvas !== null ? canvas.getLabel() : 'Empty canvas';
  },
  addCanvasLeft: function() {
    // dispatch an action to add an empty canvas to the left of the given canvas
    var {dispatch, canvasIndex} = this.props;
    var emptyCanvas = {
      "@id": "http://" + uuid(),
      "@type": "sc:Canvas",
      "label": "Empty canvas",
      "height": 0,
      "width": 0,
      "images": []
    };
    dispatch(actions.addEmptyCanvasAtIndex(emptyCanvas, canvasIndex));
  },
  addCanvasRight: function() {
    // dispatch an action to add an empty canvas to the left of the given canvas
    var {dispatch, canvasIndex} = this.props;
    var emptyCanvas = {
      "@id": "http://" + uuid(),
      "@type": "sc:Canvas",
      "label": "Empty canvas",
      "height": 0,
      "width": 0,
      "images": []
    };
    dispatch(actions.addEmptyCanvasAtIndex(emptyCanvas, canvasIndex + 1));
  },
  duplicateCanvas: function() {
    // dispatch an action to duplicate the canvas at the given index
    var {dispatch, canvasIndex} = this.props;
    dispatch(actions.duplicateCanvasAtIndex(canvasIndex));
  },
  deleteCanvas: function() {
    // dispatch an action to delete the canvas at the given index from the thumbnail strip
    var {dispatch, canvasIndex} = this.props;
    if (canvasIndex == this.props.manifestoObject.getSequenceByIndex(0).getCanvasIndexById(this.props.selectedCanvasId)) {
      dispatch(actions.setSelectedCanvasId(undefined));
    }
    dispatch(actions.deleteCanvasAtIndex(canvasIndex));
  },
  openDeleteCanvasConfirmationDialog: function() {
    if(confirm('Are you sure you want to delete this canvas?')) {
      this.deleteCanvas();
    }
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return (
      <div className="thumbnail-strip-canvas-container">
        <a className="delete-canvas-button btn btn-danger btn-xs btn-transparent" onClick={this.openDeleteCanvasConfirmationDialog} title="Remove Canvas"><i className="fa fa-trash"></i></a>
        <span className="canvas-menu-options dropdown">
          <a className="btn btn-default btn-xs btn-transparent dropdown-toggle" data-toggle="dropdown" title="Show Canvas Options"><i className="fa fa-bars"></i></a>
          <ul className="dropdown-menu">
            <li onClick={this.addCanvasLeft}><i className="context-menu-item fa fa-arrow-left"></i> Add canvas left</li>
            <li onClick={this.addCanvasRight}><i className="context-menu-item fa fa-arrow-right"></i> Add canvas right</li>
            <li onClick={this.duplicateCanvas}><i className="context-menu-item fa fa-files-o"></i> Duplicate canvas</li>
          </ul>
        </span>
        <div className={this.setActiveClass()} onClick={this.setSelectedCanvasId}>
          <img src={this.getMainImage(canvas)} alt={this.getMainImageLabel(canvas)} height="150" />
          <div className="canvas-label">
            <span>{this.getMainImageLabel(canvas)}</span>
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
