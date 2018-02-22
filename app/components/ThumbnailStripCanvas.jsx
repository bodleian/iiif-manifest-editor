var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var manifesto = require('manifesto.js');
var uuid = require('uuid');
var Utils = require('Utils');
import LazyLoad from 'react-lazy-load';

var ThumbnailStripCanvas = React.createClass({
  getInitialState: function() {
    return {
      isOver: false
    };
  },
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
  handleCanvasClick: function(e) {
    if(e.shiftKey) {
      // on shift click, select the range of canvases in the thumbnail strip
      this.props.onCanvasShiftClick(this.props.canvasIndex);
    } else {
      // on normal click, deselect all canvases in the thumbnail strip
      this.props.onCanvasNormalClick();

      // dispatch action to set the active canvas in the store
      var {dispatch, canvasId} = this.props;
      dispatch(actions.setSelectedCanvasId(canvasId));
    }
  },
  setActiveClass: function() {
    if(this.props.selectedCanvasId !== undefined && this.props.canvasId === this.props.selectedCanvasId) {
      return "thumbnail-strip-canvas active";
    } else {
      return "thumbnail-strip-canvas";
    }
  },
  setSelectedClass: function() {
    return this.props.isSelectedCanvas ? "selected-canvas" : "";
  },
  getDefaultThumbnailHeight: function() {
    return 150;
  },
  getThumbnailCanvasWidth: function(canvas) {
    return Math.round((canvas.getWidth() / canvas.getHeight()) * this.getDefaultThumbnailHeight());
  },
  getMainImage: function(canvas) {
    return canvas.getImages().length > 0 
      ? canvas.getCanonicalImageUri(this.getThumbnailCanvasWidth(canvas)) 
      : 'https://placeholdit.imgix.net/~text?txtsize=20&txt=Empty+Canvas&w=100&h=150';
  },
  getMainImageLabel: function(canvas) {
    return canvas !== null ? Utils.getLocalizedPropertyValue(canvas.getLabel()) : 'Empty canvas';
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
  openImportCanvasesView: function() {
    window.location = '#/canvases';
  },
  stringTruncate: function(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength - 1) + '…' : str;
  },
  handleDragOver: function() {
    this.setState({
      isOver: true
    });
  },
  handleDragLeave: function() {
    this.setState({
      isOver: false
    });
  },
  setCanvasContainerClass: function() {
    return this.state.isOver ? "thumbnail-strip-canvas-container selected-drop-target-canvas" : "thumbnail-strip-canvas-container";
  },
  updateCanvasWidth: function() {
    // recalculate the width on each visible canvas based on its image dimensions
    var $visibleCanvasContainer = $(ReactDOM.findDOMNode(this));
    var $thumbnailStripCanvas = $visibleCanvasContainer.find('.thumbnail-strip-canvas');
    var $image = $thumbnailStripCanvas.find('.is-visible img').first();
    var $canvasLabel = $thumbnailStripCanvas.find('.canvas-label span').first();
    $thumbnailStripCanvas.css('width', ($image.width() + 10));
    $canvasLabel.css('width', ($image.width() + 10));
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    var canvasStyle = this.props.isSelectedCanvas ? {} : { background: '#fff url(./img/loading-small.gif) no-repeat center center' };

    canvasStyle.width = this.getThumbnailCanvasWidth(canvas) + 'px';

    return (
      <div className={this.setCanvasContainerClass()} data-canvas-index={this.props.canvasIndex} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave}>
        <a className="delete-canvas-button btn btn-danger btn-xs btn-transparent" onClick={this.openDeleteCanvasConfirmationDialog} title="Remove Canvas"><i className="fa fa-trash"></i></a>
        <span className="canvas-menu-options dropdown">
          <a className="btn btn-default btn-xs btn-transparent dropdown-toggle" data-toggle="dropdown" title="Show Canvas Options"><i className="fa fa-bars"></i></a>
          <ul className="dropdown-menu">
            <li onClick={this.addCanvasLeft}><i className="context-menu-item fa fa-arrow-left"></i> Add canvas left</li>
            <li onClick={this.addCanvasRight}><i className="context-menu-item fa fa-arrow-right"></i> Add canvas right</li>
            <li onClick={this.duplicateCanvas}><i className="context-menu-item fa fa-files-o"></i> Duplicate canvas</li>
            {(() => {
              if(window.location.hash.startsWith('#/edit?')) {
                return (
                  <li onClick={() => this.openImportCanvasesView()}><i className="context-menu-item fa fa-picture-o"></i> Import canvases</li>
                );
              }
            })()}
          </ul>
        </span>
        <div style={canvasStyle} className={this.setActiveClass()} onClick={this.handleCanvasClick}>
          <LazyLoad offsetHorizontal={600} offsetVertical={400}>
            <img onLoad={this.updateCanvasWidth} className={this.setSelectedClass()} src={this.getMainImage(canvas)} data-canvas-index={this.props.canvasIndex} alt={this.getMainImageLabel(canvas)} />
          </LazyLoad>
          <div className="canvas-label" title={this.getMainImageLabel(canvas)}>
            <span>{this.stringTruncate(this.getMainImageLabel(canvas), 20)}</span>
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
