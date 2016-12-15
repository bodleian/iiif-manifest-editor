var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>The Canvas Metadata Panel</h3>
  	  <p>
  	  	The Canvas Metadata panel shows the metadata for the selected canvas. You can edit the canvas label, the width and the height 
  	  	of the canvas and the image URI for the image that is annotated to the selected canvas.
  	  </p>
  	  <h4>Replace an Image on a Canvas or Add an Image to an Empty Canvas</h4>
  	  <p>
  	  	Empty canvases will show an "Add Image to Canvas" button underneath the thumbnail of the canvas, if the canvas already has 
  	  	an image annotation the button will say "Replace Image on Canvas". Clicking this button will open a modal window that 
  	  	lets you add or replace an image.
  	  </p>
  	  <p>There are three ways to add or replace an image annotation:</p>
  	  <ul>
  	    <li>
  	      <strong>From IIIF Image URI</strong>: this will fetch the image at the given URI and create a new image annotation.
  	      <br /><img className="iiif-icon" src="./img/IIIF-logo-colored-text.png" height="15" alt="IIIF Logo"/> Documentation: <a href="http://iiif.io/api/image/2.1/#image-request-parameters" target="_blank">http://iiif.io/api/image/2.1/#image-request-parameters</a>
  	    </li>
  	    <li>
  	      <strong>From info.json URI</strong>: this will create a new image annotation.
  	      <br /><img className="iiif-icon" src="./img/IIIF-logo-colored-text.png" height="15" alt="IIIF Logo"/> Documentation: <a href="http://iiif.io/api/image/2.1/#image-information" target="_blank">http://iiif.io/api/image/2.1/#image-information</a>
  	    </li>
  	    <li>
  	      <strong>Using Existing Image Annotation URI</strong>: this will add an existing image annotation to the canvas. The image annotation must be dereferenceable, i.e. the URI must be resolvable.
  	      <br /><img className="iiif-icon" src="./img/IIIF-logo-colored-text.png" height="15" alt="IIIF Logo"/> Documentation: <a href="http://iiif.io/api/presentation/2.1/#image-resources" target="_blank">http://iiif.io/api/presentation/2.1/#image-resources</a>
  	    </li>
  	  </ul>
  	</div>
  );
};