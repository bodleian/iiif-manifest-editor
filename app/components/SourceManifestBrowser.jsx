var React = require('react');
var ReactDOM = require('react-dom');
var SourceManifestWindow = require('SourceManifestWindow');

var SourceManifestBrowser = React.createClass({
  getInitialState: function() {
    return {
      sourceManifests: []
    }
  },
  addSourceManifestToState: function(manifestData) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // append the manifest to the list of source manifests
    sourceManifests.push(manifestData);

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests
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
  },
  render: function() {
    var _this = this;
    return (
      <div className="source-manifest-browser">
        {
          Object.keys(this.state.sourceManifests).map(function(manifestIndex) {
            var manifestData = _this.state.sourceManifests[manifestIndex];
            return(
              <SourceManifestWindow key={manifestIndex} manifestIndex={manifestIndex} manifestData={manifestData} sourceManifests={_this.state.sourceManifests} onRemoveHandler={_this.removeSourceManifestFromState}/>
            );
          })
        }
      </div>
    );
  }
});

module.exports = SourceManifestBrowser;