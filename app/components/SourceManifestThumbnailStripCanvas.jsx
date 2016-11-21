var React = require('react');
var {connect} = require('react-redux');

var SourceManifestThumbnailStripCanvas = React.createClass({
  getMainImage: function(canvas) {
    return canvas.getImages().length > 0 ? canvas.getThumbUri('', '120') : 'https://placeholdit.imgix.net/~text?txtsize=20&txt=Empty+Canvas&w=80&h=120';
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
      <div className="source-manifest-thumbnail-strip-canvas" onClick={this.handleCanvasClick}>
        <img className={this.setSelectedClass()} data-canvas-index={this.props.canvasIndex} src={this.getMainImage(canvas)} alt={this.getMainImageLabel(canvas)} height="120" />
        <div className="canvas-label" title={this.getMainImageLabel(canvas)}>
          <span>{this.stringTruncate(this.getMainImageLabel(canvas), 25)}</span>
        </div>
      </div>
    );
  }
});

module.exports = connect()(SourceManifestThumbnailStripCanvas);
