var React = require('react');
var {connect} = require('react-redux');
var manifesto = require('manifesto.js');
var Utils = require('Utils');

var MetadataSidebarCanvas = React.createClass({
  getMainImage: function(canvas) {
    return canvas.getImages().length > 0 
      ? canvas.getCanonicalImageUri(100)
      : 'https://placeholdit.imgix.net/~text?txtsize=20&txt=Empty+Canvas&w=100&h=150';
  },
  render: function() {
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.canvasId);
    return (
      <div style={{background: '#fff url(./img/loading-small.gif) no-repeat center center'}} className="metadata-sidebar-canvas">
        <img src={this.getMainImage(canvas)} alt={Utils.getLocalizedPropertyValue(canvas.getLabel())} height="150" />
        <div className="canvas-label">
          {Utils.getLocalizedPropertyValue(canvas.getLabel())}
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject
    };
  }
)(MetadataSidebarCanvas);
