var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var Utils = require('Utils');

var BulkActionsPanel = React.createClass({
  renameCanvasLabelsByPagination: function(e) {
    e.preventDefault();
    this.props.dispatch(actions.renameCanvasLabelsByPagination(this.refs.canvasIndexOffsetPagination.value));
  },
  renameCanvasLabelsByFoliation: function(e) {
    e.preventDefault();
    this.props.dispatch(actions.renameCanvasLabelsByFoliation(this.refs.canvasIndexOffsetFoliation.value, this.refs.foliationSide.value));
  },
  reverseSequence: function(e) {
    e.preventDefault();
    this.props.dispatch(actions.reverseSequence());
  },
  render: function() {
    var canvases = this.props.manifestData.sequences[0].canvases;
    return (
      <div id="bulk-actions-panel" className="metadata-sidebar-panel">
        <div className="metadata-sidebar-panel-subtitle">Reverse Sequence</div>
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <div className="col-md-9">
              <button onClick={this.reverseSequence} className="btn btn-default form-control"><i className="fa fa-exchange"></i> Reverse Sequence</button>
            </div>
          </div>
        </form>

        <hr />

        <div className="metadata-sidebar-panel-subtitle">Automatically Rename Canvases by Pagination</div>
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label className="col-md-5 control-label">Start with Canvas:</label>
            <div className="col-md-6">
              <select ref="canvasIndexOffsetPagination" className="form-control">
                {
                  Object.keys(canvases).map(function(canvasIndex) {
                    var canvas = canvases[canvasIndex];
                    return (
                      <option key={canvasIndex} value={canvasIndex}>{Utils.getLocalizedPropertyValue(canvas.label)}</option>
                    );
                  })
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-9">
              <button onClick={this.renameCanvasLabelsByPagination} className="btn btn-default form-control"><i className="fa fa-sort-numeric-asc"></i> Rename Canvases by Pagination</button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-md-12">
            <div className="text-muted"><i className="fa fa-arrow-right"></i> e.g. 1, 2, 3, 4, 5...</div>
          </div>
        </div>

        <hr />

        <div className="metadata-sidebar-panel-subtitle">Automatically Rename Canvases by Foliation</div>
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label className="col-md-5 control-label">Start with Canvas:</label>
            <div className="col-md-6">
              <select ref="canvasIndexOffsetFoliation" className="form-control">
                {
                  Object.keys(canvases).map(function(canvasIndex) {
                    var canvas = canvases[canvasIndex];
                    return (
                      <option key={canvasIndex} value={canvasIndex}>{Utils.getLocalizedPropertyValue(canvas.label)}</option>
                    );
                  })
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-5 control-label">Start With:</label>
            <div className="col-md-6">
              <select ref="foliationSide" className="form-control">
                <option value="recto">Recto</option>
                <option value="verso">Verso</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-9">
              <button onClick={this.renameCanvasLabelsByFoliation} className="btn btn-default form-control"><i className="fa fa-sort-numeric-asc"></i> Rename Canvases by Foliation</button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-md-12">
            <div className="text-muted"><i className="fa fa-arrow-right"></i> e.g. 1r, 1v, 2r, 2v, 3r, 3v...</div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestData: state.manifestReducer.manifestData
    };
  }
)(BulkActionsPanel);