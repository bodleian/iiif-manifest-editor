var React = require('react');
var SequenceThumbnailStripCanvas = require('SequenceThumbnailStripCanvas');

var SequenceViewer = React.createClass({
  render: function() {
    return (
      <div className="sequence-viewer">
        <a onClick={this.showManifestMetadataModal} className="btn btn-default sequence-viewer-info-icon-button" title="Show manifest metadata"><i className="fa fa-info"></i></a>
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