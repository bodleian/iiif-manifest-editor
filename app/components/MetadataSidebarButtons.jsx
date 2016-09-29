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
    if(confirm('This will lose your changes. Are you sure you want to proceed? If you want to save your changes, click "Cancel" and then "Save" to download the current manifest.')) {
      window.location = targetRoute;
    }
  },
  openImportCanvasesView: function() {
    window.location = '#/canvases';
  },
  render: function() {
    return (
      <div className="metadata-sidebar-controls row">
        <a onClick={this.hideSidebar} className="hide-sidebar btn btn-default hidden-xs" title="Hide metadata panel"><i className="fa fa-chevron-right"></i></a>
        <span className="metadata-sidebar-buttons">
          <button onClick={this.openSaveManifestDialog} className="btn btn-default metadata-sidebar-button"><i className="fa fa-download hidden-sm hidden-xs"></i> Save Manifest</button>
          <span className="manifest-actions-menu dropdown">
            <button className="btn btn-default btn-transparent dropdown-toggle" data-toggle="dropdown" title="Show Manifest Actions"><i className="fa fa-caret-down hidden-sm hidden-xs"></i> Manifest Actions</button>
            <ul className="dropdown-menu pull-left">
              <li onClick={() => this.openExitConfirmationDialog('#/new')}><i className="fa fa-file hidden-sm hidden-xs"></i> New Manifest</li>
              <li onClick={() => this.openExitConfirmationDialog('#/open')}><i className="fa fa-folder-open hidden-sm hidden-xs"></i> Open Manifest</li>
              <li onClick={() => this.openImportCanvasesView()}><i className="fa fa-picture-o hidden-sm hidden-xs"></i> Import Canvases</li>
              <li onClick={() => this.openExitConfirmationDialog('#/')}><i className="fa fa-close hidden-sm hidden-xs"></i> Close Manifest</li>
            </ul>
          </span>
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
