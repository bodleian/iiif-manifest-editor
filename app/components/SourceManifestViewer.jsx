var React = require('react');
var ReactDOM = require('react-dom');
var SourceManifestMetadataDialog = require('SourceManifestMetadataDialog');
import OpenseadragonViewer from 'react-openseadragon';

var openSeadragonConf = {
  zoomInButton: "zoom-in",
  zoomOutButton: "zoom-out",
  homeButton: "home",
  fullPageButton: "full-page",
  sequenceMode: false,
  showReferenceStrip: false,
  defaultZoomLevel: 0,
  minZoomLevel: 0,
  tileSources: []
};

var SourceManifestViewer = React.createClass({
  // componentWillMount: function() {
  //   this.updateTileSources();
  // },
  // componentWillUpdate: function(prevProps, prevState) {
  //   // update the image in the viewer
  //   if(this.props.selectedCanvasId !== prevProps.selectedCanvasId || this.props.manifestoObject !== prevProps.manifestoObject) {
  //     this.updateTileSources();
  //   }
  // },
  // updateTileSources: function() {
  //   if(this.props.selectedCanvasId !== undefined) {
  //     // update main image using the selected canvas
  //     var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasById(this.props.selectedCanvasId);
  //     if(canvas !== null) {
  //       var canvasImages = canvas.getImages();
  //       if(canvasImages.length > 0) {
  //         var serviceId = canvasImages[0].getResource().getServices()[0].id;
  //         openSeadragonConf.tileSources = [serviceId + '/info.json'];
  //       } 
  //       else {
  //         // display placeholder image for empty canvases
  //         openSeadragonConf.tileSources = {
  //           type: 'image',
  //           url: "https://placeholdit.imgix.net/~text?txtsize=16&txt=Empty+Canvas&w=200&h=300"
  //         };
  //       }
  //     }
  //   }
  // },
  showSourceManifestMetadataDialog: function() {
    var $sourceManifestMetadataDialog = $(ReactDOM.findDOMNode(this.refs.sourceManifestMetadataDialog));
    $sourceManifestMetadataDialog.modal({
      backdrop: 'static'
    });
  },
  render: function() {
    return (
      <div className="source-manifest-viewer">
        <SourceManifestMetadataDialog ref="sourceManifestMetadataDialog" manifestData={JSON.parse(this.props.manifestData)} />
        <a onClick={() => this.showSourceManifestMetadataDialog()} className="btn btn-default source-manifest-info-icon-button" title="Show manifest metadata"><i className="fa fa-info"></i></a>
        <a onClick={() => this.props.onRemoveHandler(this.props.sequenceIndex)} className="btn btn-default remove-sequence-button" title="Remove sequence"><i className="fa fa-times-circle"></i></a>
        <OpenseadragonViewer config={openSeadragonConf} />
      </div>
    );
  }
});

module.exports = SourceManifestViewer;