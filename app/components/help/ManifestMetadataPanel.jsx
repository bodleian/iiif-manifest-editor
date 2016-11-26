var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  		<h3>The Manifest Metadata Panel</h3>
  		<p>The "Manifest Metadata" panel has two tabs:</p>
			
			<ul>
				<li>Predefined fields and</li>
				<li>Custom fields</li>
			</ul>

  		<h4>Predefined Fields</h4>
  		<p>
  	  	Predefined fields are top-level manifest metadata properties such as <i>label</i>, <i>description</i>, <i>attribution</i> etc.
  	  	"Predefined" here means that the <i>Label</i> of each field is predefined and can be selected from a drop-down list.
  	  	To remove a property, click on the <i className="fa fa-times-circle"></i> button to the right of each property box. To add a property, 
  	  	click on the "Add metadata field" button. This will open a drop-down menu that lets you choose from a number of predefined fields. 
  	  	Only fields that are not yet added to the current manifest will be available for selection. 
  	  	Editable fields have a <i className="fa fa-pencil-square-o"></i> icon. Click on the field value to edit it.
  		</p>
  	  
  		<h4>Custom fields</h4>
  		<p>
  	 	Custom fields are value/label pairs that will be stored in the "metadata" section of the manifest. 
  	 	"Custom" here means that the <i>Label</i> for each field is not predefined and can be set to any string.
  	 	Click the "Add metadata field button" to add a custom field. This will add a new box with "Label" 
      for the label of the new property and "Value" for the value:
  		</p>
  		<p>To edit the <i>label</i>, click on it, replace the default text of "Label" with the name for 
      the metadata field (e.g. "Date") and hit enter. Do the same for the <i>value</i> field.</p>

      <p><strong>For more information see:</strong> <br />
        <img src="./img/IIIF-logo-colored-text.png" height="15" alt="IIIF Logo"/> <a href="http://iiif.io/api/presentation/2.1/#descriptive-properties" target="_blank">http://iiif.io/api/presentation/2.1/#descriptive-properties</a>
      </p>

  	</div>
  );
};