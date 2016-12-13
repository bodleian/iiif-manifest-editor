var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>Viewer</h3>

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
            <td><i className="fa fa-undo viewer-style-icon"></i></td>
            <td>Rotate canvas left</td>
          </tr>
          <tr>
            <td><i className="fa fa-repeat viewer-style-icon"></i></td>
            <td>Rotate canvas right</td>
          </tr>
          <tr>
            <td><i className="fa fa-arrows-alt viewer-style-icon"></i> </td>
            <td>Show canvas in full-screen mode (press ESC to leave full-screen mode)</td>
          </tr>
          <tr>
            <td><i className="fa fa-toggle-on viewer-style-icon"></i> </td>
            <td>Toggle the display of the Sidebar</td>
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
            <td>Shift + <i className="fa fa-arrow-left"></i> left arrow</td>
            <td>navigate to the previous canvas</td>
          </tr>
          <tr>
            <td>Shift + <i className="fa fa-arrow-right"></i> right arrow</td>
            <td>navigate to the next canvas</td>
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
  	  	Click on the left arrow icon on the left side of the viewer or click the Shift + <i className="fa fa-arrow-left"></i> left 
        arrow keyboard combination to go to the previous canvas in the sequence. Click on the right arrow on the right side of the 
        viewer or click the Shift + <i className="fa fa-arrow-right"></i> right arrow keyboard combination to go to the next canvas. 
        Alternatively, click on a canvas in the thumbnail strip below the viewer to display the selected canvas.
  	  </p>

      <h4>Edit the Canvas Label</h4>
      <p>Click on the canvas label in the bottom left of the viewer to edit the label. Alternatively, 
      use the Canvas Metadata panel in the sidebar to change the canvas label of the selected canvas.</p>

  	</div>
  );
};



