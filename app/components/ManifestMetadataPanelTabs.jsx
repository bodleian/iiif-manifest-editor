var React = require('react');
var ManifestMetadataPanelPredefinedFields = require('ManifestMetadataPanelPredefinedFields');
var ManifestMetadataPanelCustomFields = require('ManifestMetadataPanelCustomFields');

var ManifestMetadataPanelTabs = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <ul className="nav nav-tabs" id="tab-nav">
              <li className="active"><a href="#predefined-fields" data-toggle="tab">Predefined Fields</a></li>
              <li><a href="#custom-fields" data-toggle="tab">Custom Fields</a></li>
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane active" id="predefined-fields">
            <ManifestMetadataPanelPredefinedFields/>
          </div>
          <div className="tab-pane" id="custom-fields">
            <ManifestMetadataPanelCustomFields/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ManifestMetadataPanelTabs;