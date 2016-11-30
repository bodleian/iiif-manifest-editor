var React = require('react');
var manifesto = require('manifesto.js');
var SourceManifestViewer = require('SourceManifestViewer');
var SourceManifestThumbnailStrip = require('SourceManifestThumbnailStrip');

var SourceManifestWindow = React.createClass({
  getInitialState: function() {
    return {
      selectedCanvasIndex: 0
    }
  },
  saveSelectedCanvasIndexToState: function(selectedCanvasIndex) {
    // set the selected canvas index to the state
    this.setState({
      selectedCanvasIndex: selectedCanvasIndex
    });
  },
  render: function() {
    var manifestoObject = manifesto.create(this.props.manifestData);
    var sequence = manifestoObject.getSequenceByIndex(0);
    return (
      <div className="source-manifest-window">
        <SourceManifestViewer key={this.state.selectedCanvasIndex} manifestIndex={this.props.manifestIndex} manifestoObject={manifestoObject} manifestData={this.props.manifestData} sequence={sequence} selectedCanvasIndex={this.state.selectedCanvasIndex} onChangeHandler={this.saveSelectedCanvasIndexToState} onRemoveHandler={this.props.onRemoveHandler} />
        <SourceManifestThumbnailStrip sequence={sequence} onSelectHandler={this.saveSelectedCanvasIndexToState} />
      </div>
    );
  }
});

module.exports = SourceManifestWindow;