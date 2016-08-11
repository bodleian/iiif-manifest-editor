var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var classNames = require('classnames');
var Viewer = require('Viewer');
var MetadataSidebar = require('MetadataSidebar');
var ThumbnailStrip = require('ThumbnailStrip');
var actions = require('actions');

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
  setShowMetadataSidebar: function(value) {
    this.props.dispatch(actions.setShowMetadataSidebar(value));
  },
  toggleSidebar: function() {
    this.setShowMetadataSidebar(!this.props.showMetadataSidebar);
  },
  showSidebar: function() {
    this.setShowMetadataSidebar(true);
  },
  render: function() {
    var {manifestData} = this.props,
        viewerThumbnailStripClasses = classNames(
          'viewer-thumbnail-strip',
          {
            'col-md-8': this.props.showMetadataSidebar,
            'col-md-12': !this.props.showMetadataSidebar,
            'col-sm-8': this.props.showMetadataSidebar,
            'col-sm-12': !this.props.showMetadataSidebar            
          }
        ),
        btnShowSidebarClasses = classNames(
          'btn',
          'btn-default',
          'btn-show-sidebar',
          'hidden-xs',
          {
            'visible': !this.props.showMetadataSidebar
          }
        );

    if(manifestData === undefined) {
      return false;  // do not render the component when no manifest data exists to prevent errors before redirecting
    } else {
      return (
        <div className="edit-manifest-container container-fluid">
          <div className="row">
            <div className={viewerThumbnailStripClasses}>
              <Viewer/>
              <ThumbnailStrip/>
            </div>
            <MetadataSidebar ref="sidebar"/>
          </div>
          <a onClick={this.toggleSidebar} className="btn btn-default menu-toggle-sidebar hidden-xs" title="Show/hide metadata panel"><i className="fa fa-info"></i></a>
          <a onClick={this.showSidebar} className={btnShowSidebarClasses} title="Show metadata panel" ><i className="fa fa-chevron-left"></i></a>
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
