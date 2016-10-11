var React = require('react');
var {connect} = require('react-redux');
var classNames = require('classnames');
var SequenceBrowser = require('SequenceBrowser');
var ThumbnailStrip = require('ThumbnailStrip');
var MetadataSidebar = require('MetadataSidebar');

var ImportCanvases = React.createClass({
  render: function() {
    var sequenceBrowserThumbnailStripClasses = classNames(
      {
        'sequence-browser-narrow-view': this.props.showMetadataSidebar,
        'sequence-browser-wide-view': !this.props.showMetadataSidebar
      }
    );
    return (
      <div className="import-canvases-container container-fluid">
        <div className="row">
          <div className={sequenceBrowserThumbnailStripClasses}>
            <SequenceBrowser/>
            <ThumbnailStrip/>
          </div>
          <MetadataSidebar ref="sidebar"/>
        </div>
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
)(ImportCanvases);