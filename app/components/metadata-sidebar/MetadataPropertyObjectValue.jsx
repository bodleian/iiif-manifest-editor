var React = require('react');
var EditableTextArea = require('EditableTextArea');

var MetadataPropertyObjectValue = React.createClass({
  getInitialState: function() {
    return {
      fieldValue: this.props.fieldValue,
      updateHandler: this.props.updateHandler
    }
  },
  render: function() {
    var _this = this;
    return (
      <div>
        {
          Object.keys(this.state.fieldValue).map(function(propertyName, propertyIndex) {
            var propertyValue = _this.state.fieldValue[propertyIndex];
            return (
              <dd key={propertyIndex} className="metadata-field-value">
                <EditableTextArea fieldName={propertyName} fieldValue={propertyValue} labelPrefix={propertyName + ': '} updateHandler={_this.state.updateHandler} />
              </dd>
            );
          })
        }
      </div>
    );
  }
});

module.exports = MetadataPropertyObjectValue;