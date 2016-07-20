var React = require('react');

var FormSelect = React.createClass({
  getInitialState: function() {
    return {
      options: this.props.options,
      selectedOption: this.props.selectedOption,
      placeholder: this.props.placeholder
    }
  },
  render: function() {
    var that = this;
    return (
      <select>
        <option>{this.state.placeholder}</option>
        {
          Object.keys(this.state.options).map(function(key) {
            var currentOption = that.state.options[key];
            return (
              <option key={key} selected={key === that.state.selectedOption}>{currentOption.label}</option>
            );
          })
        }
      </select>
    );
  }
});

module.exports = FormSelect;