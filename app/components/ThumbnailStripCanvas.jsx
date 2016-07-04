var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var ThumbnailStripCanvas = React.createClass({
  setSelectedCanvasData: function() {
    var {dispatch, canvasMetadata} = this.props;
    dispatch(actions.setSelectedCanvasData(canvasMetadata));
  },
  setActiveClass: function() {
    var {selectedCanvasData} = this.props;
    console.log(selectedCanvasData);
    if(selectedCanvasData !== undefined && this.props.canvasMetadata['@id'] === selectedCanvasData['@id']) {
      return "thumbnail-strip-canvas active";
    } else {
      return "thumbnail-strip-canvas";
    }
  },
  render: function() {
    return (
      <div className={this.setActiveClass()} onClick={this.setSelectedCanvasData}>
        <img src={this.props.canvasMetadata.images[0].resource['@id']} alt={this.props.canvasMetadata.label} height="150" />
        <div className="thumbnail-strip-canvas-label">
          {this.props.canvasMetadata.label}
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      selectedCanvasData: state.manifestReducer.selectedCanvasData
    };
  }
)(ThumbnailStripCanvas);
