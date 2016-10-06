var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var EditableTextArea = require('EditableTextArea');
var MetadataSidebarCanvas = require('MetadataSidebarCanvas');
var uuid = require('node-uuid');

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
  setImageUri: function(imageResourceId) {
    var {dispatch} = this.props;
    var that = this;
    // check if the entered URI is a valid IIIF Image API URI; if not, check if it redirects to one
    if(this.isIiifImageUri(imageResourceId)) {
      this.createImageAnnotationForImageUri(imageResourceId);
    }
    else {
      // for redirected image URIs: do an axios request and check if the responseURL is a IIIF Image API URI
      axios.get(imageResourceId)
        .then(function(response) {
          if(response.request.responseURL && that.isIiifImageUri(response.request.responseURL)) {
            that.createImageAnnotationForImageUri(response.request.responseURL);
          } else {
            dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'The URI you entered is not a IIIF Image API URI'));
          }
        })
        .catch(function(error) {
          dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'The URI you entered is not a IIIF Image API URI'));
        });
    }
  },
  createImageAnnotationForImageUri: function(imageUri) {
    var {dispatch} = this.props;
    var that = this;

    // extract base service uri
    var imageResourceUriParts = imageUri.split('/');
    imageResourceUriParts.splice(-4, 4);
    var baseServiceUri = imageResourceUriParts.join('/');
    var infoJson = baseServiceUri + '/info.json';

    // check if image resource exists by requesting its info.json
    axios.get(infoJson)
      .then(function(response) {
        // create an image annotation from the following template
        var imageAnnotation = {
          "@context":"http://iiif.io/api/presentation/2/context.json",
          "@id": "http://" + uuid(),
          "@type": "oa:Annotation",
          "motivation": "sc:painting",
          "resource": {
            "@id": imageUri,
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
        dispatch(actions.setError('FETCH_IMAGE_ANNOTATION_ERROR', 'The URI you entered is not a IIIF Image API URI'));
      });
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
          <MetadataSidebarCanvas canvasId={this.props.selectedCanvasId}/>
          <hr/>
          {this.displayImageAnnotationFetchErrors()}
          <div className="row">
            <div className="col-md-3 metadata-field-label">Canvas Label</div>
            <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={canvas.getLabel()} path={canvasLabelPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
          </div>
          <div className="row">
            <div className="col-md-3 metadata-field-label">Canvas Width</div>
            <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="canvasWidth" fieldValue={canvas.getWidth()} path={canvasWidthPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
          </div>
          <div className="row">
            <div className="col-md-3 metadata-field-label">Canvas Height</div>
            <EditableTextArea classNames="col-md-9 metadata-field-value" fieldName="canvasHeight" fieldValue={canvas.getHeight()} path={canvasHeightPath} onUpdateHandler={this.saveMetadataFieldToStore}/>
          </div>
          <div className="row">
            <div className="col-md-3 metadata-field-label">Image URI</div>
            <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={resource !== undefined ? resource['@id'] : 'N/A'} onUpdateHandler={this.setImageUri}/>
          </div>
          <div className="row">
            <div className="col-md-3 metadata-field-label">Image Annotation URI</div>
            <EditableTextArea classNames="col-md-9 metadata-field-value" fieldValue={image !== undefined ? image.id : 'N/A'} path={canvasImageIdPath} onUpdateHandler={this.updateImageAnnotationForCanvasWithId}/>
          </div>
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
