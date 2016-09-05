var React = require('react');
var ManifestMetadataPanel = require('ManifestMetadataPanel');
var SequenceMetadataPanel = require('SequenceMetadataPanel');
var CanvasMetadataPanel = require('CanvasMetadataPanel');
var BulkActionsPanel = require('BulkActionsPanel');

var MetadataAccordion = React.createClass({
  render: function() {
    return (
      <div className="panel-group" id="metadata-accordion">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-manifest-metadata"><i className="fa fa-book"></i> Manifest metadata</a>
            </h4>
          </div>
          <div id="collapse-manifest-metadata" className="panel-collapse collapse in">
            <div className="panel-body">
              <ManifestMetadataPanel/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-sequence-metadata"><i className="fa fa-list-ol"></i> Sequence metadata</a>
            </h4>
          </div>
          <div id="collapse-sequence-metadata" className="panel-collapse collapse">
            <div className="panel-body">
              <SequenceMetadataPanel/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-canvas-metadata"><i className="fa fa-file-image-o"></i> Canvas metadata</a>
            </h4>
          </div>
          <div id="collapse-canvas-metadata" className="panel-collapse collapse">
            <div className="panel-body">
              <CanvasMetadataPanel/>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#metadata-accordion" href="#collapse-bulk-actions"><i className="fa fa-cogs"></i> Bulk Actions</a>
            </h4>
          </div>
          <div id="collapse-bulk-actions" className="panel-collapse collapse">
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