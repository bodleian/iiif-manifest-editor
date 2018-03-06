var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var Utils = require('Utils');

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
  getUriSyntax: function() {
    switch (this.state.selectedMethod) {
      case "imageUri":
        return "{scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}";
        break;
      case "infoJson":
        return "{scheme}://{server}{/prefix}/{identifier}/info.json";
        break;
      case "imageAnnotation":
        return "{scheme}://{host}/{prefix}/{identifier}/annotation/{name}";
        break;
      default:
        return "http://";
        break;
    }
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmitHandler(this.state.selectedMethod, this.refs.uri.value);
    this.refs.uri.value = '';
    // close modal window
    var $imageAnnotationChoiceDialog = $(ReactDOM.findDOMNode(this));
    $imageAnnotationChoiceDialog.modal('hide');
  },
  render: function() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">{this.props.addOrReplace === 'add' ? 'Create Image Annotation on Canvas' : 'Replace Image Annotation on Canvas'}: {Utils.getLocalizedPropertyValue(this.props.canvas.getLabel())}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="text-right">
                    <i className="fa fa-info-circle"></i>&nbsp;
                    <a href="javascript:;" onClick={this.showHelp}>{this.state.showHelp ? 'Hide' : 'Help'}</a>
                  </div>
                  <div id="imageAnnotationUpdateHelp" className={!this.state.showHelp ? 'hidden' : null}>
                    <p>There are three ways to add or replace an image annotation:</p>
                    <ul>
                      <li>
                        <strong>From IIIF Image URI</strong>: this will fetch the image at the given URI and create a new image annotation.
                        <br /><img src="./img/IIIF-logo-colored-text.png" height="15" alt="IIIF Logo"/> Documentation: <a href="http://iiif.io/api/image/2.1/#image-request-parameters" target="_blank">http://iiif.io/api/image/2.1/#image-request-parameters</a>
                      </li>
                      <li>
                        <strong>From info.json URI</strong>: this will create a new image annotation.
                        <br /><img src="./img/IIIF-logo-colored-text.png" height="15" alt="IIIF Logo"/> Documentation: <a href="http://iiif.io/api/image/2.1/#image-information" target="_blank">http://iiif.io/api/image/2.1/#image-information</a>
                      </li>
                      <li>
                        <strong>Using Existing Image Annotation URI</strong>: this will add an existing image annotation to the canvas. The image annotation must be dereferenceable, i.e. the URI must be resolvable.
                        <br /><img src="./img/IIIF-logo-colored-text.png" height="15" alt="IIIF Logo"/> Documentation: <a href="http://iiif.io/api/presentation/2.1/#image-resources" target="_blank">http://iiif.io/api/presentation/2.1/#image-resources</a>
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <h4>{this.props.addOrReplace === 'add' ? 'Create Image Annotation' : 'Replace Image Annotation'}:</h4>
                  <form className="form">
                    <div className="row">
                      <div className="col-md-12">
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
                              Using existing image annotation URI
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h5>Enter {this.state.selectedMethodText}:</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input ref="uri" className="form-control" type="text" name="uri" placeholder={this.getUriSyntax()} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit URI</button>
                      </div>
                    </div>
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
