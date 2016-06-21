var React = require('react');
var {Link} = require('react-router');

var OpenManifest = (props) => {
  return(
    <div className="open-manifest-container">
      <div className="open-manifest-form-container">
        <div className="open-manifest-form-header">
          <h3>Open Manifest</h3>
        </div>
        <div className="drop-manifest-container">
          <p>Drag and drop manifest here</p>
        </div>
        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label htmlFor="localManifestFile" className="col-sm-2 control-label">From Computer</label>
            <div className="col-sm-8">
              <input type="file" className="form-control" id="localManifestFile" placeholder="Select manifest to open" />
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-default">Open Manifest</button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="remoteManifestUrl" className="col-sm-2 control-label">From URL</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="remoteManifestUrl" placeholder="Enter URL for manifest to load" />
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-default">Load Manifest</button>
            </div>
          </div>
        </form>
        <div className="row cancel-button-container">
          <div className="col-md-12">
            <Link to="/" className="btn btn-default">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = OpenManifest;
