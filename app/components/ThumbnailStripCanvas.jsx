var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var manifesto = require('manifesto.js');

var ThumbnailStripCanvas = React.createClass({
  setSelectedCanvasData: function() {
    var {dispatch, canvas} = this.props;
    dispatch(actions.setSelectedCanvasData(canvas));
  },
  setActiveClass: function() {
    var {selectedCanvasData} = this.props;
    if(selectedCanvasData !== undefined && this.props.canvas.id === selectedCanvasData.id) {
      return "thumbnail-strip-canvas active";
    } else {
      return "thumbnail-strip-canvas";
    }
  },
  getMainImage: function() {
    return this.props.canvas.getThumbUri('100', '150');
  },
  render: function() {
    return (
      <div className={this.setActiveClass()} onClick={this.setSelectedCanvasData}>
        <img src={this.getMainImage()} alt={this.props.canvas.getLabel()} height="150" />
        <div className="thumbnail-strip-canvas-label">
          {this.props.canvas.getLabel()}
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      selectedCanvasData: state.manifestReducer.selectedCanvasData
    };
  }
)(ThumbnailStripCanvas);
