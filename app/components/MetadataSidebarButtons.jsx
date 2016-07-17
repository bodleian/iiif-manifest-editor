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
  render: function() {
    return (
      <div className="metadata-sidebar-controls row">
        <a onClick={this.showSidebar} className="hide-sidebar btn btn-default" title="Hide metadata panel"><i className="fa fa-chevron-right"></i></a>

        <span className="metadata-sidebar-buttons">
          <Link to="/new" className="btn btn-default metadata-sidebar-button"><i className="fa fa-file"></i> New</Link>
          <Link to="/open" className="btn btn-default metadata-sidebar-button"><i className="fa fa-folder-open"></i> Open</Link>
          <a onClick={this.openSaveManifestDialog} className="btn btn-default metadata-sidebar-button"><i className="fa fa-download"></i> Save</a>
          <Link to="/" className="btn btn-default metadata-sidebar-button"><i className="fa fa-close"></i> Close</Link>
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
