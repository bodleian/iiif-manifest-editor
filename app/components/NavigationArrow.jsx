var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

var NavigationArrow = React.createClass({
  navigate: function(direction) {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvasIndex = sequence.getCanvasIndexById(this.props.selectedCanvasId);
    var {dispatch} = this.props;
    if(direction === 'left') {
      if(canvasIndex > 0) {
        canvasIndex--;
        dispatch(actions.setSelectedCanvasId(sequence.getCanvasByIndex(canvasIndex).id));
      }
    } else {
      if(canvasIndex < (sequence.canvases.length -1)) {
        canvasIndex++;
        dispatch(actions.setSelectedCanvasId(sequence.getCanvasByIndex(canvasIndex).id));
      }
    }
  },
  render: function() {
    return (
      <div className={"navigation-arrow navigation-arrow-" + this.props.direction } onClick={() => { this.navigate(this.props.direction)}}>
        <i className={"fa fa-chevron-" + this.props.direction}></i>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      selectedCanvasId: state.manifestReducer.selectedCanvasId
    };
  }
)(NavigationArrow);
