var React = require('react');
var ReactDOM = require('react-dom');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');
var SaveManifestDialog = require('SaveManifestDialog');

var MetadataSidebarButtons = React.createClass({
  openSaveManifestDialog: function() {
    var $saveManifestDialog = $(ReactDOM.findDOMNode(this.refs.saveManifestDialog));
    $saveManifestDialog.modal({
      backdrop: 'static'
    });
  },
  hideSidebar: function() {
    this.props.dispatch(actions.setShowMetadataSidebar(false));
  },
  openExitConfirmationDialog: function(targetRoute) {
    if(confirm("Are you sure you want to leave this page? This will lose all your changes.")) {
      window.location = targetRoute;
    }
  },
  render: function() {
    return (
      <div className="metadata-sidebar-controls row">
        <a onClick={this.hideSidebar} className="hide-sidebar btn btn-default hidden-xs" title="Hide metadata panel"><i className="fa fa-chevron-right"></i></a>

        <span className="metadata-sidebar-buttons">
          <button onClick={() => this.openExitConfirmationDialog('/#/new')} className="btn btn-default metadata-sidebar-button"><i className="fa fa-file hidden-sm hidden-xs"></i> New</button>
          <button onClick={() => this.openExitConfirmationDialog('/#/open')} className="btn btn-default metadata-sidebar-button"><i className="fa fa-folder-open hidden-sm hidden-xs"></i> Open</button>
          <button onClick={this.openSaveManifestDialog} className="btn btn-default metadata-sidebar-button"><i className="fa fa-download hidden-sm hidden-xs"></i> Save</button>
          <button onClick={() => this.openExitConfirmationDialog('/')} className="btn btn-default metadata-sidebar-button"><i className="fa fa-close hidden-sm hidden-xs"></i> Close</button>
          <SaveManifestDialog ref="saveManifestDialog" />
        </span>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestData: state.manifestReducer.manifestData,
      manifestFilenameToSave: state.manifestReducer.manifestFilenameToSave,
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar
    };
  }
)(MetadataSidebarButtons);
