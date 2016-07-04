var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var ThumbnailStripCanvas = React.createClass({
  setSelectedCanvasData: function() {
    var {dispatch, canvasMetadata} = this.props;
    dispatch(actions.setSelectedCanvasData(canvasMetadata));
  },
  render: function() {
    return (
      <div className="thumbnail-strip-canvas" onClick={this.setSelectedCanvasData}>
        <img src={this.props.canvasMetadata.images[0].resource['@id']} alt={this.props.canvasMetadata.label} height="150" />
        <div className="thumbnail-strip-canvas-label">
          {this.props.canvasMetadata.label}
        </div>
      </div>
    );
  }
});

module.exports = connect()(ThumbnailStripCanvas);
