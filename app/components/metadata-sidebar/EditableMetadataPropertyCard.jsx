var React = require('react');
var { connect } = require('react-redux');
var EditableTextArea = require('EditableTextArea');
var DeleteMetadataPropertyButton = require('DeleteMetadataPropertyButton');

var EditableMetadataPropertyCard = React.createClass({
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

  render: function() {
    return (
      <dl>
        <dt className="metadata-field-label">
          {this.props.label}
        </dt>

        <dd className="metadata-field-value">
          <EditableTextArea
            fieldName={this.props.name}
            fieldValue={this.state.value}
            updateHandler={this.props.updateHandler}
          />
        </dd>

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

module.exports = connect()(EditableMetadataPropertyCard);