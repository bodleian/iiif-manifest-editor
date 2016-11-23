var React = require('react');

module.exports = function(props) {
  return (
  	<div>
  	  <h3>Viewer</h3>

  	  <h4>Toolbar</h4>
  	  <p>
       <i className="fa fa-search-plus"></i> Click to zoom in <br />
       <i className="fa fa-search-minus"></i> Click to zoom out <br />
       <i className="fa fa-home"></i> Reset zoom to show full canvas <br />
       <i className="fa fa-arrows-alt"></i> Show canvas in full-screen mode (press ESC to leave full-screen mode) <br />
       <i className="fa fa-toggle-on"></i> Toggle the display of the Sidebar <br />
      </p>

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
  	  	Click on the left arrow icon on the left side of the viewer to go to the previous canvas in the sequence, 
        the right arrow on the right side of the viewer to go to the next canvas. Alternatively, click on a canvas 
        in the thumbnail strip below the viewer to display the selected canvas.
  	  </p>

      <h4>Edit the Canvas Label</h4>
      <p>Click on the canvas label in the bottom left of the viewer to edit the label. Alternatively, 
      use the Canvas Metadata panel in the sidebar to change the canvas label of the selected canvas.</p>


  	</div>
  );
};



