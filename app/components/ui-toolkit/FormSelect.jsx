var React = require('react');

var FormSelect = React.createClass({
  getInitialState: function() {
    return {
      options: this.props.options,
      selectedOption: this.props.selectedOption,
      onChangeHandler: this.props.onChange
    }
  },
  handleChange: function(e) {
    this.setState({
      selectedOption: e.target.value
    });
    this.state.onChangeHandler(this.state.selectedOption, e.target.value);
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
        {
          Object.keys(this.state.options).map(function(key) {
            var currentOption = that.state.options[key];
            return (
              <option key={key} value={key}>{currentOption.displayLabel}</option>
            );
          })
        }
      </select>
    );
  }
});

module.exports = FormSelect;