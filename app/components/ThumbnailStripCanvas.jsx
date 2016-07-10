var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var manifesto = require('manifesto.js');

var ThumbnailStripCanvas = React.createClass({
  componentDidMount: function() {
    // Custom right-click menu
    var $canvas = $(ReactDOM.findDOMNode(this));
    $canvas.bind("contextmenu", function (event) {
      event.preventDefault();
      // Show contextmenu and position it at mouse coordinates
      var $contextMenu = $canvas
        .children('ul.custom-menu:first')
        .toggle()
        .css({
          top: event.pageY + "px",
          left: event.pageX + "px"
        });
    });

    // Hide custom context menu if the thumbnail strip is clicked anywhere
    $('.thumbnail-strip-container').mousedown(function(e) {
      console.log($canvas.parent());
      switch (e.which) {
        case 1, 3:
          if (!$(e.target).children(".custom-menu").length > 0 && !$(e.target).hasClass('custom-menu')) {
            $(".custom-menu").hide(100);
          }
      }
    });
    // If the menu element is clicked
    $(".custom-menu li").click(function(){
      console.log('context menu clicked');
      // Hide it after the action was triggered
      $(".custom-menu").hide(100);
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
  displayCanvasContextMenu: function() {
    console.log('right clicked');
  },
  addCanvasLeft: function() {
    console.log('adding canvas left');
  },
  addCanvasRight: function() {
    console.log('adding canvas right');
  },
  duplicateCanvas: function() {
    console.log('duplicating canvas');
  },
  deleteCanvas: function() {
    console.log('deleting canvas');
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return (
      <div>
        <ul className='custom-menu'>
          <li onClick={this.addCanvasLeft}><i className="context-menu-item fa fa-arrow-left"></i>Add canvas left</li>
          <li onClick={this.addCanvasRight}><i className="context-menu-item fa fa-arrow-right"></i>Add canvas right</li>
          <li onClick={this.duplicateCanvas}><i className="context-menu-item fa fa-files-o"></i>Duplicate canvas</li>
          <li onClick={this.deleteCanvas}><i className="context-menu-item fa fa-trash"></i>Delete canvas</li>
        </ul>
        <div className={this.setActiveClass()} onClick={this.setSelectedCanvasId}>
          <img src={this.getMainImage()} alt={canvas.getLabel()} height="150" />
          <div className="thumbnail-strip-canvas-label">
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
