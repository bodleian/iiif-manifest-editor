var React = require('react');

var NavigationArrow = React.createClass({
  navigate: function(direction) {
    if(direction === 'left') {
      if(this.props.canvasIndex > 0) {
        if(this.props.onChangeHandler !== undefined) {
          this.props.onChangeHandler(this.props.canvasIndex - 1, this.props.sequence);
        }
      }
    } else {
      if(this.props.canvasIndex < (this.props.sequence.getCanvases().length - 1)) {
        if(this.props.onChangeHandler !== undefined) {
          this.props.onChangeHandler(this.props.canvasIndex + 1, this.props.sequence);
        }
      }
    }
  },
  render: function() {
    return (
      <div className={"navigation-arrow navigation-arrow-" + this.props.direction} onClick={() => {this.navigate(this.props.direction)}}>
        <i className={"fa fa-chevron-" + this.props.direction}></i>
      </div>
    );
  }
});

module.exports = NavigationArrow;