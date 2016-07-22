var React = require('react');
var {connect} = require('react-redux');
var classNames = require('classnames');
var MetadataSidebarButtons = require('MetadataSidebarButtons');
var MetadataAccordion = require('MetadataAccordion');

var MetadataSidebar = React.createClass({
  render: function() {
    var sidebarClasses = classNames(
        'col-md-4',
        'metadata-sidebar-container',
        {
          visible: this.props.showMetadataSidebar
        }
      );

    return (
      <div className={sidebarClasses}>
        <div className="container-fluid">
          <MetadataSidebarButtons />
        </div>
        <MetadataAccordion/>
      </div>
    );
  }
});

module.exports = MetadataSidebar;

module.exports = connect(
  (state) => {
    return {
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar
    };
  }
)(MetadataSidebar);
