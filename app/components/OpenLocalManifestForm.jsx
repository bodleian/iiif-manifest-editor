var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var OpenLocalManifestForm = React.createClass({
  fetchLocalManifestFile: function(localManifestFile) {
    var {dispatch} = this.props;
    var formData = new FormData();
    formData.append('localManifestFile', localManifestFile);
    dispatch(actions.startManifestFetch());
    axios.put('/manifestUpload', formData)
      .then(function(response) {
        dispatch(actions.completeManifestFetch(localManifestFile));
        dispatch(actions.setManifestData(response.data));
        window.location = '#/edit';  // redirect to edit manifest on success
      })
      .catch(function(error) {
        dispatch(actions.setErrorMessage('Error loading local manifest. Please select a valid manifest file.'));
      });
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    var localManifestFileName = this.refs.localManifestFile.value;
    if(localManifestFileName.length > 0) {
      // request the contents of the local manifest file from the server
      this.fetchLocalManifestFile(this.refs.localManifestFile.files[0]);
    }
  },
  render: function() {
    var {isFetching} = this.props;
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label htmlFor="localManifestFile" className="col-sm-2 control-label">From Computer</label>
          <div className="col-sm-8">
            <input type="file" className="form-control" id="localManifestFile" placeholder="Select manifest to open" ref="localManifestFile" />
          </div>
          <div className="col-sm-2">
            <button type="submit" className="btn btn-default">{isFetching ? 'Uploading...' : 'Open Manifest'}</button>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      isFetching: state.manifestReducer.isFetching
    };
  }
)(OpenLocalManifestForm);
