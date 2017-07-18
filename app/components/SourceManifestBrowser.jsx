var React = require('react');
var ReactDOM = require('react-dom');
var SourceManifestWindow = require('SourceManifestWindow');
var uuid = require('uuid');

var SourceManifestBrowser = React.createClass({
  getInitialState: function() {
    var sourceManifests = (localStorage && localStorage.getItem('sourceManifests')) ? JSON.parse(localStorage.getItem('sourceManifests')) : [];
    return {
      sourceManifests: sourceManifests,
      uuid: uuid()
    }
  },
  addSourceManifestToState: function(manifestData) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // append the manifest to the list of source manifests
    sourceManifests.push(manifestData);

    // retain the state of the opened source manifests in local storage
    if(localStorage) {
      try {
        localStorage.setItem('sourceManifests', JSON.stringify(sourceManifests));
      } catch(e) {
        this.displayErrorMessage();
        return false;
      }
    }

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests
    }, function() {
      // auto scroll to the end of the Sequence Browser when a new sequence is opened
      var $manifestBrowser = $(ReactDOM.findDOMNode(this.refs.manifestBrowser));
      var scrollPosition = 0;
      $manifestBrowser.children().each(function(index, elem){
        scrollPosition += ($(elem).width());
      });
      $manifestBrowser.animate({ scrollLeft: scrollPosition }, 600);
    });
  },
  removeSourceManifestFromState: function(manifestIndex) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // remove the manifest from the list of source manifests
    sourceManifests.splice(manifestIndex, 1);

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests
    });

    // retain the state of the opened source manifests in local storage
    if(localStorage) {    
      localStorage.setItem('sourceManifests', JSON.stringify(sourceManifests));
      if(localStorage.getItem('sourceManifests') === '[]') {
        localStorage.removeItem('sourceManifests');
      }
    }
  },
  renderOpenSequenceMessage: function() {
    if(this.state.sourceManifests.length === 0) {
      return (
        <div className="alert alert-info no-source-manifests-message">
          <i className="fa fa-info-circle"></i> To import canvases, click on the "Open Sequence" button in the sidebar and open a sequence from a remote manifest.
        </div>
      );
    }
  },
  renderLocalStorageErrorMessage: function() {
    return (
      <div id="local-storage-error-message" className="alert alert-danger" role="alert" ref="localStorageErrorMessage">
        <button type="button" className="close" onClick={this.hideErrorMessage} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        Unable to open an additional manifest because the browser's storage size limitation has been reached. Please try closing one or more manifests before opening a new one.
      </div>
    );
  },
  displayErrorMessage: function() {
    var $localStorageErrorMessage = $(ReactDOM.findDOMNode(this.refs.localStorageErrorMessage));
    $localStorageErrorMessage.fadeIn();
    setTimeout(function() {
      $localStorageErrorMessage.fadeOut();
    }, 10000);
  },
  hideErrorMessage: function() {
    var $localStorageErrorMessage = $(ReactDOM.findDOMNode(this.refs.localStorageErrorMessage));
    $localStorageErrorMessage.fadeOut();
  },
  render: function() {
    var _this = this;
    return (
      <div key={this.state.uuid} className="source-manifest-browser" ref="manifestBrowser">
        { this.renderOpenSequenceMessage() }
        {
          this.state.sourceManifests.map(function(manifestData, manifestIndex) {
            return(
              <SourceManifestWindow key={manifestIndex} manifestIndex={manifestIndex} manifestData={manifestData} onRemoveHandler={_this.removeSourceManifestFromState} />
            );
          })
        }
        { this.renderLocalStorageErrorMessage() }
      </div>
    );
  }
});

module.exports = SourceManifestBrowser;