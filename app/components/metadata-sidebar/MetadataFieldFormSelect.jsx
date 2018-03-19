var React = require('react');

var MetadataFieldFormSelect = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.id,
      options: this.props.options,
      placeholder: this.props.placeholder,
      selectedOption: this.props.selectedOption,
      onChangeHandler: this.props.onChange
    }
  },
  getOptionByName: function(options, name) {
    for(var index = 0; index < options.length; index++) {
      var option = options[index];
      if(option.name === name) {
        return option;
      }
    }
    return undefined;
  },
  handleChange: function(e) {
    var selectedOptionValue = e.target.value;
    this.setState({
      selectedOption: selectedOptionValue
    });

    var selectedOptionObject = this.getOptionByName(this.state.options, selectedOptionValue);
    this.state.onChangeHandler(selectedOptionObject);
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options
    });
  },
  render: function() {
    return (
      <select value={this.state.selectedOption} onChange={this.handleChange}>
        <option value="" disabled>{this.state.placeholder}</option>
        {
          this.state.options.map(function(option, index) {
            return (
              <option key={index} value={option.name}>{option.label}</option>
            );
          })
        }
      </select>
    );
  }
});

module.exports = MetadataFieldFormSelect;