var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var BulkActionsPanel = React.createClass({
  renameCanvasLabels: function() {
    this.props.dispatch(actions.renameCanvasLabels('pagination', 0));
  },
  render: function() {
    return (
      <div className="metadata-sidebar-panel">
        Automatically Rename Canvas Labels by Pagination:<br />
        <span className="text-muted">e.g. 1, 2, 3, ...</span><br /><br />
        <button onClick={this.renameCanvasLabels} className="btn btn-default"><i className="fa fa-sort-numeric-asc"></i> Rename Canvases</button>
      </div>
    );
  }
});

module.exports = connect()(BulkActionsPanel);