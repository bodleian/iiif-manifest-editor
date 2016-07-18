var React = require('react');
var ReactDOM = require('react-dom');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var SaveManifestDialog = require('SaveManifestDialog');

var MetadataSidebarButtons = React.createClass({
  openSaveManifestDialog: function() {
    var $saveManifestDialog = $(ReactDOM.findDOMNode(this.refs.saveManifestDialog));
    $saveManifestDialog.modal({
      backdrop: 'static'
    });
  },
  showSidebar: function() {
    this.props.onToggleStateUpdate(false);
  },
  openExitConfirmationDialog: function(targetRoute) {
    if(confirm("Are you sure you want to leave this page? This will lose all your changes.")) {
      window.location = targetRoute;
    }
  },
  render: function() {
    return (
      <div className="metadata-sidebar-controls row">
        <a onClick={this.showSidebar} className="hide-sidebar btn btn-default" title="Hide metadata panel"><i className="fa fa-chevron-right"></i></a>

        <span className="metadata-sidebar-buttons">
          <button onClick={() => this.openExitConfirmationDialog('/#/new')} className="btn btn-default metadata-sidebar-button"><i className="fa fa-file"></i> New</button>
          <button onClick={() => this.openExitConfirmationDialog('/#/open')} className="btn btn-default metadata-sidebar-button"><i className="fa fa-folder-open"></i> Open</button>
          <button onClick={this.openSaveManifestDialog} className="btn btn-default metadata-sidebar-button"><i className="fa fa-download"></i> Save</button>
          <button onClick={() => this.openExitConfirmationDialog('/')} className="btn btn-default metadata-sidebar-button"><i className="fa fa-close"></i> Close</button>
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
      manifestFilenameToSave: state.manifestReducer.manifestFilenameToSave
    };
  }
)(MetadataSidebarButtons);
