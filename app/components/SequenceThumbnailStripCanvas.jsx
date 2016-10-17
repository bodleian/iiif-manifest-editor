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
  setSelectedClass: function() {
    return this.props.isSelectedCanvas ? "selected-canvas" : "";
  },
  handleCanvasClick: function(e) {
    if(e.shiftKey) {
      // on shift click, set the end index for the range of selected canvases in the sequence viewer
      this.props.onCanvasShiftClick(this.props.canvasIndex);
    } else {
      // on normal click, set the start index for the range of selected canvases in the sequence viewer
      this.props.onCanvasNormalClick(this.props.canvasIndex);
    }
  },
  render: function() {
    var canvas = this.props.canvas;
    return (
      <div className="thumbnail-strip-canvas-container">
        <div className="sequence-browser-canvas-thumbnail" onClick={this.handleCanvasClick}>
          <img className={this.setSelectedClass()} data-canvas-index={this.props.canvasIndex} src={this.getMainImage(canvas)} alt={this.getMainImageLabel(canvas)} height="150" />
          <div className="canvas-label" title={this.getMainImageLabel(canvas)}>
            <span>{this.stringTruncate(this.getMainImageLabel(canvas), 25)}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = connect()(SequenceThumbnailStripCanvas);
