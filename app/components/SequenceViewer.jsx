var React = require('react');
var SequenceThumbnailStripCanvas = require('SequenceThumbnailStripCanvas');

var SequenceViewer = React.createClass({
  render: function() {
    return (
      <div className="sequence-viewer">
        {
          this.props.sequence.getCanvases().map(function(canvas, canvasIndex) {
            return (
              <SequenceThumbnailStripCanvas key={canvasIndex} canvas={canvas} />
            );
          })
        }
      </div>
    );
  }
});

module.exports = SequenceViewer;