var React = require('react');

var FormSelect = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.id,
      options: this.props.options,
      placeholder: this.props.placeholder,
      selectedOption: this.props.selectedOption,
      onChangeHandler: this.props.onChange
    }
  },
  handleChange: function(e) {
    this.setState({
      selectedOption: e.target.value
    });
    this.state.onChangeHandler(this.state.id, e.target.value);
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    });
  },
  render: function() {
    var that = this;
    return (
      <select value={this.state.selectedOption} onChange={this.handleChange}>
        <option value="" disabled>{this.state.placeholder}</option>
        {
          Object.keys(this.state.options).map(function(index) {
            var option = that.state.options[index];
            return (
              <option key={option.name} value={option.name}>{option.label}</option>
            );
          })
        }
      </select>
    );
  }
});

module.exports = FormSelect;