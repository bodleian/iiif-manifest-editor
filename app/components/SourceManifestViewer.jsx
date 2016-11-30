var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var SourceManifestMetadataDialog = require('SourceManifestMetadataDialog');
var NavigationArrow = require('NavigationArrow');
import OpenseadragonViewer from 'OpenseadragonViewer';
var OnScreenHelp = require('OnScreenHelp');

var SourceManifestViewer = React.createClass({
  getInitialState: function() {
    var sidebarToggleIcon = this.props.showMetadataSidebar ? 'on' : 'off';
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
      },
      helpSection: '',
      sidebarToggleIcon: sidebarToggleIcon
    }
  },
  showHelp: function(helpSection) {
    this.setState({
      helpSection: helpSection
    });
    var $onScreenHelp = $(ReactDOM.findDOMNode(this.refs.onScreenHelp));
    $onScreenHelp.modal({
      backdrop: 'static'
    });
  },
  componentWillMount: function() {
    this.updateTileSources();
  },
  componentWillUpdate: function(prevProps, prevState) {
    // update the main image in the viewer
    if(this.props.selectedCanvasIndex !== prevProps.selectedCanvasIndex || this.props.manifestoObject !== prevProps.manifestoObject) {
      this.updateTileSources();
    }
    if(this.props.showMetadataSidebar !== prevProps.showMetadataSidebar) {
      this.props.showMetadataSidebar ? this.setState({sidebarToggleIcon: 'off'}) : this.setState({sidebarToggleIcon: 'on'});
    }
  },
  setShowMetadataSidebar: function(value) {
    this.props.dispatch(actions.setShowMetadataSidebar(value));
  },
  toggleSidebar: function() {
    this.props.showMetadataSidebar ? this.setState({sidebarToggleIcon: 'off'}) : this.setState({sidebarToggleIcon: 'on'});
    this.setShowMetadataSidebar(!this.props.showMetadataSidebar);
  },
  updateTileSources: function() {
    if(this.props.selectedCanvasIndex !== undefined) {
      // update the main image in the viewer using the selected canvas
      var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasByIndex(this.props.selectedCanvasIndex);
      var canvasImages = canvas.getImages();
      if(canvasImages.length > 0) {
        var serviceId = canvasImages[0].getResource().getServices()[0].id;
        this.state.openSeadragonConf.tileSources = [serviceId + '/info.json'];
      } 
    }
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
        <OnScreenHelp ref="onScreenHelp" section={this.state.helpSection} />
        <div className="osd-custom-toolbar">
          <a onClick={() => this.props.onRemoveHandler(this.props.manifestIndex)} className="source-manifest-remove-button" title="Remove sequence"><i className="fa fa-times-circle"></i></a>
          <span id={'zoom-in-' + this.props.manifestIndex}><i className="fa fa-search-plus"></i></span>
          <span id={'zoom-out-' + this.props.manifestIndex}><i className="fa fa-search-minus"></i></span>
          <span id={'home-' + this.props.manifestIndex}><i className="fa fa-home"></i></span>
          <span id={'full-page-' + this.props.manifestIndex}><i className="fa fa-arrows-alt"></i></span>
          <a onClick={this.toggleSidebar} title="Show/hide metadata panel"><i className={"fa fa-toggle-" + this.state.sidebarToggleIcon}></i></a>
          <a onClick={() => this.showSourceManifestMetadataDialog()} className="source-manifest-metadata-info-button" title="Show manifest metadata"><i className="fa fa-info"></i></a>
          <a className="help-icon" href="javascript:;" onClick={() => this.showHelp('SourceManifestViewer')} ><i className="fa fa-question-circle-o"></i></a>
        </div>
        <SourceManifestMetadataDialog ref="sourceManifestMetadataDialog" manifestData={JSON.parse(this.props.manifestData)} />
        {(() => {
          if(this.props.selectedCanvasIndex > 0) {
            return (
              <NavigationArrow sequence={this.props.sequence} canvasIndex={this.props.selectedCanvasIndex} onChangeHandler={this.props.onChangeHandler} direction="left" />
            );
          }
        })()}
        <OpenseadragonViewer config={this.state.openSeadragonConf} />
        {(() => {
          if(this.props.selectedCanvasIndex < this.props.sequence.getCanvases().length - 1) {
            return (
              <NavigationArrow sequence={this.props.sequence} canvasIndex={this.props.selectedCanvasIndex} onChangeHandler={this.props.onChangeHandler} direction="right" />
            );
          }
        })()}
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar
    };
  }
)(SourceManifestViewer);