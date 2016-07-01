var React = require('react');
var {connect} = require('react-redux');
var Viewer = require('Viewer');
var MetadataSidebar = require('MetadataSidebar');
var ThumbnailStrip = require('ThumbnailStrip');

var EditManifest = React.createClass({
  componentWillMount: function() {
    var {manifestData} = this.props;
    if(manifestData === undefined || manifestData.data === undefined) {
      window.location.hash = '#/';
    }
  },
  render: function() {
    var {manifestData} = this.props;
    if(manifestData === undefined || manifestData.data === undefined) {
      return false;
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
      manifestData: state.manifestReducer.manifestData
    };
  }
)(EditManifest);
