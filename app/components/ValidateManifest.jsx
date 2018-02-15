var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');

var ValidateManifest = React.createClass({
  getInitialState: function() {
    return {
      isValidatingManifest: false,
      validatorResponse: undefined
    };
  },
  validateManifest: function() {
    this.setState({
      isValidatingManifest: true,
      validatorResponse: undefined
    });
    var that = this;
    // Store generated manifest JSON on myjson.com so we can point the IIIF Validator to it
    axios.post("https://api.myjson.com/bins", this.props.manifestData)
      .then(function(myJsonResponse) {
        // returned bin ID from myjson.com
        var uriToValidate = myJsonResponse.data.uri;
        var baseUriValidator = "http://iiif.io/api/presentation/validator/service/validate?url=";
        var validatorOptions = "&version=2.0&format=json";
        axios.get(baseUriValidator + uriToValidate + validatorOptions)
        .then(function(validatorResponse){
          that.setState({
            isValidatingManifest: false,
            validatorResponse: validatorResponse.data
          });
        })
        .catch(function(validatorRequestError) {
          that.setState({
            isValidatingManifest: false,
            validatorResponse: undefined
          });
        });

      })
      .catch(function(myJsonRequestError) {
        console.log('myJson error: ', myJsonRequestError);
      });
  },
  resetValidationStatus: function() {
    // reset the validation status and validation object when closing the modal window
    this.setState({
      isValidatingManifest: false,
      validatorResponse: undefined
    });
  },
  displayValidationMessage: function() {
    if(this.state.validatorResponse !== undefined) {
      var warnings = this.state.validatorResponse.warnings.length > 0 ? this.state.validatorResponse.warnings : '';
      if(this.state.validatorResponse.okay) {
        return(
          <div className="alert alert-success">
            <div><i className="fa fa-check-circle"></i> This Manifest is valid!</div>
            <div>{warnings}</div>
          </div>
        );
      } else {
        return(
        <div className="alert alert-danger">
          <div><i className="fa fa-times-circle-o"></i> This Manifest is not valid:</div>
          <div>{this.state.validatorResponse.error}</div>
          <div>{warnings}</div>
        </div>
        );
      }
    } else {
      if(this.state.isValidatingManifest) {
        return(
          <div className="validate-manifest-indicator"><i className="fa fa-circle-o-notch fa-spin"></i> Validating Manifest...</div>
        );
      } else {
        return '';
      }
    }
  },
  render: function() {
    return (
      <div>
        <h3>Validate Manifest</h3>
        <button type="button" className="btn btn-default" onClick={this.validateManifest}><i className={this.state.isValidatingManifest ? "fa fa-circle-o-notch fa-spin" : "fa fa-check-circle"}></i> Validate Manifest</button>
        <div className="validation-status-message">
          {this.displayValidationMessage()}
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestData: state.manifestReducer.manifestData
    };
  }
)(ValidateManifest);