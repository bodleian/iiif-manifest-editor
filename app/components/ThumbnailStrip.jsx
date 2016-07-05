var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');
var manifesto = require('manifesto.js');

var ThumbnailStrip = React.createClass({
  componentWillMount: function() {
    var {manifestData} = this.props;
    var manifestoObject = manifesto.create(JSON.stringify(manifestData));
    this.setState({
      manifestoObject: manifestoObject
    });
    var sequence = manifestoObject.getSequenceByIndex(0);
    var firstCanvas = sequence.getCanvasByIndex(0);
    // // Set first canvas as selectedCanvasData on initial load to set active class on first canvas in thumbnail strip
    var {dispatch} = this.props;
    dispatch(actions.setSelectedCanvasData(firstCanvas));
  },
  buildThumbnailStripCanvasComponents: function(sequence) {
    var thumbnailStripCanvasComponents = [];
    for(var canvasIndex = 0; canvasIndex < sequence.getCanvases().length; canvasIndex++) {
      var canvas = sequence.getCanvasByIndex(canvasIndex);
      thumbnailStripCanvasComponents.push(<ThumbnailStripCanvas key={canvasIndex} canvas={canvas}/>);
    }
    return thumbnailStripCanvasComponents;
  },
  render: function() {
    var sequence = this.state.manifestoObject.getSequenceByIndex(0);
    return (
      <div className="row thumbnail-strip-container">
        {this.buildThumbnailStripCanvasComponents(sequence)}
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestData: state.manifestReducer.manifestData
    };
  }
)(ThumbnailStrip);
