var React = require('react');
var {connect} = require('react-redux');
var ThumbnailStripCanvas = require('ThumbnailStripCanvas');

var CanvasMetadataPanel = React.createClass({
  render: function() {
    return (
      <div className="metadata-sidebar-panel">
        <ThumbnailStripCanvas canvasMetadata={this.props.selectedCanvasData}/>
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
