var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var manifesto = require('manifesto.js');

var OpenLocalManifestDragAndDrop = React.createClass({
  fetchLocalManifestFile: function(localManifestFile) {
    var {dispatch} = this.props;
    var formData = new FormData();
    formData.append('localManifestFile', localManifestFile);
    dispatch(actions.startManifestFetch('MANIFEST_TYPE_LOCAL'));
    axios.put('/manifestUpload', formData)
      .then(function(response) {
        dispatch(actions.setManifestoObject(manifesto.create(JSON.stringify(response.data))));
        dispatch(actions.setManifestData(response.data));
        dispatch(actions.completeManifestFetch());
        window.location = '#/edit';  // redirect to edit manifest on success
      })
      .catch(function(error) {
        dispatch(actions.setError('FETCH_LOCAL_MANIFEST_ERROR', 'Error loading local manifest. Please select a valid manifest file.'));
        dispatch(actions.completeManifestFetch());
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
    var {isFetchingLocalManifest} = this.props;
    return (
      <div className="drop-manifest-container" id="localManifestFileDragAndDrop" onDragOver={this.onFileDrag} onDragLeave={this.onFileDrag} onDrop={this.onFileDrop}>
        {isFetchingLocalManifest ? 'Uploading...' : 'Drag and drop manifest here'}
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      isFetchingLocalManifest: state.manifestReducer.isFetchingLocalManifest
    };
  }
)(OpenLocalManifestDragAndDrop);
