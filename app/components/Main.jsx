var React = require('react');

var Main = (props) => {
  return(
    <div className="container">
      <h1>IIIF Manifest Editor</h1>
      {props.children}
    </div>
  );
}

module.exports = Main;
