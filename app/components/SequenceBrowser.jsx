var React = require('react');
var ReactDOM = require('react-dom');
var manifesto = require('manifesto.js');
var OpenSequenceDialog = require('OpenSequenceDialog');
var SequenceViewer = require('SequenceViewer');

var SequenceBrowser = React.createClass({
  getInitialState: function() {
    return {
      sourceManifests: []
    }
  },
  showOpenSequenceDialog: function() {
    var $openSequenceDialog = $(ReactDOM.findDOMNode(this.refs.openSequenceDialog));
    $openSequenceDialog.modal({
      backdrop: 'static'
    });
  },
  addManifestDataToState: function(manifestData) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // append the manifest to the list of source manifests
    sourceManifests.push(manifestData);

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests
    });
  },
  render: function() {
    var that = this;
    return (
      <div className="sequence-browser">
        {
          Object.keys(this.state.sourceManifests).map(function(manifestIndex) {
            var manifestData = that.state.sourceManifests[manifestIndex];
            var manifestoObject = manifesto.create(manifestData);
            var sequence = manifestoObject.getSequenceByIndex(0);
            return(
              <SequenceViewer key={manifestIndex} sequence={sequence} />
            );
          })
        }
        <button type="button" className="btn btn-default open-sequence-button" aria-label="Open sequence" onClick={() => this.showOpenSequenceDialog()}>
          <span className="fa fa-plus-circle fa-2x" aria-hidden="true"></span><br />Open Sequence
        </button>
        <OpenSequenceDialog ref="openSequenceDialog" onSuccessHandler={that.addManifestDataToState}/>
      </div>
    );
  }
});

module.exports = SequenceBrowser;