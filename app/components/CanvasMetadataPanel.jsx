var React = require('react');
var CanvasMetadataPanelTabs = require('CanvasMetadataPanelTabs');

var CanvasMetadataPanel = React.createClass({
  render: function() {
    return (
      <div className="metadata-sidebar-panel">
        <CanvasMetadataPanelTabs/>
      </div>
    );
  }
});

module.exports = CanvasMetadataPanel;