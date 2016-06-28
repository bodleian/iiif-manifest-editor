var React = require('react');
var {Link} = require('react-router');

var MetadataSidebarButtons = React.createClass({
  render: function() {
    return (
      <div className="metadata-sidebar-buttons">
        <Link to="/new" className="btn btn-default metadata-sidebar-button">New</Link>
        <Link to="/open" className="btn btn-default metadata-sidebar-button">Open</Link>
        <Link to="/save" className="btn btn-default metadata-sidebar-button">Save</Link>
        <Link to="/" className="btn btn-default metadata-sidebar-button">Close</Link>
      </div>
    );
  }
});

module.exports = MetadataSidebarButtons;