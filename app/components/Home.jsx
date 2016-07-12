var React = require('react');
var {Link} = require('react-router');

var Home = (props) => {
  return(
    <div className="home-container">
      <div className="well">
        <img src="./img/IIIF-logo-colored-text.png" alt="IIIF Logo"/>
        <h2>IIIF Manifest Editor</h2>
        <div className="row">
          <div className="col-md-12">
            <Link to="/open" className="btn btn-default"><i className="fa fa-folder-open"></i> Open Manifest</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/new" className="btn btn-default"><i className="fa fa-file"></i> New Manifest</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = Home;
