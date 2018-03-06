var React = require('react');
var ManifestMetadataPanelTabs = require('ManifestMetadataPanelTabs');

var ManifestMetadataPanel = React.createClass({
  render: function() {
    return (
      <div className="metadata-sidebar-panel">
        <ManifestMetadataPanelTabs/>
      </div>
    );
  }
});

module.exports = ManifestMetadataPanel;