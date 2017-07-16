var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var EditableTextArea = require('EditableTextArea');
var MetadataSidebarCanvas = require('MetadataSidebarCanvas');
var ImageAnnotationChoiceDialog = require('ImageAnnotationChoiceDialog');
var uuid = require('uuid');
var Utils = require('Utils');

var CanvasMetadataPanel = React.createClass({
  saveMetadataFieldToStore: function(fieldValue, path, fieldName) {
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(fieldValue, path));
  },
  updateImageAnnotationForCanvasWithId: function(fieldValue, path) {
    // fetch new image annotation remotely
    var {dispatch} = this.props;
    dispatch(actions.startImageAnnotationFetch());
    var that = this;
    axios.get(fieldValue)
      .then(function(response) {
        var updatedImageAnnotation = response.data;
        // update the on property on the fetched image annotation to set it to the original canvas ID
        updatedImageAnnotation.on = that.props.selectedCanvasId;
        dispatch(actions.completeImageAnnotationFetch());
        // dispatch action to store to replace existing image annotation with fetched image annotation
        dispatch(actions.updateMetadataFieldValueAtPath(updatedImageAnnotation, path));
        dispatch(actions.resetError());
      })
      .catch(function(error) {
        dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'Error loading image annotation. Please provide a valid image annotation URI.'));
      });
  },
  displayImageAnnotationFetchErrors: function() {
    var {error} = this.props;
    if(error !== undefined && error.type === 'FETCH_IMAGE_ANNOTATION_ERROR') {
      return (
        <div className="row">
          <div className="col-md-offset-1 col-md-10">
            <div className="alert alert-danger image-annotation-fetch-error">
              {error.message}
            </div>
          </div>
        </div>
      );
    }
  },
  isIiifImageUri: function(uri) {
    // TODO: implement more robust IIIF image URI validation
    return uri.substr(-11) === '/native.jpg' || uri.substr(-12) === '/default.jpg';
  },
  isInfoJsonUri: function(uri) {
    return uri.substr(-10) === '/info.json';
  },
  handleImageAnnotationUri: function(imageAnnotationUri) {
    var sequence = this.props.manifestoObject.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
    var canvasImageIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/images/0";
    this.updateImageAnnotationForCanvasWithId(imageAnnotationUri, canvasImageIdPath);
  },
  handleImageUri: function(imageUri) {
    var {dispatch} = this.props;
    var that = this;
    // check if the entered URI is a valid IIIF Image API URI; if not, check if it redirects to one
    if(this.isIiifImageUri(imageUri)) {
      var infoJsonUri = this.getInfoJsonFromImageUri(imageUri);
      this.createImageAnnotationFromInfoJsonUri(infoJsonUri);
    }
    else {
      // for redirected image URIs: do an axios request and check if the responseURL is a IIIF Image API URI
      axios.get(imageUri)
        .then(function(response) {
          if(response.request.responseURL && that.isIiifImageUri(response.request.responseURL)) {
            var infoJsonUri = this.getInfoJsonFromImageUri(response.request.responseURL);
            that.createImageAnnotationFromInfoJsonUri(infoJsonUri);
          } else {
            dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'The URI you entered is not a IIIF Image API URI'));
          }
        })
        .catch(function(error) {
          dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'The URI you entered is not a IIIF Image API URI'));
        });
    }
  },
  handleInfoJsonUri: function(infoJsonUri) {
    if(this.isInfoJsonUri(infoJsonUri)) {
      this.createImageAnnotationFromInfoJsonUri(infoJsonUri);
    } else {
      this.props.dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'The URI you entered is not a valid info.json URI'));
    }
  },
  getInfoJsonFromImageUri: function(imageUri) {
    // extract base service uri
    var imageResourceUriParts = imageUri.split('/');
    imageResourceUriParts.splice(-4, 4);
    var baseServiceUri = imageResourceUriParts.join('/');
    var infoJsonUri = baseServiceUri + '/info.json';
    return infoJsonUri;
  },
  createImageAnnotationFromInfoJsonUri: function(infoJsonUri) {
    var {dispatch} = this.props;
    var that = this;
    var baseServiceUri = infoJsonUri.substr(0, (infoJsonUri.length - 10));
    // check if image resource exists by requesting its info.json
    axios.get(infoJsonUri)
      .then(function(response) {
        // create an image annotation from the following template
        var imageAnnotation = {
          "@context":"http://iiif.io/api/presentation/2/context.json",
          "@id": "http://" + uuid(),
          "@type": "oa:Annotation",
          "motivation": "sc:painting",
          "resource": {
            "@id": baseServiceUri + '/full/full/0/default.jpg', // TODO: get this from info.json
            "@type": "dctypes:Image",
            "format": "image/jpeg",
            "service": {
              "@context": response.data['@context'],
              "@id": baseServiceUri,
              "profile": response.data.profile
            },
            "height": response.data.height,
            "width": response.data.width
          },
          "on": that.props.selectedCanvasId
        };
        // get the index of the selected canvas
        var manifest = that.props.manifestoObject;
        var sequence = manifest.getSequenceByIndex(0);
        var canvas = sequence.getCanvasById(that.props.selectedCanvasId);
        var selectedCanvasIndex = sequence.getCanvasIndexById(canvas.id);

        // save the image annotation in the manifestData object in the store
        dispatch(actions.addImageAnnotationToCanvas(imageAnnotation, selectedCanvasIndex));
        dispatch(actions.resetError());
      })
      .catch(function(error) {
        dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'The URI you entered is not valid'));
      });
  },
  openImageAnnotationChoiceDialog: function() {
    // open the image annnotation choice modal dialog
    var $imageAnnotationDialog = $(ReactDOM.findDOMNode(this.refs.imageAnnotationDialog));
    $imageAnnotationDialog.modal({
      backdrop: 'static'
    });
  },
  handleImageAnnotationChoice: function(selectedMethod, uri) {
    if(selectedMethod == "imageAnnotation") {
      this.handleImageAnnotationUri(uri);
    } 
    else if(selectedMethod == "imageUri") {
      this.handleImageUri(uri);
    } else {
      this.handleInfoJsonUri(uri);
    }
  },
  render: function() {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(this.props.selectedCanvasId);
    if(canvas !== null) {
      var image = canvas.getImages()[0];
      var resource = image !== undefined ? image.__jsonld.resource : undefined;
      var canvasLabelPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/label";
      var canvasWidthPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/width";
      var canvasHeightPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/height";
      var canvasImageIdPath = "sequences/0/canvases/" + sequence.getCanvasIndexById(canvas.id) + "/images/0";
      return (
        <div className="metadata-sidebar-panel">
          <ImageAnnotationChoiceDialog ref="imageAnnotationDialog" onSubmitHandler={this.handleImageAnnotationChoice} canvas={canvas} addOrReplace={image !== undefined ? 'replace' : 'add'} />
          <MetadataSidebarCanvas canvasId={this.props.selectedCanvasId}/>
          <div className="row">
            <div className="col-md-12">
              <button onClick={this.openImageAnnotationChoiceDialog} className="btn btn-default center-block add-replace-image-on-canvas-button"><i className={image !== undefined ? 'fa fa-refresh' : 'fa fa-plus-circle'}></i> {image !== undefined ? 'Replace Image on Canvas' : 'Add Image to Canvas'}</button>
            </div>
          </div>
          <hr/>
          {this.displayImageAnnotationFetchErrors()}
          
          <dl>
            <dt className="metadata-field-label">Canvas Label</dt> 
            <dd className="metadata-field-value">
              <EditableTextArea fieldValue={Utils.getLocalizedPropertyValue(canvas.getLabel())} path={canvasLabelPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
            </dd>
          </dl>
          <dl>
            <dt className="metadata-field-label">Canvas Width</dt> 
            <dd className="metadata-field-value">
              <EditableTextArea fieldName="canvasWidth" fieldValue={canvas.getWidth().toString()} path={canvasWidthPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
            </dd>
          </dl>
          <dl>
            <dt className="metadata-field-label">Canvas Height</dt> 
            <dd className="metadata-field-value">
              <EditableTextArea fieldName="canvasHeight" fieldValue={canvas.getHeight().toString()} path={canvasHeightPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
            </dd>
          </dl>
          <dl>
            <dt className="metadata-field-label">Image URI</dt> 
            <dd className="metadata-field-value">
              <EditableTextArea fieldValue={resource !== undefined ? resource['@id'] : 'N/A'} onUpdateHandler={this.handleImageUri}/>
            </dd>
          </dl>
          <dl>
            <dt className="metadata-field-label">Image Annotation URI</dt> 
            <dd className="metadata-field-value">
              <EditableTextArea fieldValue={image !== undefined ? image.id : 'N/A'} path={canvasImageIdPath} onUpdateHandler={this.updateImageAnnotationForCanvasWithId}/>
            </dd>
          </dl>
        </div>
      );
    } else if(this.props.manifestoObject.getSequenceByIndex(0).getCanvases().length < 1) {
      return (
        <div>
          This sequence does not have any canvases.
        </div>
      );
    } else {
      return (
        <div>
          The selected canvas has been deleted.
        </div>
      );
    }
  }
});

module.exports = connect(
  (state) => {
    return {
      manifestoObject: state.manifestReducer.manifestoObject,
      manifestData: state.manifestReducer.manifestData,
      selectedCanvasId: state.manifestReducer.selectedCanvasId,
      error: state.manifestReducer.error
    };
  }
)(CanvasMetadataPanel);
