var React = require('react');
var { connect } = require('react-redux');
var MetadataFieldFormSelect = require('MetadataFieldFormSelect');
var DeleteMetadataPropertyButton = require('DeleteMetadataPropertyButton');

var EmptyMetadataPropertyCard = React.createClass({
  render: function() {
  	return (
      <dl>
        <dt className="metadata-field-label">
          <MetadataFieldFormSelect
            options={this.props.labelOptions}
            placeholder="Choose field"
            selectedOption=""
            onChange={this.props.selectLabelHandler}
          />
        </dt>

        <dd className="metadata-field-value">
        </dd>

        <DeleteMetadataPropertyButton
          deleteHandler={this.props.deleteHandler}
        />
      </dl>
	);
  }
});

module.exports = connect()(EmptyMetadataPropertyCard);


