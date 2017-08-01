var React = require('react');
var {Link} = require('react-router');

var Home = (props) => {
  return(
    <div className="home-container">
      <div className="well">
        <div className="pull-right link-to-manual">
          <a className="btn btn-default btn-sm" href="https://github.com/bodleian/iiif-manifest-editor/wiki/User-Manual" target="_blank"><i className="fa fa-book"></i> User Manual</a>
        </div>
        <div className="row">
          <div className="col-md-12">
            <img src="./img/IIIF-logo-colored-text.png" alt="IIIF Logo"/>
          </div>
        </div>
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
        <div id="bodleian-logo">
          <img src="./img/bodleian-libraries-logo.png" alt="Bodleian Libraries Oxford" />
        </div>
        <div id="textandbytes-logo">
          <img src="./img/textandbytes-logo.png" alt="text & bytes" />
        </div>
      </div>
    </div>
  );
}

module.exports = Home;
