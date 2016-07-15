var React = require('react');
var classNames = require('classnames');
var MetadataSidebarButtons = require('MetadataSidebarButtons');
var MetadataAccordion = require('MetadataAccordion');

var MetadataSidebar = React.createClass({
  getInitialState: function() {
    return ({
      visible: true
    });
  },
  toggle: function(value) {
    this.setState({
      visible: value
    });
  },
  render: function() {
    var sidebarClasses = classNames(
        'col-md-4',
        'metadata-sidebar-container',
        {
          visible: this.state.visible
        }
      );

    return (
      <div className={sidebarClasses}>
        <div className="container-fluid">
          <MetadataSidebarButtons onToggleStateUpdate={this.props.onToggleStateUpdate} />
        </div>
        <MetadataAccordion/>
      </div>
    );
  }
});

module.exports = MetadataSidebar;
