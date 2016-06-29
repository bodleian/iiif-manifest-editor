var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var ThumbnailStripCanvas = React.createClass({
  render: function() {
    return (
      <div className="thumbnail-strip-canvas">
        {this.props.canvasMetadata.label}
      </div>
    );
  }
});

module.exports = connect()(ThumbnailStripCanvas);