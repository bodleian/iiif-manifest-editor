var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');

var SaveManifestDialog = React.createClass({
  getInitialState: function() {
    return {
      isValidatingManifest: false,
      validatorResponse: undefined
    };
  },
  downloadManifestData: function(manifestFilenameToSave) {
    var {manifestData} = this.props;
    var manifestDataJson = JSON.stringify(manifestData, null, '\t');
    var a = document.createElement('a');
    var blob = new Blob([manifestDataJson], {type: 'application/json'});
    a.href = window.URL.createObjectURL(blob);
    a.download = manifestFilenameToSave;
    document.body.appendChild(a);
    a.click();
  },
  setManifestFilename: function() {
    var manifestFilenameToSave = this.refs.manifestFilename.value;
    this.props.dispatch(actions.setManifestFilename(manifestFilenameToSave));
    this.downloadManifestData(manifestFilenameToSave);
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
        //dispatch(actions.setError('FETCH_REMOTE_MANIFEST_ERROR', 'Error loading remote manifest. Please provide a valid manifest URL.'));
        //dispatch(actions.completeManifestFetch());
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
              <h4 className="modal-title">Save Manifest</h4>
            </div>
            <div className="modal-body">
              <input type='text' ref='manifestFilename' className="form-control" placeholder="Enter a filename for the manifest" defaultValue="manifest.json" />
              <div className="validation-status-message">
                {this.displayValidationMessage()}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.validateManifest}><i className={this.state.isValidatingManifest ? "fa fa-circle-o-notch fa-spin" : "fa fa-check-circle"}></i> Validate Manifest</button>
              <button type="button" className="btn btn-default" onClick={this.resetValidationStatus} data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.setManifestFilename}><i className="fa fa-download"></i> Save</button>
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
)(SaveManifestDialog);
