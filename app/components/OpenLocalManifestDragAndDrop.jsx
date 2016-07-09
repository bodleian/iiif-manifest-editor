var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');

var OpenLocalManifestDragAndDrop = React.createClass({
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
  onFileDrag: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.className += ' drop-manifest-container-drag';
  },
  onFileDrop: function(evt) {
    var files;
    this.onFileDrag(evt);
    files = evt.target.files || evt.dataTransfer.files;
    if (files.length > 0) {
      this.fetchLocalManifestFile(files[0]);
    }
  },
  render: function() {
    var {isFetching} = this.props;
    return (
      <div className="drop-manifest-container" id="localManifestFileDragAndDrop" onDragOver={this.onFileDrag} onDragLeave={this.onFileDrag} onDrop={this.onFileDrop}>
        {isFetching ? 'Uploading...' : 'Drag and drop manifest here'}
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      isFetching: state.manifestReducer.isFetching
    };
  }
)(OpenLocalManifestDragAndDrop);
