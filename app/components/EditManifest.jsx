var React = require('react');
var {connect} = require('react-redux');
var classNames = require('classnames');
var Viewer = require('Viewer');
var MetadataSidebar = require('MetadataSidebar');
var ThumbnailStrip = require('ThumbnailStrip');
var actions = require('actions');

var EditManifest = React.createClass({
  componentWillMount: function() {
    var {manifestData} = this.props;
    if(manifestData === undefined) {
      window.location.hash = '#/';
    }

    // save the id of the first canvas in the store on initial load to set the active class on the first canvas in the thumbnail strip
    if(this.props.manifestoObject !== undefined) {
      var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasByIndex(0);
      this.props.dispatch(actions.setSelectedCanvasId(canvas.id));
    }
  },
  getInitialState: function() {
    return { collapsed: true };
  },
  toggleSidebar: function() {
    this.setState({ collapsed: !this.state.collapsed });
    this.refs.sidebar.toggle();
  },
  render: function() {
    var {manifestData} = this.props,
        viewerThumbnailStripClasses = classNames(
          'viewer-thumbnail-strip',
          {
            'col-md-8': this.state.collapsed,
            'col-md-12': !this.state.collapsed
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
          // TODO: move toggle and manifest buttons (new, open, save etc) to a new component
          <a onClick={this.toggleSidebar} className="btn btn-default menu-toggle-sidebar">i</a>
        </div>
      );
    }
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData
    };
  }
)(EditManifest);
