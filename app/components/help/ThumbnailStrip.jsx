var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>Working with the Thumbnail Strip</h3>
  	  
      <h4>Displaying a Canvas in the Viewer</h4>
      <p>
        The thumbnail strip at the bottom of the viewer shows the current sequence. Click on a thumbnail to select the canvas and 
        display it in the viewer as well as its metadata in the Canvas Metadata panel. 
      </p>
      <h4>Deleting Canvases</h4>
      <p>
        A canvas can be deleted by clicking the <i className="fa fa-trash"></i> trash icon on the top left of each canvas. Use Shift + click to select multiple 
        (adjacent) canvases and delete all selected canvases at once. Click "Ok" on the popover that asks you to confirm the 
        deletion of the selected canvases (or "Cancel" to abort).
  	  </p>

      <h4>Adding Canvases</h4>
      <p>
        At the right end of the sequence there is an "Add Canvas" button which lets you add a canvas to the end of the sequence. 
        Use the Canvas Metadata panel to add an image to an empty canvas using the "Add Image to Canvas" button. You can also click on
        the <i className="fa fa-bars"></i> icon on the top right of each canvas to add a canvas to the left or to the right of the 
        current canvas or to duplicate a canvas (cf. below: The Canvas "Context Menu").
      </p>

      <h4>Reordering Canvases</h4>
      <p>
        Drag and drop a canvas within the thumbnail strip to change its location within the sequence.
      </p>

  	  <h4>The Canvas "Context Menu"</h4>
  	  <p>	
  	  	Clicking the <i className="fa fa-bars"></i> icon on the top right of each canvas reveals a context menu that lets you:
      </p>
      <ul>
        <li><i className="context-menu-item fa fa-arrow-left"></i> add an empty canvas to the left of the current canvas</li>
        <li><i className="context-menu-item fa fa-arrow-right"></i> add an empty canvas to the right of the current canvas</li>
        <li><i className="context-menu-item fa fa-files-o"></i> duplicate the current canvas</li>
        <li><i className="context-menu-item fa fa-picture-o"></i> go to "Import Canvases" view to import canvases from other manifests</li>
      </ul>

  	</div>
  );
};
