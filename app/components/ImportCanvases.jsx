var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var classNames = require('classnames');
var SourceManifestBrowser = require('SourceManifestBrowser');
var ThumbnailStrip = require('ThumbnailStrip');
var MetadataSidebar = require('MetadataSidebar');

var ImportCanvases = React.createClass({
  getInitialState: function() {
    return {
      sourceManifestBrowser: undefined
    }
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
  componentDidMount: function() {
    this.setState({
      sourceManifestBrowser: this.refs.sourceManifestBrowser
    });
  },
  render: function() {
    var sourceManifestBrowserClasses = classNames(
      {
        'source-manifest-browser-narrow-view': this.props.showMetadataSidebar,
        'source-manifest-browser-wide-view': !this.props.showMetadataSidebar
      }
    );
    if(this.props.manifestData === undefined) {
      return false;  // do not render the component when no manifest data exists to prevent errors before redirecting
    } else {
      return (
        <div className="import-canvases-container container-fluid">
          <div className="row">
            <div className={sourceManifestBrowserClasses}>
              <SourceManifestBrowser ref="sourceManifestBrowser"/>
              <ThumbnailStrip/>
            </div>
            <MetadataSidebar sourceManifestBrowser={this.state.sourceManifestBrowser}/>
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
)(ImportCanvases);