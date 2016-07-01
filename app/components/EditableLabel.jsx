var React = require('react');
var {connect} = require('react-redux');

var EditableLabel = React.createClass({
  getInitialState() {
    return {
      editing: false,
      text: this.props.value
    }
  },
  labelClicked() {
    this.setState({ editing: true });
  },
  textChanged() {
    this.setState({ text: this.refs.textInput.value });
  },
  inputLostFocus() {
    this.setState({ editing: false });
  },
  keyPressed(event) {
    if(event.key == 'Enter') {
      this.inputLostFocus();
    }
  },
  render() {
    if(this.state.editing) {
      return <input ref='textInput'
                    type='text'
                    onChange={this.textChanged}
                    onBlur={this.inputLostFocus}
                    onKeyPress={this.keyPressed}
                    value={this.state.text}
                    autoFocus />;
    }
    return <div className={this.props.classNames} onClick={this.labelClicked} >{this.state.text}</div>;
  }
});

module.exports = connect()(EditableLabel);