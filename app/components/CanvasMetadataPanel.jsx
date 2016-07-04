var React = require('react');
var {connect} = require('react-redux');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');

var CanvasMetadataPanel = React.createClass({
  extractCanvasMetadata: function() {
    if(this.props.selectedCanvasData !== undefined) {
      return this.props.selectedCanvasData;
    } else {
      return this.props.manifestData.sequences[0].canvases[0];
    }
  },
  render: function() {
    return (
      <div className="metadata-sidebar-panel">
        <ThumbnailStripCanvas canvasMetadata={this.extractCanvasMetadata()}/>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestData: state.manifestReducer.manifestData,
      selectedCanvasData: state.manifestReducer.selectedCanvasData
    };
  }
)(CanvasMetadataPanel);
