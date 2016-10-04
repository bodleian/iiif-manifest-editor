var React = require('react');
var axios = require('axios');
var manifesto = require('manifesto.js');
var OpenSequenceDialog = require('OpenSequenceDialog');

var SequenceBrowser = React.createClass({
  getInitialState: function() {
    return {
      activeManifests: []
    }
  },
  showOpenSequenceDialog: function() {
    var $openSequenceDialog = $(ReactDOM.findDOMNode(this.refs.openSequenceDialog));
    $openSequenceDialog.modal({
      backdrop: 'static'
    });
  },
  fetchRemoteManifest: function(remoteManifestUrl) {
    var that = this;
    axios.get(remoteManifestUrl)
      .then(function(response) {
        // add the requested manifest data to the list of active manifests in the state
        that.addManifestDataToState(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log('Unable to retrieve remote manifest', remoteManifestUrl);
      });
  },
  addManifestDataToState: function(manifestData) {
    // create a copy of the active manifests
    var activeManifests = [...this.state.activeManifests];

    // append the manifest to the list of active manifests
    activeManifests.push(manifestData);

    // update the list of active manifests in the state
    this.setState({
      activeManifests: activeManifests
    });
  },
  render: function() {
    var that = this;
    return (
      <div className="sequence-browser">
        {
          Object.keys(this.state.activeManifests).map(function(manifestIndex) {
            var manifestData = that.state.activeManifests[manifestIndex];
            var manifestoObject = manifesto.create(manifestData);
            var sequence = manifestoObject.getSequenceByIndex(0);
            return (
              <div key={manifestIndex} className="sequence-viewer">
                {
                  sequence.getCanvases().map(function(canvas) {
                    return (
                      <div key={canvas.__jsonld['@id']}>{canvas.__jsonld.label}</div>
                    );
                  })
                }
              </div>
            );
          })
        }
        <button type="button" className="btn btn-default open-sequence-button" aria-label="Open sequence" onClick={() => this.fetchRemoteManifest("http://iiif.bodleian.ox.ac.uk/iiif/manifest/51a65464-6408-4a78-9fd1-93e1fa995b9c.json")}>
          <span className="fa fa-plus-circle fa-2x" aria-hidden="true"></span><br />Open Sequence
        </button>
        <OpenSequenceDialog ref="openSequenceDialog" />
      </div>
    );
  }
});

module.exports = SequenceBrowser;