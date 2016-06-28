var React = require('react');
var MetadataSidebarButtons = require('MetadataSidebarButtons');
var MetadataAccordion = require('MetadataAccordion');

var MetadataSidebar = React.createClass({
  render: function() {
    return (
      <div className="col-md-4 metadata-sidebar-container">
        <div className="container-fluid">
          <MetadataSidebarButtons/>
        </div>
        <MetadataAccordion/>
      </div>
    );
  }
});

module.exports = MetadataSidebar;