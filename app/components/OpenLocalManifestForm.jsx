var React = require('react');

var OpenLocalManifestForm = React.createClass({
  loadLocalManifestFile: function() {
    // TODO: get manifest from file system
  },
  onFormSubmit: function(e) {
    e.preventDefault();
  },
  render: function() {
    return (
      <form className="form-horizontal" role="form" onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <label htmlFor="localManifestFile" className="col-sm-2 control-label">From Computer</label>
          <div className="col-sm-8">
            <input type="file" className="form-control" id="localManifestFile" placeholder="Select manifest to open" ref="localManifestFile" />
          </div>
          <div className="col-sm-2">
            <button type="submit" className="btn btn-default">Open Manifest</button>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = OpenLocalManifestForm;