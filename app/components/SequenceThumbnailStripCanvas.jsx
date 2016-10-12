var React = require('react');
var {connect} = require('react-redux');

var SequenceThumbnailStripCanvas = React.createClass({
  getMainImage: function(canvas) {
    return canvas.getImages().length > 0 ? canvas.getThumbUri('', '150') : 'https://placeholdit.imgix.net/~text?txtsize=20&txt=Empty+Canvas&w=100&h=150';
  },
  getMainImageLabel: function(canvas) {
    return canvas !== null ? canvas.getLabel() : 'Empty canvas';
  },
  stringTruncate: function(str, maxLength) {
    return str.length > maxLength ? str.substring(0, maxLength - 1) + '…' : str;
  },
  setCanvasData: function(e) {
    e.dataTransfer.setData("text/plain", JSON.stringify(this.props.canvasRawData));
  },
  render: function() {
    var canvas = this.props.canvas;
    return (
      <div className="thumbnail-strip-canvas-container" onDragStart={this.setCanvasData}>
        <div className="sequence-browser-canvas-thumbnail">
          <img src={this.getMainImage(canvas)} alt={this.getMainImageLabel(canvas)} height="150" />
          <div className="canvas-label" title={this.getMainImageLabel(canvas)}>
            <span>{this.stringTruncate(this.getMainImageLabel(canvas), 25)}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = connect()(SequenceThumbnailStripCanvas);
