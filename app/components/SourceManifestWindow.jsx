var React = require('react');
var SourceManifestViewer = require('SourceManifestViewer');
var SourceManifestThumbnailStrip = require('SourceManifestThumbnailStrip');

var SourceManifestWindow = React.createClass({
  render: function() {
    return (
      <div className="source-manifest-window">
        <SourceManifestViewer manifestData={this.props.manifestData} sequence={this.props.sequence} sequenceIndex={this.props.sequenceIndex} />
        <SourceManifestThumbnailStrip sequence={this.props.sequence} />
      </div>
    );
  }
});

module.exports = SourceManifestWindow;