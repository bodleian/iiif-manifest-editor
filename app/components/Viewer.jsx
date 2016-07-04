var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var Viewer = React.createClass({
  shouldComponentUpdate(newProps) {
    return newProps.manifestData !== this.props.manifestData;
  },
  render: function() {
    var {manifestData} = this.props;
    return (
      <div className="row viewer-container">
        <div className="col-md-6">
          <p><strong>Label</strong>: {manifestData.label}</p>
          <p><strong>Attribution</strong>: {manifestData.attribution}</p>
          <p><strong>License</strong>: {manifestData.license}</p>
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
)(Viewer);
