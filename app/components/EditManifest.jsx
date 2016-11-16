var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var classNames = require('classnames');
var Viewer = require('Viewer');
var MetadataSidebar = require('MetadataSidebar');
var ThumbnailStrip = require('ThumbnailStrip');


var EditManifest = React.createClass({
  componentDidMount: function() {
    $(window).on('beforeunload', function() {
      return true;
    });
  },
  componentWillMount: function() {
    if(this.props.manifestData === undefined) {
      window.location.hash = '#/';
    }

    // save the id of the first canvas in the store on initial load to set the active class on the first canvas in the thumbnail strip
    if(this.props.manifestoObject !== undefined && this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length > 0) {
      var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasByIndex(0);
      this.props.dispatch(actions.setSelectedCanvasId(canvas.id));
    }
  },
  render: function() {
    var viewerThumbnailStripClasses = classNames(
      {
        'viewer-thumbnail-strip-narrow-view': this.props.showMetadataSidebar,
        'viewer-thumbnail-strip-wide-view': !this.props.showMetadataSidebar
      }
    );
    if(this.props.manifestData === undefined) {
      return false;  // do not render the component when no manifest data exists to prevent errors before redirecting
    } else {
      return (
        <div className="edit-manifest-container container-fluid">
          <div className="row">
            <div className={viewerThumbnailStripClasses}>
              <Viewer key={this.props.selectedCanvasId} />
              <ThumbnailStrip/>
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
      selectedCanvasId: state.manifestReducer.selectedCanvasId,
      showMetadataSidebar: state.manifestReducer.showMetadataSidebar
    };
  }
)(EditManifest);
