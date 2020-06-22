var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');

var ValidateManifestDialog = React.createClass({
  getInitialState: function() {
    return {
      isValidatingManifest: false,
      validatorResponse: undefined
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.validateManifest();
  },
  validateManifest: function() {
    this.setState({
      isValidatingManifest: true,
      validatorResponse: undefined
    });
    var that = this;
    // Store generated manifest JSON on JsonStorage.net so we can point the IIIF Validator to it
    axios.post("https://jsonstorage.net/api/items", this.props.manifestData)
      .then(function(jsonStorageResponse) {
        // returned bin ID from JsonStorage.net
        var uriToValidate = jsonStorageResponse.data.uri;
        var baseUriValidator = "https://iiif.io/api/presentation/validator/service/validate?url=";
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
      .catch(function(jsonStorageRequestError) {
        console.log('jsonStorage request error: ', jsonStorageRequestError);
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
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Validate Manifest</h4>
            </div>
            <div className="modal-body">
              <div className="validation-status-message">
                {this.displayValidationMessage()}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.resetValidationStatus} data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
            </div>
          </div>
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
)(ValidateManifestDialog);
