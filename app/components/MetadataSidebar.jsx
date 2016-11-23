var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var classNames = require('classnames');
var MetadataSidebarButtons = require('MetadataSidebarButtons');
var MetadataAccordion = require('MetadataAccordion');

var MetadataSidebar = React.createClass({
  setShowMetadataSidebar: function(value) {
    this.props.dispatch(actions.setShowMetadataSidebar(value));
  },
  toggleSidebar: function() {
    this.setShowMetadataSidebar(!this.props.showMetadataSidebar);
  },
  showSidebar: function() {
    this.setShowMetadataSidebar(true);
  },
  render: function() {
    var btnShowSidebarClasses = classNames(
      'btn',
      'btn-default',
      'btn-show-sidebar',
      'hidden-xs',
      {
        'visible': !this.props.showMetadataSidebar
      }
    );
    var metadataSidebarClasses = classNames(
      'metadata-sidebar-container',
      {
        visible: this.props.showMetadataSidebar
      }
    );
    return (
      <div>
        <a onClick={this.showSidebar} className={btnShowSidebarClasses} title="Show metadata panel" ><i className="fa fa-chevron-left"></i></a>
        <div className={metadataSidebarClasses}>
          <div className="container-fluid">
            <MetadataSidebarButtons sourceManifestBrowser={this.props.sourceManifestBrowser}/>
          </div>
          <MetadataAccordion/>
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar
    };
  }
)(MetadataSidebar);
