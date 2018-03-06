var React = require('react');
var ReactDOM = require('react-dom');
var ManifestMetadataPanel = require('ManifestMetadataPanel');
var SequenceMetadataPanel = require('SequenceMetadataPanel');
var CanvasMetadataPanel = require('CanvasMetadataPanel');
var BulkActionsPanel = require('BulkActionsPanel');
var OnScreenHelp = require('OnScreenHelp');

var MetadataAccordion = React.createClass({
  getInitialState: function() {
    return {
      helpSection: ''
    }
  },
  setMetadataPanelClasses: function(panelName) {
    if((panelName === 'manifestMetadata' && window.location.hash.startsWith('#/edit?')) ||
       (panelName === 'canvasMetadata' && window.location.hash.startsWith('#/canvases?'))) {
      return "panel-collapse collapse in";
    } else {
      return "panel-collapse collapse";
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
  render: function() {
    return (
      <div className="panel-group" id="metadata-accordion">
      <OnScreenHelp ref="onScreenHelp" section={this.state.helpSection} />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-manifest-metadata"><i className="fa fa-book"></i> Manifest Metadata</a>
              <a className="help-icon pull-right" href="javascript:;" onClick={() => this.showHelp('ManifestMetadataPanel')} ><i className="fa fa-question-circle-o"></i></a>
            </h4>
          </div>
          <div id="collapse-manifest-metadata" className={this.setMetadataPanelClasses('manifestMetadata')}>
            <div className="panel-body">
              <ManifestMetadataPanel/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-sequence-metadata"><i className="fa fa-list-ol"></i> Sequence Metadata</a>
              <a className="help-icon pull-right" href="javascript:;" onClick={() => this.showHelp('SequenceMetadataPanel')} ><i className="fa fa-question-circle-o"></i></a>
            </h4>
          </div>
          <div id="collapse-sequence-metadata" className={this.setMetadataPanelClasses('sequenceMetadata')}>
            <div className="panel-body">
              <SequenceMetadataPanel/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-canvas-metadata"><i className="fa fa-file-image-o"></i> Canvas Metadata</a>
              <a className="help-icon pull-right" href="javascript:;" onClick={() => this.showHelp('CanvasMetadataPanel')} ><i className="fa fa-question-circle-o"></i></a>
            </h4>
          </div>
          <div id="collapse-canvas-metadata" className={this.setMetadataPanelClasses('canvasMetadata')}>
            <div className="panel-body">
              <CanvasMetadataPanel/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading" id="bulk-actions-panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-bulk-actions"><i className="fa fa-cogs"></i> Bulk Actions</a>
              <a className="help-icon pull-right" href="javascript:;" onClick={() => this.showHelp('BulkActionsPanel')} ><i className="fa fa-question-circle-o"></i></a>
            </h4>
          </div>
          <div id="collapse-bulk-actions" className={this.setMetadataPanelClasses('bulkActions')}>
            <div className="panel-body">
              <BulkActionsPanel/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MetadataAccordion;