var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var classNames = require('classnames');
var Viewer = require('Viewer');
var MetadataSidebar = require('MetadataSidebar');
var ThumbnailStrip = require('ThumbnailStrip');
import ReactDOM from 'react-dom'
import OpenseadragonViewer from 'react-openseadragon'
import OpenSeadragonControls from 'react-openseadragon'
import OpenSeadragonNavigator from 'react-openseadragon'


var openSeaDragonConfig = {
      sequenceMode:  true,
      showReferenceStrip: true,
      defaultZoomLevel: 0,
      tileSources:   [
          "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000001.jp2/info.json",
          "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000002.jp2/info.json",
          "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000003.jp2/info.json",
          "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000004.jp2/info.json",
          "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000005.jp2/info.json",
          "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000006.jp2/info.json",
          "http://libimages.princeton.edu/loris2/pudl0001%2F4609321%2Fs42%2F00000007.jp2/info.json"
      ]
  }

var EditManifest = React.createClass({
  componentDidMount: function() {
    $(window).on('beforeunload', function() {
      return true;
    });
  },
  componentWillMount: function() {
    var {manifestData} = this.props;
    if(manifestData === undefined) {
      window.location.hash = '#/';
    }

    // save the id of the first canvas in the store on initial load to set the active class on the first canvas in the thumbnail strip
    if(this.props.manifestoObject !== undefined && this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length > 0) {
      var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasByIndex(0);
      this.props.dispatch(actions.setSelectedCanvasId(canvas.id));
    }
  },
  render: function() {
    var {manifestData} = this.props;
    var viewerThumbnailStripClasses = classNames(
      {
        'viewer-thumbnail-strip-narrow-view': this.props.showMetadataSidebar,
        'viewer-thumbnail-strip-wide-view': !this.props.showMetadataSidebar
      }
    );
    if(manifestData === undefined) {
      return false;  // do not render the component when no manifest data exists to prevent errors before redirecting
    } else {
      return (
        <div className="edit-manifest-container container-fluid">
          <div className="row">
            <div className={viewerThumbnailStripClasses}>
              <OpenseadragonViewer config={openSeaDragonConfig} />
              
            </div>
            <MetadataSidebar ref="sidebar"/>
          </div>
        </div>
      );
    }
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData,
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar
    };
  }
)(EditManifest);
