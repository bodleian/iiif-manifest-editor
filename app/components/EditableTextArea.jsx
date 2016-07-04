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
  componentDidUpdate: function() {
    if(this.state.editing) {
      var $textareas = $(ReactDOM.findDOMNode(this.refs.textArea));
      var currentTextArea = $textareas[0];
      currentTextArea.style.height = currentTextArea.scrollHeight + 'px';
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
    // send the key and value of the text area to the update handler callback method
    this.props.onUpdateHandler(this.props.fieldName, this.refs.textArea.value);
  },
  keyPressed: function(event) {
    if(event.key == 'Enter') {
      this.inputLostFocus();
    }
  },
  render: function() {
    if(this.state.editing) {
      return (
        <div ref="textAreaContainer" className={this.props.classNames}>
          <textarea ref='textArea'
                    onChange={this.textChanged}
                    onBlur={this.inputLostFocus}
                    onKeyPress={this.keyPressed}
                    defaultValue={this.state.text}
                    autoFocus>
         </textarea>
       </div>
      );
    }
    return <div className={this.props.classNames} onClick={this.labelClicked} >{this.state.text}</div>;
  }
});

module.exports = connect()(EditableTextArea);
