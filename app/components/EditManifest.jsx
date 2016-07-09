var React = require('react');
var {connect} = require('react-redux');
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
    var canvas = this.props.manifestoObject.getSequenceByIndex(0).getCanvasByIndex(0);
    this.props.dispatch(actions.setSelectedCanvasId(canvas.id));
  },
  render: function() {
    var {manifestData} = this.props;
    if(manifestData === undefined) {
      return false;  // do not render the component when no manifest data exists to prevent errors before redirecting
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <Viewer/>
              <ThumbnailStrip/>
            </div>
            <MetadataSidebar/>
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
      manifestData: state.manifestReducer.manifestData
    };
  }
)(EditManifest);
