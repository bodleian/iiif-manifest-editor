var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var NavigationArrow = require('NavigationArrow');
import OpenseadragonViewer from 'react-openseadragon';
import OpenSeadragonControls from 'react-openseadragon';


var openSeadragonConf = {
  zoomInButton:   "zoom-in",
  zoomOutButton:  "zoom-out",
  homeButton:     "home",
  fullPageButton: "full-page",
  sequenceMode:  false,
  showReferenceStrip: false,
  defaultZoomLevel: 0,
  minZoomLevel: 0,
  tileSources:   []
};

var Viewer = React.createClass({
  componentWillMount: function() {
    this.updateTileSources();
  },
  componentWillUpdate: function(prevProps, prevState) {
    // update the image in the viewer
    if(this.props.selectedCanvasId !== prevProps.selectedCanvasId || this.props.manifestoObject !== prevProps.manifestoObject) {
      this.updateTileSources();
    }
  },
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  updateTileSources: function() {
    if(this.props.selectedCanvasId !== undefined) {
      // update main image using the selected canvas
      var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.selectedCanvasId);
      if(canvas !== null) {
        var canvasImages = canvas.getImages();
        if(canvasImages.length > 0) {
          var serviceId = canvasImages[0].getResource().getServices()[0].id;
          openSeadragonConf.tileSources = [serviceId + '/info.json'];
        } 
        else {
          // display placeholder image for empty canvases
          openSeadragonConf.tileSources = {
            type: 'image',
            url: "https://placeholdit.imgix.net/~text?txtsize=16&txt=Empty+Canvas&w=200&h=300"
          };
        }
      }
    }
  },
  setShowMetadataSidebar: function(value) {
    this.props.dispatch(actions.setShowMetadataSidebar(value));
  },
  toggleSidebar: function() {
    this.setShowMetadataSidebar(!this.props.showMetadataSidebar);
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var sequenceLength = sequence.getCanvases().length;
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.selectedCanvasId);
    var canvasIndex = canvas !== null ? sequence.getCanvasIndexById(canvas.id) : 0;
    var canvasLabelPath = "sequences/0/canvases/" + canvasIndex + "/label";
    return (
      <div className="viewer-container">
        <div className="osd-custom-toolbar">
          <div id="zoom-in"><i className="fa fa-search-plus"></i></div>
          <div id="zoom-out"><i className="fa fa-search-minus"></i></div>
          <div id="home"><i className="fa fa-home"></i></div>
          <div id="full-page"><i className="fa fa-arrows-alt"></i></div>
        </div>
        <div className="viewer-loading-indicator collapse">
          <i className="fa fa-circle-o-notch fa-spin"></i>
          <div className="viewer-loading-text">Loading</div>
          
        </div>
        {(() => {
          if(canvasIndex > 0) {
            return (
              <NavigationArrow direction="left" />
            );
          }
        })()}
        <OpenseadragonViewer config={openSeadragonConf} key={this.props.selectedCanvasId} />
        {(() => {
          if(canvasIndex < sequenceLength-1) {
            return (
              <NavigationArrow direction="right" />
            );
          }
        })()}
        {(() => {
          if(this.props.selectedCanvasId !== undefined && sequenceLength > 0) {
            return (
              <EditableTextArea classNames="viewer-canvas-label" labelPrefix="Canvas Label:" fieldValue={canvas !== null ? canvas.getLabel() : 'Empty canvas'} path={canvasLabelPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
            );
          } else if(sequenceLength < 1) {
            return (
              <div className="viewer-canvas-label">Canvas Label: [This sequence does not have any canvases]</div>
            );
          } else {
            return (
              <div className="viewer-canvas-label">Canvas Label: [Nothing to display]</div>
            );
          }
        })()}
        <a onClick={this.toggleSidebar} className="btn btn-default viewer-info-icon-button hidden-xs" title="Show/hide metadata panel"><i className="fa fa-info"></i></a>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      selectedCanvasId: state.manifestReducer.selectedCanvasId,
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar
    };
  }
)(Viewer);
