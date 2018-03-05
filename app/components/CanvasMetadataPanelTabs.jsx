var React = require('react');
var CanvasMetadataPanelPredefinedFields = require('./CanvasMetadataPanelPredefinedFields');
var CanvasMetadataPanelCustomFields = require('./CanvasMetadataPanelCustomFields');

var CanvasMetadataPanelTabs = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-tabs" id="tab-nav">
              <li className="active"><a href="#canvas-metadata-predefined-fields" data-toggle="tab">Predefined Fields</a></li>
              <li><a href="#canvas-metadata-custom-fields" data-toggle="tab">Custom Fields</a></li>
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane active" id="canvas-metadata-predefined-fields">
            <CanvasMetadataPanelPredefinedFields/>
          </div>
          <div className="tab-pane" id="canvas-metadata-custom-fields">
            <CanvasMetadataPanelCustomFields/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CanvasMetadataPanelTabs;