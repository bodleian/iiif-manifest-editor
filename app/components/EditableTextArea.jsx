var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');

var EditableTextArea = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      fieldValue: this.props.fieldValue
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      fieldValue: nextProps.fieldValue
    });
  },
  componentDidUpdate: function() {
    if(this.state.editing) {
      var $textareas = $(ReactDOM.findDOMNode(this.refs.textArea));
      var currentTextArea = $textareas[0];
      currentTextArea.style.height = currentTextArea.scrollHeight + 'px';
      currentTextArea.style.overflowY = 'hidden';
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.fieldValue !== nextProps.fieldValue ||
           this.state.fieldValue !== nextState.fieldValue ||
           this.state.editing !== nextState.editing;
  },
  labelClicked: function() {
    this.setState({ editing: true });
  },
  textChanged: function() {
    // dynamically adjust the height of the text area based on content that is entered
    var textArea = this.refs.textArea;
    this.setState({ fieldValue: textArea.value });
    textArea.style.height = textArea.scrollHeight + 'px';
  },
  inputLostFocus: function() {
    this.setState({ editing: false });
    // send the key and value of the text area to the update handler callback method
    this.props.onUpdateHandler(this.state.fieldValue, this.props.path);
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
                    defaultValue={this.state.fieldValue}
                    autoFocus>
         </textarea>
       </div>
      );
    }
    return <div className={this.props.classNames} onClick={this.labelClicked}>{this.state.fieldValue}</div>;
  }
});

module.exports = connect()(EditableTextArea);
