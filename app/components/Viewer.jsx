var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Viewer = React.createClass({
  render: function() {
    return (
      <div className="row viewer-container">
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
)(Viewer);
