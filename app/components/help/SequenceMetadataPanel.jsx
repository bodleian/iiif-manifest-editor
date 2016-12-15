var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>The Sequence Metadata Panel</h3>
  	  <p>
  	  	The Sequence Metadata panel lets you edit the label for the current sequence and set the viewing direction for the manifest. 
  	  </p>

  	  <h4>Setting Viewing Direction</h4>
  	  <p>	
  	  	Use the drop-down menu to toggle between <i>left-to-right</i> and <i>right-to-left</i> viewing directions. 
  	  	The <i>viewingDirection</i> field in the Manifest Metadata panel will be updated accordingly or added to the manifest level 
  	  	metadata if it has not been there before. You can also edit this field in the Manifest Metadata panel directly. 
  	  </p>

  	  <p>
  	  	If <i>right-to-left</i> has been selected, the canvases in the thumbnail strip will be displayed in reverse order. 
  	  	This setting only affects the <i>display</i> of the canvases in the thumbnail strip and does not actually reverse the order of 
  	  	the canvases in the manifest itself.
  	  </p>
  	</div>
  );
};



