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
      manifestList: undefined,
      subCollectionsList: undefined,
      isLoading: false
    };
  },
  loadManifestsFromContentProvider: function(collectionListUrl, selectedContentProvider) {
    this.setState({
      selectedContentProvider: selectedContentProvider,
      subCollectionsList: undefined,
      isLoading: true
    });
    fetch('./data/' + collectionListUrl)
      .then((res) => res.json())
      .then((data) => {
      if(data.manifests !== undefined) {
        this.setState({
          manifestList: data.manifests,
          isLoading: false
        });
      }
      else if(data.collections !== undefined) {
        this.setState({
          subCollectionsList: data.collections,
          isLoading: false
        });
      }
    })
  },
  loadSubCollectionsManifestsFromContentProvider: function(collectionListUrl, selectedContentProvider) {
    this.setState({
      selectedContentProvider: selectedContentProvider,
      isLoading: true
    });
    let _this = this;
    axios.get(collectionListUrl)
      .then(function(response) {
        if(response.data.manifests !== undefined) {
          _this.setState({
            manifestList: response.data.manifests,
            isLoading: false
          });
        }
        else if(response.data.collections !== undefined) {
          _this.setState({
            subCollectionsList: response.data.collections,
            isLoading: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  resetSelectedContentProvider: function() {
    this.setState({
      selectedContentProvider: false,
      manifestList: undefined,
      subCollectionsList: undefined
    });
  },
  selectManifest: function(selectedManifestUrl) {
    var {dispatch} = this.props;
    this.props.closeModal();
    if(selectedManifestUrl !== null) {
      this.props.selectManifestHandler(selectedManifestUrl);
    }
    else {
      dispatch(actions.setError('FETCH_REMOTE_MANIFEST_ERROR', 'Error loading remote manifest.'));
    }
  },
  displayLoadingIndicator: function() {
    if(this.state.isLoading) {
      return(
        <div className="discover-loading-indicator"><i className="fa fa-circle-o-notch fa-spin"></i> Loading...</div>
      );
    } else {
      return '';
    }
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Discover Manifests</h4>
            </div>
            <div className="modal-body discover-manifests">
              {(() => {
                if(!this.state.selectedContentProvider) {
                  return (
                    <div>
                      <h4>Select Content Provider</h4>
                      <div className="content-providers-list">
                        <div>
                          {
                            iiifCollections.collections.map((collection, index) => 
                              <div className="content-provider-item" key={index}>
                                <a onClick={() => this.loadManifestsFromContentProvider(collection.localUrl, collection.label)} style={{cursor: 'pointer'}}>
                                  <img src={"/img/logos/" + collection.logo} alt="Logo" className="content-provider-logo" />
                                </a>
                                <a onClick={() => this.loadManifestsFromContentProvider(collection.localUrl, collection.label)} style={{cursor: 'pointer'}}>{collection.label}</a>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  );
                } else if(this.state.manifestList !== undefined) {
                  return (
                    <div className="manifests-list">
                      <a onClick={() => this.resetSelectedContentProvider()} style={{cursor: 'pointer'}}><i className="fa fa-arrow-left"></i> List of Content Providers</a>
                      <h4>{this.state.selectedContentProvider}</h4>
                      <ul>
                        {
                          this.state.manifestList.map((manifest, index) => 
                            <li key={index} className="manifest-list-item">
                              <a onClick={() => this.selectManifest(manifest['@id'])} style={{cursor: 'pointer'}}>{manifest.label}</a>
                            </li>
                          )
                        }
                      </ul>
                    </div>
                  );
                }
                else if(this.state.subCollectionsList !== undefined) {
                  return (
                    <div className="subcollections-list">
                      <a onClick={() => this.resetSelectedContentProvider()} style={{cursor: 'pointer'}}><i className="fa fa-arrow-left"></i> List of Content Providers</a>
                      <h4>{this.state.selectedContentProvider}</h4>
                      <ul>
                        {
                          this.state.subCollectionsList.map((collection, index) => 
                            <li key={index}>
                              <a onClick={() => this.loadSubCollectionsManifestsFromContentProvider(collection['@id'], collection.label)} style={{cursor: 'pointer'}}>{collection.label}</a>
                            </li>
                          )
                        }
                      </ul>
                    </div>
                  );
                }
              })()}
              {this.displayLoadingIndicator()}
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
