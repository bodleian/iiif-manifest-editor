var React = require('react');
var manifesto = require('manifesto.js');
var SourceManifestViewer = require('SourceManifestViewer');
var SourceManifestThumbnailStrip = require('SourceManifestThumbnailStrip');

var SourceManifestWindow = React.createClass({
  render: function() {
    var manifestoObject = manifesto.create(this.props.manifestData);
    var sequence = manifestoObject.getSequenceByIndex(0);
    return (
      <div className="source-manifest-window">
        <SourceManifestViewer manifestIndex={this.props.manifestIndex} manifestData={this.props.manifestData} onRemoveHandler={this.props.onRemoveHandler} />
        <SourceManifestThumbnailStrip sequence={sequence} />
      </div>
    );
  }
});

module.exports = SourceManifestWindow;