var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');

var EditableTextArea = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      text: this.props.value
    }
  },
  componentDidMount: function() {
    var $this = $(ReactDOM.findDOMNode(this));
    this.setState({ initialWidth: $this[0].scrollWidth });
  },
  componentDidUpdate: function() {
    if(this.state.editing) {
      var $this = $(ReactDOM.findDOMNode(this));
      var currentTextArea = $this[0];
      currentTextArea.style.width = (this.state.initialWidth - 30) + 'px';
      currentTextArea.style.height = currentTextArea.scrollHeight + 'px';
      currentTextArea.style.marginLeft = '15px';
      currentTextArea.style.overflowY = 'hidden';
    }
  },
  labelClicked: function() {
    this.setState({ editing: true });
  },
  textChanged: function() {
    // dynamically adjust the height of the text area based on content that is entered
    var textArea = this.refs.textArea;
    this.setState({ text: textArea.value });
    textArea.style.height = textArea.scrollHeight + 'px';
  },
  inputLostFocus: function() {
    this.setState({ editing: false });
  },
  keyPressed: function(event) {
    if(event.key == 'Enter') {
      this.inputLostFocus();
    }
  },
  render: function() {
    if(this.state.editing) {
      return <textarea ref='textArea'
                       onChange={this.textChanged}
                       onBlur={this.inputLostFocus}
                       onKeyPress={this.keyPressed}
                       defaultValue={this.state.text}
                       autoFocus>
             </textarea>;
    }
    return <div className={this.props.classNames} onClick={this.labelClicked} >{this.state.text}</div>;
  }
});

module.exports = connect()(EditableTextArea);