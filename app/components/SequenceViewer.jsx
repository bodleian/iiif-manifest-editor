var React = require('react');
var ReactDOM = require('react-dom');
var SequenceThumbnailStripCanvas = require('SequenceThumbnailStripCanvas');
var SourceManifestMetadataDialog = require('SourceManifestMetadataDialog');

var SequenceViewer = React.createClass({
  showSourceManifestMetadataDialog: function() {
    var $sourceManifestMetadataDialog = $(ReactDOM.findDOMNode(this.refs.sourceManifestMetadataDialog));
    $sourceManifestMetadataDialog.modal({
      backdrop: 'static'
    });
  },
  render: function() {
    return (
      <div className="sequence-viewer">
        <SourceManifestMetadataDialog ref="sourceManifestMetadataDialog" manifestData={this.props.manifestData} />
        <a onClick={() => this.showSourceManifestMetadataDialog()} className="btn btn-default sequence-viewer-info-icon-button" title="Show manifest metadata"><i className="fa fa-info"></i></a>
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