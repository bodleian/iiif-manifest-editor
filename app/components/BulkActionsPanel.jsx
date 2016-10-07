var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var BulkActionsPanel = React.createClass({
  renameCanvasLabelsByPagination: function() {
    this.props.dispatch(actions.renameCanvasLabelsByPagination(0));
  },
  renameCanvasLabelsByFoliation: function() {
    this.props.dispatch(actions.renameCanvasLabelsByFoliation(0, 'recto'));
  },
  render: function() {
    return (
      <div className="metadata-sidebar-panel">
        <div className="row">
          <div className="col-md-12">
            <button onClick={this.renameCanvasLabelsByPagination} className="btn btn-default"><i className="fa fa-sort-numeric-asc"></i> Rename Canvases by Pagination</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-muted"><i className="fa fa-arrow-right"></i> e.g. 1, 2, 3, 4, 5...</div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <button onClick={this.renameCanvasLabelsByFoliation} className="btn btn-default"><i className="fa fa-sort-numeric-asc"></i> Rename Canvases by Foliation</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-muted"><i className="fa fa-arrow-right"></i> e.g. 1r, 1v, 2r, 2v, 3r, 3v...</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = connect()(BulkActionsPanel);