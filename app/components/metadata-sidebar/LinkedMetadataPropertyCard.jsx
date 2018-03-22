var React = require('react');
var { connect } = require('react-redux');

var LinkedMetadataPropertyCard = React.createClass({
  render: function() {
  	return (
      <dl>
        <dt className="metadata-field-label">
          {this.props.label}
        </dt>

        <dd className="metadata-field-value">
          <a href={this.props.value} target={this.props.target ? this.props.target : "_blank"}>{this.props.value}</a>
        </dd>
      </dl>
	);
  }
});

module.exports = connect()(LinkedMetadataPropertyCard);