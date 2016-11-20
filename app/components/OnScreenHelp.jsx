var React = require('react');

var OnScreenHelp = React.createClass({
  renderHelpSection: function(section) {
    if(section !== '') {
      var HelpSection = require('./help/' + this.props.section);
      return (
        <HelpSection />
      );  
    } else {
      return (
        <div>This Help section could not be found</div>
      );
    }
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title"><i className="fa fa-question-circle-o"></i> Help</h4>
            </div>
            <div className="modal-body on-screen-help">
              {this.renderHelpSection(this.props.section)}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OnScreenHelp;