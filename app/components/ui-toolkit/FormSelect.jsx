var React = require('react');

var FormSelect = React.createClass({
  getInitialState: function() {
    return {
      options: this.props.options,
      selectedOption: this.props.selectedOption
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    });
  },
  render: function() {
    var that = this;
    return (
      <select>
        {
          Object.keys(this.state.options).map(function(key) {
            var currentOption = that.state.options[key];
            return (
              <option key={key} selected={key === that.state.selectedOption}>{currentOption.displayLabel}</option>
            );
          })
        }
      </select>
    );
  }
});

module.exports = FormSelect;