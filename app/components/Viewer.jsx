var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var EditableTextArea = require('EditableTextArea');
var NavigationArrow = require('NavigationArrow');

var Viewer = React.createClass({
  getInitialState: function() {
    return {
      viewer: undefined,
      mainImageLayer: undefined
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.selectedCanvasId !== nextProps.selectedCanvasId
           || this.props.manifestoObject !== nextProps.manifestoObject
           || this.props.showMetadataSidebar !== nextProps.showMetadataSidebar;
  },
  componentDidMount: function() {
    // save a single instance of the viewer to the state
    this.state.viewer = L.map('map', {
                          center: [0, 0],
                          crs: L.CRS.Simple,
                          zoom: 0,
                          touchZoom: false,
                          inertia: false,
                          attributionControl: false
                        });
    this.updateMainImageLayerInViewer();
  },
  componentDidUpdate: function(prevProps, prevState) {
    if(this.props.showMetadataSidebar !== prevProps.showMetadataSidebar) {
      this.state.viewer.invalidateSize();
    }
    // remove the main image layer from the viewer
    if(this.props.selectedCanvasId !== prevProps.selectedCanvasId || this.props.manifestoObject !== prevProps.manifestoObject) {
      if(this.state.mainImageLayer !== undefined) {
        this.state.viewer.removeLayer(this.state.mainImageLayer);
      }
      this.updateMainImageLayerInViewer();
    }
  },
  saveMetadataFieldToStore: function(fieldValue, path) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  updateMainImageLayerInViewer: function() {
    if(this.props.selectedCanvasId !== undefined) {
      // create a new main image layer using the selected canvas
      var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.selectedCanvasId);
      if(canvas !== null) {
        var canvasImages = canvas.getImages();
        if(canvasImages.length > 0) {
          var serviceId = canvasImages[0].getResource().getServices()[0].id;
          var mainImageLayer = L.tileLayer.iiif(serviceId + '/info.json', {
            maxZoom: 6
          });
          var that = this;
          mainImageLayer.on('loading', function (event) {
            $(ReactDOM.findDOMNode(that)).children('.viewer-loading-indicator').show();
          });

          mainImageLayer.on('load', function (event) {
            $(ReactDOM.findDOMNode(that)).children('.viewer-loading-indicator').hide();
          });

          // save the main image layer to the state
          this.setState({ mainImageLayer: mainImageLayer });

          // update the main image layer in the viewer
          mainImageLayer.addTo(this.state.viewer);
        }
      }
    }
  },
  render: function() {
    return (
      <div className="viewer-container">
        <div className="viewer-loading-indicator collapse">
          <i className="fa fa-circle-o-notch fa-spin"></i>
          <div className="viewer-loading-text">Loading</div>
        </div>
        <NavigationArrow direction="left" />
        <div id="map" data-canvas-id={this.props.selectedCanvasId}></div>
        <NavigationArrow direction="right" />
        {(() => {
          if(this.props.selectedCanvasId !== undefined && this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length > 0) {
            var manifest = this.props.manifestoObject;
            var sequence = manifest.getSequenceByIndex(0);
            var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.selectedCanvasId);
            var canvasIndex = canvas !== null ? sequence.getCanvasIndexById(canvas.id) : 0;
            var canvasLabelPath = "sequences/0/canvases/" + canvasIndex + "/label";
            return (
              <EditableTextArea classNames="viewer-canvas-label" fieldValue={canvas !== null ? canvas.getLabel() : 'Empty canvas'} path={canvasLabelPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
            );
          } else if(this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length < 1) {
            return (
              <div className="viewer-canvas-label">[This sequence does not have any canvases]</div>
            );
          } else {
            return (
              <div className="viewer-canvas-label">[Nothing to display]</div>
            );
          }
        })()}
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
