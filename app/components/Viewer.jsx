var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Viewer = React.createClass({
  getInitialState: function() {
    return {
      viewer: undefined,
      mainImageLayer: undefined
    }
  },
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.selectedCanvasId !== nextProps.selectedCanvasId;
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
  componentDidUpdate: function() {
    // remove the main image layer from the viewer
    this.state.viewer.removeLayer(this.state.mainImageLayer);
    this.updateMainImageLayerInViewer();
  },
  updateMainImageLayerInViewer: function() {
    if(this.props.selectedCanvasId !== undefined) {
      // create a new main image layer using the selected canvas
      var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.selectedCanvasId);
      var serviceId = canvas.getImages()[0].getResource().getServices()[0].id;
      var mainImageLayer = L.tileLayer.iiif(serviceId + '/info.json', {
        maxZoom: 6
      });

      // save the main image layer to the state
      this.setState({ mainImageLayer: mainImageLayer });

      // update the main image layer in the viewer
      mainImageLayer.addTo(this.state.viewer);  
    }
  },
  render: function() {
    return (
      <div className="viewer-container">
        <div id="map" data-canvas-id={this.props.selectedCanvasId}></div>
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
)(Viewer);
