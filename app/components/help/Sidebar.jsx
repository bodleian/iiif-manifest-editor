var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>Sidebar</h3>
      <h4>Toggle Sidebar</h4>
  	  <p>
  	  	Use the <i className="fa fa-chevron-right btn btn-default btn-sm"></i> arrow button on the left of the sidebar to 
        toggle the sidebar on and off.
  	  </p>

  	  <h4>Save and Validate Manifest</h4>
  	  <p>	
  	  	Use the <i className="fa fa-download hidden-sm hidden-xs"></i> "Save Manifest" button on the top left of the sidebar to 
        download the currently edited manifest. 
        A dialog will let you choose a name for your manifest and you can validate it before downloading it.
  	  </p>

      <h4>Manifest Actions</h4>
      <h5><i className="fa fa-file hidden-sm hidden-xs"></i> Creating a New Manifest</h5>
  	  <p>
  	  	To create a new manifest from scratch instead of editing an existing one, select the "New Manifest" option from the 
        "Manifest Actions" drop-down menu. You will be prompted if you would like to proceed 
        or cancel and download your modified manifest first. After confirming, you will be presented with an empty "skeleton" manifest 
        which you can then start editing and adding canvases to.
      </p>
      
      <h5><i className="fa fa-folder-open hidden-sm hidden-xs"></i> Open an Existing Manifest</h5>
      <p>
        This option will bring you to the "Open Manifest" view where you can upload a local Manifest JSON file or 
        insert a remote Manifest URI to load into the Manifest Editor.
      </p>

      <h5><i className="fa fa-picture-o hidden-sm hidden-xs"></i> Import Canvases</h5>
      <p>
      This option will open a separate view with a thumbnail strip of the currently edited manifest on the bottom and 
      the metadata in the sidebar. Instead of the main viewer there is a button to open a sequence from a remote manifest. 
      Type in or copy &amp; paste a Manfest URI into the dialog to open the manifest above the currently edited
      manifest in a viewer. You can open two, three or more remote manifests next to each other. To add a canvas from a remote
      manifest to the currently edited manifest, simply drag and drop the thumbnail from one of the viewers on the top section
      to the thumbnail strip on the bottom section. This will insert it at the location in the sequence where you dropped it.
      </p>

      <h5><i className="fa fa-close hidden-sm hidden-xs"></i> Close Manifest</h5>
      When confirmed, this option will close the currently edited manifest and bring you back to the start page of the Manifest Editor
      where you can choose from creating a new Manifest or open an existing one.

  	</div>
  );
};



