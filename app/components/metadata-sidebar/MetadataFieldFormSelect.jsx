var React = require('react');

var MetadataFieldFormSelect = React.createClass({
  getInitialState: function() {
    return {
      options: this.props.options,
      selectedOption: this.props.selectedOption
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
    this.setState({ selectedOption: selectedOptionValue });

    var selectedOptionObject = this.getOptionByName(this.state.options, selectedOptionValue);
    this.props.onChange(selectedOptionObject);
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      options: nextProps.options,
      selectedOption: ""
    });
  },
  render: function() {
    return (
      <select value={this.state.selectedOption} onChange={this.handleChange}>
        <option value="" disabled>{this.props.placeholder}</option>
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