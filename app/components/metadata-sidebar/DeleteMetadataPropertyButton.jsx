var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');

var DeleteMetadataPropertyButton = React.createClass({
  render: function() {
    return (
      <dd className="metadata-field-delete">
        <a href="javascript:;" onClick={() => this.props.deleteHandler()}>
          <span className="fa fa-times-circle"></span>
        </a>
      </dd>
    );
  }
});

module.exports = connect()(DeleteMetadataPropertyButton);