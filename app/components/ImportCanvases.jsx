var React = require('react');
var SequenceBrowser = require('SequenceBrowser');
var SequenceThumbnailStrip = require('SequenceThumbnailStrip');

var ImportCanvases = React.createClass({
  render: function() {
    return (
      <div className="import-canvases-container">
        <SequenceBrowser/>
        <SequenceThumbnailStrip/>
      </div>
    );
  }
});

module.exports = ImportCanvases;