var React = require('react');
var {connect} = require('react-redux');

var ImageAnnotationChoiceDialog = React.createClass({
  getInitialState: function() {
    return { 
      showHelp: false,
      selectedMethod: "imageUri",
      selectedMethodText: "IIIF Image URI"
    };
  },
  showHelp: function() {
    this.setState({ showHelp: !this.state.showHelp });
  },
  updateSelectedMethod: function(e) {
    this.setState({ 
      selectedMethod: e.target.id,
      selectedMethodText: e.target.value
    });
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">{this.props.addOrReplace === 'add' ? 'Add Image Annotation to Canvas' : 'Replace Image Annotation on Canvas'}: {this.props.canvas.getLabel()}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <i className="fa fa-info"></i>&nbsp;
                    <a href="javascript:;" onClick={this.showHelp}>{this.state.showHelp ? 'Hide' : 'Help'}</a>
                  </div>
                  <div id="imageAnnotationUpdateHelp" className={!this.state.showHelp ? 'hidden' : null}>
                    <p>There are three ways to add an image annotation to this canvas:</p>
                    <ul>
                      <li>
                        From a IIIF Image URI. This will fetch the image at the given URI and create a new image annotation.
                        <br />Documentation: <a href="http://iiif.io/api/image/2.1/#image-request-parameters" target="_blank">http://iiif.io/api/image/2.1/#image-request-parameters</a>
                      </li>
                      <li>
                        From an info.json URI. This will create a new image annotation.
                        <br />Documentation: <a href="http://iiif.io/api/image/2.1/#image-information" target="_blank">http://iiif.io/api/image/2.1/#image-information</a>
                      </li>
                      <li>
                        From an existing image annotation. If you use this method, the image annotation must be dereferenceable, i.e. the URI must be resolvable.
                        <br />Documentation: <a href="http://iiif.io/api/presentation/2.1/#image-resources" target="_blank">http://iiif.io/api/presentation/2.1/#image-resources</a>
                      </li>
                    </ul>
                  </div>
                  <h4>Create image annotation:</h4>
                  <form className="form">
                    <div className="radio">
                      <label>
                        <input type="radio" onChange={this.updateSelectedMethod} name="typeOfAnnotation" id="imageUri" value="IIIF Image URI" defaultChecked />
                          From IIIF image URI
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" onChange={this.updateSelectedMethod} name="typeOfAnnotation" id="infoJson" value="info.json URI" />
                          From info.json URI
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" onChange={this.updateSelectedMethod} name="typeOfAnnotation" id="imageAnnotation" value="Image Annotation URI" />
                          From Image Annotation URI
                      </label>
                    </div>
                    <label>
                      {this.state.selectedMethodText}: 
                    </label>
                      <input className="form-control" type="text" name="uri" placeholder="http://" />
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"><i className="fa fa-close"></i> Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData,
      error: state.manifestReducer.error
    };
  }
)(ImageAnnotationChoiceDialog);
