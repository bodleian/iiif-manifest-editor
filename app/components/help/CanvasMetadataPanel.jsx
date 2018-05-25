var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>The Canvas Metadata Panel</h3>
  	  <p>
  	  	The Canvas Metadata panel shows the metadata for the selected canvas. You can edit 
        the canvas label, the width and the height of the canvas and the image URI for the 
        image that is annotated to the selected canvas. You can also specify a "related"
        property with a link to an external resource.
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
      <h4>The "related" Field</h4>
      <p>
        A link to an external resource intended to be displayed directly to the user that
        is related to the canvas. Examples might include a website describing the canvas, 
        an HTML description, etc. A label and the format of the related resource should be 
        given to assist clients in rendering the resource to the user.
      </p>

      <h4>Custom fields</h4>
      <p>
        Custom fields are value/label pairs that will be stored in the "metadata" section of the canvas. 
        "Custom" here means that the <i>Label</i> for each field is not predefined and can be set to 
        any string.
        Click the "Add metadata field button" to add a custom field. This will add a new box with "Label" 
        for the label of the new property and "Value" for the value:
      </p>
      <p>To edit the <i>label</i>, click on it, replace the default text of "Label" with the name for 
      the metadata field (e.g. "Date") and hit enter. Do the same for the <i>value</i> field.</p>

      <p>
        You can also add a language-specific custom field by clicking on the "Add language metadata field"
        button. In addition to the "Label" and "Value" fields there is a "Language" field. Specify the 
        language for the metadata field as a two-letter&nbsp;
        <a target="_blank" href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">ISO-639-1 code</a>&nbsp;
        such as "en" for English.
      </p>
  	</div>
  );
};