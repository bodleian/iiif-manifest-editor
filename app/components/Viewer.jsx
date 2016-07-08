var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Viewer = React.createClass({
  shouldComponentUpdate(newProps) {
    return newProps.manifestData !== this.props.manifestData;
  },
  componentDidMount: function() {
    // initialize the viewer
    var viewer = L.map('map', {
      center: [0, 0],
      crs: L.CRS.Simple,
      zoom: 0,
      touchZoom: false,
      inertia: false
    });

    // add the main image to the viewer
    L.tileLayer.iiif('http://www.e-codices.unifr.ch/loris/kba/kba-MurF0031a/kba-MurF0031a_recto.jp2/info.json', {
      // continuousWorld: true,
      // noWrap: true,
      maxZoom: 3
    }).addTo(viewer);

    // add zoom controls to the viewer
    L.control.zoom().addTo(viewer);
  },
  render: function() {
    return (
      <div className="viewer-container">
        <div id="map"></div>
      </div>
    );
  }
});

module.exports = connect()(Viewer);
