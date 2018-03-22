var React = require('react');
var { connect } = require('react-redux');
var EditableTextArea = require('EditableTextArea');
var MetadataPropertyObjectValue = require('MetadataPropertyObjectValue');
var DeleteMetadataPropertyButton = require('DeleteMetadataPropertyButton');
var Utils = require('Utils');

var EditableMixedMetadataPropertyCard = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  },

  renderTranslatedLanguage: function(isMultiLingual, propertyValue) {
    return isMultiLingual && propertyValue['@language'] ? ': ' + Utils.getLanguageLabelFromIsoCode(propertyValue['@language']) : '';
  },

  render: function() {
    return (
      <dl>
        <dt className="metadata-field-label">
          {this.props.label}{this.renderTranslatedLanguage(this.props.isMultiLingual, this.state.value)}
        </dt>

        {(() => {
          if(this.state.value instanceof Object) {
            return (
              <MetadataPropertyObjectValue
                fieldName={this.props.name}
                fieldValue={this.state.value}
                updateValueHandler={this.props.updateObjectValueHandler}
              />
            );
          }
          else if(!Array.isArray(this.state.value)) {
            return (
              <dd className="metadata-field-value">
                <EditableTextArea
                  fieldName={this.props.name}
                  fieldValue={this.state.value}
                  updateHandler={this.props.updateValueHandler}
                />
              </dd>
            );
          }
          else {
            // arrays of arrays are not supported
          }
        })()}

        {(() => {
          if(!this.props.isRequired) {
            return (
              <DeleteMetadataPropertyButton
                deleteHandler={this.props.deleteHandler}
              />
            );
          }
        })()}
      </dl>
    );
  }
});

module.exports = connect()(EditableMixedMetadataPropertyCard);