var React = require('react');
var {Link} = require('react-router');

var Home = (props) => {
  return(
    <div className="home-container">
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
  );
}

module.exports = Home;
