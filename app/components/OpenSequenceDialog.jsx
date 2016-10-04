var React = require('react');

var OpenSequenceDialog = React.createClass({
  openSequence: function() {
    console.log('Attempting to open sequence...');
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">Open Sequence</h4>
            </div>
            <div className="modal-body">
              <input type="text" ref="remoteManifestUrl" className="form-control" placeholder="Enter a remote manifest URL" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.openSequence()}><i className="fa fa-download"></i> Open</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OpenSequenceDialog;