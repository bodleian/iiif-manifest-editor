var React = require('react');
var ReactDOM = require('react-dom');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');
var SaveManifestDialog = require('SaveManifestDialog');
var OpenSourceManifestDialog = require('OpenSourceManifestDialog');
var OnScreenHelp = require('OnScreenHelp');

var MetadataSidebarButtons = React.createClass({
  getInitialState: function() {
    return {
      helpSection: ''
    }
  },
  showHelp: function(helpSection) {
    this.setState({
      helpSection: helpSection
    });
    var $onScreenHelp = $(ReactDOM.findDOMNode(this.refs.onScreenHelp));
    $onScreenHelp.modal({
      backdrop: 'static'
    });
  },
  openSaveManifestDialog: function() {
    var $saveManifestDialog = $(ReactDOM.findDOMNode(this.refs.saveManifestDialog));
    $saveManifestDialog.modal({
      backdrop: 'static'
    });
  },
  showOpenSourceManifestDialog: function() {
    var $openSourceManifestDialog = $(ReactDOM.findDOMNode(this.refs.openSourceManifestDialog));
    $openSourceManifestDialog.modal({
      backdrop: 'static'
    });
    $($openSourceManifestDialog).on('shown.bs.modal', function() {
      $openSourceManifestDialog.find('input').focus();
    })
  },
  hideSidebar: function() {
    this.props.dispatch(actions.setShowMetadataSidebar(false));
  },
  openExitConfirmationDialog: function(targetRoute) {
    if(confirm('This will lose your changes. Are you sure you want to proceed? If you want to save your changes, click "Cancel" and then "Save" to download the current manifest.')) {
      window.location = targetRoute;
    }
  },
  switchToView: function(viewRoute) {
    window.location = viewRoute;
  },
  render: function() {
    return (
      <div className="metadata-sidebar-controls">
        <div className="row">
          <OnScreenHelp ref="onScreenHelp" section={this.state.helpSection} />
          <a onClick={this.hideSidebar} className="hide-sidebar btn btn-default hidden-xs" title="Hide metadata panel"><i className="fa fa-chevron-right"></i></a>
          <span className="metadata-sidebar-buttons">
            <button onClick={this.openSaveManifestDialog} className="btn btn-default metadata-sidebar-button"><i className="fa fa-download hidden-sm hidden-xs"></i> Save Manifest</button>
            {(() => {
              if(window.location.hash.startsWith('#/edit?')) {
                return (
                  <span className="manifest-actions-menu dropdown">
                    <button className="btn btn-default btn-transparent dropdown-toggle" data-toggle="dropdown" title="Show Manifest Actions"><i className="fa fa-caret-down hidden-sm hidden-xs"></i> Manifest Actions</button>
                    <ul className="dropdown-menu pull-left">
                      <li onClick={() => this.openExitConfirmationDialog('#/new')}><i className="fa fa-file hidden-sm hidden-xs"></i> New Manifest</li>
                      <li onClick={() => this.openExitConfirmationDialog('#/open')}><i className="fa fa-folder-open hidden-sm hidden-xs"></i> Open Manifest</li>
                      <li onClick={() => this.switchToView('#/canvases')}><i className="fa fa-picture-o hidden-sm hidden-xs"></i> Import Canvases</li>
                      <li onClick={() => this.openExitConfirmationDialog('#/')}><i className="fa fa-close hidden-sm hidden-xs"></i> Close Manifest</li>
                    </ul>
                  </span>
                );
              } else {
                return (
                  <button onClick={() => this.switchToView('#/edit')} className="btn btn-default metadata-sidebar-button"><i className="fa fa-sign-out fa-flip-horizontal hidden-sm hidden-xs"></i> Return to Edit Manifest</button>
                );
              }
            })()}
            <a className="help-icon pull-right" href="javascript:;" onClick={() => this.showHelp('Sidebar')} ><i className="fa fa-question-circle-o"></i></a>
            <SaveManifestDialog ref="saveManifestDialog" />
          </span>
        </div>
        {(() => {
          if(window.location.hash.startsWith('#/canvases?')) {
            return (
              <div className="row">
                <div className="open-sequence-button">
                  <button onClick={() => this.showOpenSourceManifestDialog()} className="btn btn-primary"><i className="fa fa-plus-circle hidden-sm hidden-xs"></i> Open Sequence</button>
                </div>
                <OpenSourceManifestDialog ref="openSourceManifestDialog" onSuccessHandler={this.props.sourceManifestBrowser ? this.props.sourceManifestBrowser.addSourceManifestToState : undefined}/>
              </div> 
            );
          } 
        })()}
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
