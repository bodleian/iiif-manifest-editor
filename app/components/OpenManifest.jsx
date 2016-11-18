var React = require('react');
var ReactDOM = require('react-dom');
var {Link} = require('react-router');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var manifesto = require('manifesto.js');

var OpenManifest = React.createClass({
  fetchLocalManifestFile: function(localManifestFile) {
    var {dispatch} = this.props;
    var formData = new FormData();
    var that = this;
    formData.append('localManifestFile', localManifestFile);
    dispatch(actions.startManifestFetch('MANIFEST_TYPE_LOCAL'));
    axios.put('manifestUpload', formData)
      .then(function(response) {
        dispatch(actions.setManifestoObject(manifesto.create(JSON.stringify(response.data))));
        dispatch(actions.setManifestData(response.data));
        dispatch(actions.completeManifestFetch());
        // check if valid manifestoObject was created, otherwise display error message
        if(that.props.manifestoObject) {
          window.location = '#/edit';  // redirect to edit manifest on success
        } else {
          dispatch(actions.setError('FETCH_LOCAL_MANIFEST_ERROR', 'Error loading local manifest. Please select a valid manifest file.'));
        }
      })
      .catch(function(error) {
        dispatch(actions.setError('FETCH_LOCAL_MANIFEST_ERROR', 'Error loading local manifest. Please select a valid manifest file.'));
        dispatch(actions.completeManifestFetch());
      });
  },
  fetchRemoteManifest: function(remoteManifestUrl) {
    var {dispatch} = this.props;
    dispatch(actions.startManifestFetch('MANIFEST_TYPE_REMOTE'));
    axios.get(remoteManifestUrl)
      .then(function(response) {
        dispatch(actions.setManifestoObject(manifesto.create(JSON.stringify(response.data))));
        dispatch(actions.setManifestData(response.data));
        dispatch(actions.completeManifestFetch());
        window.location = '#/edit';  // redirect to edit manifest on success
      })
      .catch(function(error) {
        dispatch(actions.setError('FETCH_REMOTE_MANIFEST_ERROR', 'Error loading remote manifest. Please provide a valid manifest URL.'));
        dispatch(actions.completeManifestFetch());
      });
  },
  getUrlParameterByName: function(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  onDragEnter: function(evt) {
    var $dropManifestContainer = $(ReactDOM.findDOMNode(this.refs.dropManifestContainer));
    $dropManifestContainer.addClass('drop-manifest-container-drag');
  },
  onFileDrag: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  },
  onFileDrop: function(evt) {
    var files;
    this.onFileDrag(evt);
    files = evt.target.files || evt.dataTransfer.files;
    if (files.length > 0) { // handle upload of local manifest files
      this.fetchLocalManifestFile(files[0]);
    } else { // handle loading remote manifests that were dropped via IIIF icon
      var url = evt.dataTransfer.getData('text');
      var manifestUrl = this.getUrlParameterByName('manifest', url);
      if(manifestUrl !== null) {
        this.fetchRemoteManifest(manifestUrl);
      }
    }
    var $dropManifestContainer = $(ReactDOM.findDOMNode(this.refs.dropManifestContainer));
    $dropManifestContainer.removeClass('drop-manifest-container-drag');
  },
  onFormSubmit: function(e) {
    e.preventDefault();
    // Note: local manifest files take precedence over remote manifest urls when both are entered and submitted via the form
    if(this.refs.localManifestFile.value.length > 0) {
      // request the contents of the local manifest file from the server
      this.fetchLocalManifestFile(this.refs.localManifestFile.files[0]);
    } else if(this.refs.remoteManifestUrl.value.length > 0) {
      // request the manifest data from the remote url
      this.fetchRemoteManifest(this.refs.remoteManifestUrl.value);
    }
  },
  displayManifestFetchErrors: function() {
    var {error} = this.props;
    if(error !== undefined && (error.type === 'FETCH_REMOTE_MANIFEST_ERROR' || error.type === 'FETCH_LOCAL_MANIFEST_ERROR')) {
      return (
        <div className="alert alert-danger">
          {error.message}
        </div>
      );
    }
  },
  render: function() {
    return(
      <div className="container open-manifest-container">
        <div className="open-manifest-form-container">
          <div className="open-manifest-form-header">
            <span>Open Manifest</span>
            <div className="pull-right link-to-manual">
              <a className="btn btn-default btn-sm" href="https://github.com/bodleian/iiif-manifest-editor/wiki/User-Manual" target="_blank"><i className="fa fa-book"></i> User Manual</a>
            </div>
          </div>

          {this.displayManifestFetchErrors()}

          <div className="drop-manifest-container" ref="dropManifestContainer" onDragEnter={this.onDragEnter} onDragOver={this.onFileDrag} onDragLeave={this.onFileDrag} onDrop={this.onFileDrop}>
            <div className="drag-and-drop-message"><i className="fa fa-arrow-circle-down"></i>{this.props.isFetchingLocalManifest ? ' Uploading...' : ' Drag and drop manifest here'}</div>
            <div className="text-muted"><i className="fa fa-info-circle"></i> Drop a local manifest JSON file or a remote manifest file via IIIF icon</div>
          </div>

          <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
            <div className="row form-group">
              <label htmlFor="localManifestFile" className="col-md-2 control-label">From Computer</label>
              <div className="col-md-9">
                <input type="file" className="form-control" id="localManifestFile" placeholder="Select manifest to open" ref="localManifestFile" />
              </div>
            </div>
            <div className="row form-group">
              <label htmlFor="remoteManifestUrl" className="col-md-2 control-label">From URL</label>
              <div className="col-md-9">
                <input type="url" className="form-control" id="remoteManifestUrl" placeholder="Enter URL for manifest to load" ref="remoteManifestUrl" />
              </div>
            </div>
            <div className="row open-manifest-button-container">
              <div className="col-md-12">
                <Link to="/" className="btn btn-default open-manifest-cancel-button"><i className="fa fa-ban"></i> Cancel</Link>
                <button type="submit" className="btn btn-default"><i className="fa fa-folder-open"></i>{this.props.isFetchingLocalManifest ? ' Uploading...' : (this.props.isFetchingRemoteManifest ? ' Loading...' : ' Open')}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      isFetchingLocalManifest: state.manifestReducer.isFetchingLocalManifest,
      isFetchingRemoteManifest: state.manifestReducer.isFetchingRemoteManifest,
      error: state.manifestReducer.error
    };
  }
)(OpenManifest);
