var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var DiscoverManifestsDialog = require('DiscoverManifestsDialog');

var OpenSourceManifestDialog = React.createClass({
  getInitialState: function() {
    return {
      isFetchingRemoteManifest: false,
      manifestFetchError: undefined
    };
  },
  fetchRemoteManifest: function(remoteManifestUrl) {
    this.setState({
      isFetchingRemoteManifest: true,
      manifestFetchError: undefined
    });
    if(remoteManifestUrl === '') {
      this.setState({
        manifestFetchError: 'Please enter a remote manifest URL',
        isFetchingRemoteManifest: false
      });
      this.refs.remoteManifestUrl.focus();
      return false;
    }
    var _this = this;
    axios.get(remoteManifestUrl)
      .then(function(response) {
        // reset the error message and the isFetchingRemoteManifestStatus in the state
        _this.setState({
          manifestFetchError: undefined,
          isFetchingRemoteManifest: false
        });

        // add the requested manifest data to the list of source manifests in the state
        _this.props.onSuccessHandler(JSON.stringify(response.data));

        // clear the remote manifest url text field
        _this.refs.remoteManifestUrl.value = '';
        
        // close modal window
        var $openSourceManifestDialog = $(ReactDOM.findDOMNode(_this));
        $openSourceManifestDialog.modal('hide');
      })
      .catch(function(error) {
        // set the error message in the state and reset isFetchingRemoteManifestStatus
        console.log(error);
        _this.setState({
          manifestFetchError: 'Invalid remote manifest URL',
          isFetchingRemoteManifest: false
        });
      });
  },
  displayErrorMessage: function() {
    if(this.state.manifestFetchError !== undefined) {
      return(
        <div className="alert alert-danger remote-manifest-url-load-error">
          <div>{this.state.manifestFetchError}</div>
        </div>
      );
    } else {
      return '';
    }
  },
  displayFetchRemoteManifestStatus: function() {
    if(this.state.isFetchingRemoteManifest) {
      return(
        <div className="fetch-remote-manifest-indicator"><i className="fa fa-circle-o-notch fa-spin"></i> Loading Manifest...</div>
      );
    } else {
      return '';
    }
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
    this.onFileDrag(evt);
    // handle loading remote manifests that were dropped via IIIF icon
    var url = evt.dataTransfer.getData('text');
    var manifestUrl = this.getUrlParameterByName('manifest', url);
    if(manifestUrl !== null) {
      this.fetchRemoteManifest(manifestUrl);
    }
    var $dropManifestContainer = $(ReactDOM.findDOMNode(this.refs.dropManifestContainer));
    $dropManifestContainer.removeClass('drop-manifest-container-drag');
  },
  openDiscoverManifestsDialog: function() {
    var $discoverManifestsDialog = $(ReactDOM.findDOMNode(this.refs.discoverManifestsDialog));
    $discoverManifestsDialog.modal({
      backdrop: 'static'
    });
  },
  closeDiscoverManifestsDialog: function() {
    var $discoverManifestsDialog = $(ReactDOM.findDOMNode(this.refs.discoverManifestsDialog));
    $discoverManifestsDialog.modal('hide');
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Open Sequence</h4>
            </div>
            <div className="modal-body">
              <div className="drop-manifest-container" ref="dropManifestContainer" onDragEnter={this.onDragEnter} onDragOver={this.onFileDrag} onDragLeave={this.onFileDrag} onDrop={this.onFileDrop}>
                <div className="drag-and-drop-message"><i className="fa fa-arrow-circle-down"></i>{this.props.isFetchingLocalManifest ? ' Uploading...' : ' Drag and drop manifest here'}</div>
                <div className="text-muted"><i className="fa fa-info-circle"></i> Drop a remote manifest file via IIIF icon</div>
              </div>
              <div className="row discover-manifests">
                <div className="col-md-12">
                  <button type="submit" onClick={this.openDiscoverManifestsDialog} className="btn btn-default discover-manifests-dialog-open-button"><i className="fa fa-search"></i> Discover Manifests</button>
                </div>
              </div>
              <DiscoverManifestsDialog ref="discoverManifestsDialog" selectManifestHandler={this.fetchRemoteManifest} closeModal={this.closeDiscoverManifestsDialog} />
              <input type="text" ref="remoteManifestUrl" className="form-control" placeholder="Enter a remote manifest URL" />
              <div className="fetch-remote-manifest-status">
                {this.displayFetchRemoteManifestStatus()}
              </div>
              {this.displayErrorMessage()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => this.fetchRemoteManifest(this.refs.remoteManifestUrl.value)}><i className="fa fa-folder-open"></i> Open</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OpenSourceManifestDialog;