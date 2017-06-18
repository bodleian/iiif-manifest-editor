var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');
var iiifCollections = require('iiif-universe.json');

var DiscoverManifestsDialog = React.createClass({
  getInitialState: function() {
    return {
      isValidatingManifest: false,
      validatorResponse: undefined
    };
  },
  loadManifestsFromContentProvider: function(collectionListUrl) {
    console.log("Fetching: ", collectionListUrl);
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Discover Manifests</h4>
            </div>
            <div className="modal-body">
              <h4>Select Content Provider</h4>
              <div className="content-providers-list">
                {
                  iiifCollections.collections.map(collection => 
                    <div key={collection.label}>
                      <a onClick={() => this.loadManifestsFromContentProvider(collection['@id'])} style={{cursor: 'pointer'}}>{collection.label}</a>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="modal-footer">
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
)(DiscoverManifestsDialog);
