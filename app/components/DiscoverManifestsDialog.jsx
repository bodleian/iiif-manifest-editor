var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var {connect} = require('react-redux');
var actions = require('actions');
var iiifCollections = require('iiif-universe.json');

var DiscoverManifestsDialog = React.createClass({
  getInitialState: function() {
    return {
      selectedContentProvider: false,
      manifestList: undefined
    };
  },
  loadManifestsFromContentProvider: function(collectionListUrl, selectedContentProvider) {
    this.setState({
      selectedContentProvider: selectedContentProvider
    });
    fetch('./data/' + collectionListUrl)
      .then((res) => res.json())
      .then((data) => {
      if(data.manifests !== undefined) {
        this.setState({
          manifestList: data.manifests
        });
      }
    })
  },
  resetSelectedContentProvider: function() {
    this.setState({
      selectedContentProvider: false
    });
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
              {(() => {
                if(!this.state.selectedContentProvider) {
                  return (
                    <div className="content-providers-list">
                    <h4>Select Content Provider</h4>
                      {
                        iiifCollections.collections.map(collection => 
                          <div key={collection.label}>
                            <a onClick={() => this.loadManifestsFromContentProvider(collection.localUrl, collection.label)} style={{cursor: 'pointer'}}>{collection.label}</a>
                          </div>
                        )
                      }
                    </div>
                  );
                } else {
                  return (
                    <div className="manifests-list">
                      <a onClick={() => this.resetSelectedContentProvider()} style={{cursor: 'pointer'}}><i className="fa fa-arrow-left"></i> List of Content Providers</a>
                      <h4>{this.state.selectedContentProvider}</h4>
                      <div>Selected: {this.state.selectedContentProvider}</div>
                    </div>
                  );
                }
              })()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
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
