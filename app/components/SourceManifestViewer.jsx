var React = require('react');
var ReactDOM = require('react-dom');
var SourceManifestMetadataDialog = require('SourceManifestMetadataDialog');
import OpenseadragonViewer from 'OpenseadragonViewer'

var SourceManifestViewer = React.createClass({
  getInitialState: function() {
    return {
      openSeadragonConf: {
        id: "osd-viewer-" + this.props.manifestIndex,
        zoomInButton: "zoom-in-" + this.props.manifestIndex,
        zoomOutButton: "zoom-out-" + this.props.manifestIndex,
        homeButton: "home-" + this.props.manifestIndex,
        fullPageButton: "full-page-" + this.props.manifestIndex,
        sequenceMode: false,
        showReferenceStrip: false,
        showNavigator: false,
        defaultZoomLevel: 0,
        minZoomLevel: 0,
        tileSources: []
      }
    }
  },
  componentWillMount: function() {
    this.updateTileSources();
  },
  // componentWillUpdate: function(prevProps, prevState) {
  //   // update the image in the viewer
  //   if(this.props.selectedCanvasId !== prevProps.selectedCanvasId || this.props.manifestoObject !== prevProps.manifestoObject) {
  //     this.updateTileSources();
  //   }
  // },
  updateTileSources: function() {
    this.state.openSeadragonConf.tileSources = ['http://media.nga.gov/iiif/public/objects/1/0/6/3/8/2/106382-primary-0-nativeres.ptif/info.json'];

    // if(this.props.selectedCanvasId !== undefined) {
    //   // update main image using the selected canvas
    //   var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.selectedCanvasId);
    //   if(canvas !== null) {
    //     var canvasImages = canvas.getImages();
    //     if(canvasImages.length > 0) {
    //       var serviceId = canvasImages[0].getResource().getServices()[0].id;
    //       this.state.openSeadragonConf.tileSources = [serviceId + '/info.json'];
    //     } 
    //     else {
    //       // display placeholder image for empty canvases
    //       this.state.openSeadragonConf.tileSources = {
    //         type: 'image',
    //         url: "https://placeholdit.imgix.net/~text?txtsize=16&txt=Empty+Canvas&w=200&h=300"
    //       };
    //     }
    //   }
    // }
  },
  showSourceManifestMetadataDialog: function() {
    var $sourceManifestMetadataDialog = $(ReactDOM.findDOMNode(this.refs.sourceManifestMetadataDialog));
    $sourceManifestMetadataDialog.modal({
      backdrop: 'static'
    });
  },
  render: function() {
    return (
      <div className="source-manifest-viewer">
        <div className="osd-custom-toolbar">
          <span id={'zoom-in-' + this.props.manifestIndex}><i className="fa fa-search-plus"></i></span>
          <span id={'zoom-out-' + this.props.manifestIndex}><i className="fa fa-search-minus"></i></span>
          <span id={'home-' + this.props.manifestIndex}><i className="fa fa-home"></i></span>
          <span id={'full-page-' + this.props.manifestIndex}><i className="fa fa-arrows-alt"></i></span>
        </div>
        <SourceManifestMetadataDialog ref="sourceManifestMetadataDialog" manifestData={JSON.parse(this.props.manifestData)} />
        <OpenseadragonViewer config={this.state.openSeadragonConf} />
        <a onClick={() => this.showSourceManifestMetadataDialog()} className="btn btn-default source-manifest-metadata-info-button" title="Show manifest metadata"><i className="fa fa-info"></i></a>
        <a onClick={() => this.props.onRemoveHandler(this.props.manifestIndex)} className="btn btn-default source-manifest-remove-button" title="Remove sequence"><i className="fa fa-times-circle"></i></a>
      </div>
    );
  }
});

module.exports = SourceManifestViewer;