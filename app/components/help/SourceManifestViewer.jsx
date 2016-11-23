var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>Source Manifest Viewer</h3>

      <h4>Adding Canvases from Source Manifests to the Target Manifest</h4>
      <p>
        Source manifests are all manifests opened in the top section of this view. Each source manifest has its own viewer. 
        Hover over the bottom part of each viewer to reveal the thumbnail strip containing all canvases of the current sequence.
        Drag and drop a canvas from this thumbnail strip to the bigger thumbnail strip – showing the canvases of the target 
        manifest – at the bottom of this view. To add multiple canvases at once, click on the first canvas and then shift + click
        on the last canvas to select multiple canvases, then drag them to the thumbnail strip on the bottom.
      </p>

  	  <h4>Toolbar</h4>
  	  <table className="table table-bordered table-condensed table-striped">
        <thead>
          <tr>
            <td>Icon</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><i className="fa fa-times-circle viewer-style-icon"></i></td>
            <td>Remove this source manifest / viewer</td>
          </tr>
          <tr>
            <td><i className="fa fa-search-plus viewer-style-icon"></i></td>
            <td>Click to zoom in</td>
          </tr>
          <tr>
            <td><i className="fa fa-search-minus viewer-style-icon"></i></td>
            <td>Click to zoom out</td>
          </tr>
          <tr>
            <td><i className="fa fa-home viewer-style-icon"></i></td>
            <td>Reset zoom to show full canvas</td>
          </tr>
          <tr>
            <td><i className="fa fa-arrows-alt viewer-style-icon"></i> </td>
            <td>Show canvas in full-screen mode (press ESC to leave full-screen mode)</td>
          </tr>
          <tr>
            <td><i className="fa fa-toggle-on viewer-style-icon"></i> </td>
            <td>Toggle the display of the Sidebar</td>
          </tr>
          <tr>
            <td><i className="fa fa-info viewer-style-icon"></i></td>
            <td>Show metadata of source manifest in modal window</td>
          </tr>
        </tbody>
      </table>
         
      <h4>Keyboard Navigation</h4>
      <p>You can use the following keys to navigate:</p>

      <table className="table table-bordered table-condensed table-striped">
        <thead>
          <tr>
            <td>Key</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><i className="fa fa-arrow-up"></i> up arrow</td>
            <td>move viewport up</td>
          </tr>
          <tr>
            <td><i className="fa fa-arrow-down"></i> down arrow</td>
            <td>move viewport down</td>
          </tr>
          <tr>
            <td><i className="fa fa-arrow-left"></i> left arrow</td>
            <td>move viewport left</td>
          </tr>
          <tr>
            <td><i className="fa fa-arrow-right"></i> right arrow</td>
            <td>move viewport right</td>
          </tr>
          <tr>
            <td>0</td>
            <td>zoom / move viewport home</td>
          </tr>
          <tr>
            <td>Shift + <i className="fa fa-arrow-up"></i> up arrow</td>
            <td>zoom viewport out</td>
          </tr>
          <tr>
            <td>Shift + <i className="fa fa-arrow-down"></i> down arrow</td>
            <td>zoom viewport in</td>
          </tr>
        </tbody>
      </table>


      <h4>Navigate within the Sequence</h4>
  	  <p>
  	  	Hovering over the bottom part of each viewer for source manifests will display a thumbnail strip with all canvases
        of the loaded sequence. Click on a canvas in the thumbnail strip to display the selected canvas in the viewer
  	  </p>


  	</div>
  );
};



