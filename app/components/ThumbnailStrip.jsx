var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var ThumbnailStrip = React.createClass({
  render: function() {
    return (
      <div className="row thumbnail-strip-container">
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
)(ThumbnailStrip);
