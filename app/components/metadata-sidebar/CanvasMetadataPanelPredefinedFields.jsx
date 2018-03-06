var React = require('react');
var ReactDOM = require('react-dom');
var {connect} = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var FormSelect = require('FormSelect');
var EditableTextArea = require('EditableTextArea');
var MetadataSidebarCanvas = require('MetadataSidebarCanvas');
var ImageAnnotationChoiceDialog = require('ImageAnnotationChoiceDialog');
var uuid = require('uuid');
var Utils = require('Utils');

var CanvasMetadataPanelPredefinedFields = React.createClass({
  getInitialState: function() {
    return {
      selectedCanvas: this.getSelectedCanvas(this.props.selectedCanvasId),
      numUniqueMetadataFields: undefined,
      numMultiValuedMetadataFields: undefined,
      numUnassignedMetadataFields: undefined,
      availableMetadataFields: this.getAvailableMetadataFieldsForCanvas(this.props.selectedCanvasId),
      activeMetadataFields: []
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.selectedCanvasId !== nextProps.selectedCanvasId) {
      this.setState({
        selectedCanvas: this.getSelectedCanvas(nextProps.selectedCanvasId),
        numUniqueMetadataFields: undefined,
        numMultiValuedMetadataFields: undefined,
        numUnassignedMetadataFields: undefined,
        availableMetadataFields: this.getAvailableMetadataFieldsForCanvas(nextProps.selectedCanvasId),
        activeMetadataFields: []
      }, () => {
        this.displayActiveMetadataFields();
      });
    }
  },
  getAvailableMetadataFieldIndexByFieldName: function(availableMetadataFields, fieldName) {
    var availableMetadataFieldIndex = -1;
    for(var fieldIndex = 0; fieldIndex < availableMetadataFields.length; fieldIndex++) {
      var metadataField = availableMetadataFields[fieldIndex];
      if(metadataField.name === fieldName) {
        availableMetadataFieldIndex = fieldIndex;
        break;
      }
    }
    return availableMetadataFieldIndex;
  },
  getActiveMetadataFieldIndexByFieldName: function(activeMetadataFields, fieldName) {
    var activeMetadataFieldIndex = -1;
    Object.keys(activeMetadataFields).map(function(index) {
      var metadataField = activeMetadataFields[index];
      if(metadataField.name === fieldName) {
        activeMetadataFieldIndex = index;
      }
    });
    return activeMetadataFieldIndex;
  },
  updateMetadataFieldLists: function(fieldName, fieldValue, availableMetadataFields, activeMetadataFields) {
    // find the available metadata field based on the field name
    var availableMetadataFieldIndex = this.getAvailableMetadataFieldIndexByFieldName(availableMetadataFields, fieldName);
    if(availableMetadataFieldIndex !== -1) {
      // append the metadata field to the list of active fields and update its value
      var availableMetadataField = availableMetadataFields[availableMetadataFieldIndex];
      availableMetadataField.value = fieldValue;
      activeMetadataFields.push(availableMetadataField);

      // delete the metadata field from the list of available fields if it is unique
      if(availableMetadataField.isUnique) {
        availableMetadataFields.splice(availableMetadataFieldIndex, 1);
      }
    } else {
      // find the active metadata field based on the field name and update its value
      var activeMetadataFieldIndex = this.getActiveMetadataFieldIndexByFieldName(activeMetadataFields, fieldName);
      if(activeMetadataFieldIndex !== -1) {
        var activeMetadataField = activeMetadataFields[activeMetadataFieldIndex];
        activeMetadataField.value = fieldValue;
      }
    }
  },
  componentDidMount: function() {
    this.displayActiveMetadataFields();
  },
  getSelectedCanvas: function(canvasId) {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(canvasId);
    return canvas;
  },
  displayActiveMetadataFields: function() {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];

    var numUniqueMetadataFields =  availableMetadataFields.filter(function(field) { return !field.isUnique }).length;
    var numMultiValuedMetadataFields = availableMetadataFields.filter(function(field) { return field.isUnique }).length;

    // add the following fields to the active metadata fields list to display it in the canvas metadata panel

    // canvas label
    if(this.state.selectedCanvas.getLabel()) {
      this.updateMetadataFieldLists('label', this.state.selectedCanvas.getLabel(), availableMetadataFields, activeMetadataFields);
    }

    // canvas width
    if(this.state.selectedCanvas.getWidth()) {
      this.updateMetadataFieldLists('width', this.state.selectedCanvas.getWidth().toString(), availableMetadataFields, activeMetadataFields);
    }

    // canvas height
    if(this.state.selectedCanvas.getHeight()) {
      this.updateMetadataFieldLists('height', this.state.selectedCanvas.getHeight().toString(), availableMetadataFields, activeMetadataFields);
    }

    // image uri
    var image = this.state.selectedCanvas.getImages()[0];
    var resource = (image !== undefined) ? image.__jsonld.resource : undefined;
    var resourceId = (resource !== undefined) ? resource['@id'] : 'N/A';
    this.updateMetadataFieldLists('image_uri', resourceId, availableMetadataFields, activeMetadataFields);

    // image annotation uri
    var imageId = (image !== undefined) ? image.id : 'N/A';
    this.updateMetadataFieldLists('image_annotation_uri', imageId, availableMetadataFields, activeMetadataFields);

    // related
    if(this.state.selectedCanvas.__jsonld.related !== undefined) {
      this.updateMetadataFieldLists('related', this.state.selectedCanvas.__jsonld.related, availableMetadataFields, activeMetadataFields);
    }

    this.setState({
      numUniqueMetadataFields: numUniqueMetadataFields,
      numMultiValuedMetadataFields: numMultiValuedMetadataFields,
      numUnassignedMetadataFields: 0,
      availableMetadataFields: availableMetadataFields,
      activeMetadataFields: activeMetadataFields
    });
  },
  getAvailableMetadataFieldsForCanvas: function(canvasId) {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(canvasId);
    var canvasIndex = sequence.getCanvasIndexById(canvas.id);
    var image = canvas.getImages()[0];
    var resource = image !== undefined ? image.__jsonld.resource : undefined;
    var canvasPathPrefix = 'sequences/0/canvases/' + canvasIndex;

    return [
      {
        name: 'label',
        label: 'Canvas Label',
        value: Utils.getLocalizedPropertyValue(canvas.getLabel()),
        isRequired: true,
        isUnique: true,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/label',
        handler: this.saveMetadataFieldToStore
      },
      {
        name: 'width',
        label: 'Canvas Width',
        value: canvas.getWidth().toString(),
        isRequired: true,
        isUnique: true,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/width',
        handler: this.saveMetadataFieldToStore
      },
      {
        name: 'height',
        label: 'Canvas Height',
        value: canvas.getHeight().toString(),
        isRequired: true,
        isUnique: true,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/height',
        handler: this.saveMetadataFieldToStore
      },
      {
        name: 'image_uri',
        label: 'Image URI',
        value: resource !== undefined ? resource['@id'] : 'N/A',
        isRequired: true,
        isUnique: true,
        addPath: canvasPathPrefix,
        updatePath: '',
        handler: this.handleImageUri
      },
      {
        name: 'image_annotation_uri',
        label: 'Image Annotation URI',
        value: image !== undefined ? image.id : 'N/A',
        isRequired: true,
        isUnique: true,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/images/0',
        handler: this.updateImageAnnotationForCanvasWithId
      },
      {
        name: 'related',
        label: 'Related',
        value: canvas.__jsonld.related,
        isRequired: false,
        isUnique: true,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/related',
        handler: this.saveMetadataFieldToStore
      }
    ];
  },
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

  addMetadataField: function() {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];
    var numUnassignedMetadataFields = this.state.numUnassignedMetadataFields + 1;

    // append an empty metadata field to the active metadata list
    if(availableMetadataFields.length > 0) {
      var newMetadataField = { name: undefined, value: 'N/A' };
      activeMetadataFields.push(newMetadataField);

      // update the metadata field lists in the state
      this.setState({
        numUnassignedMetadataFields: numUnassignedMetadataFields,
        activeMetadataFields: activeMetadataFields
      });
    }
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
    } else if(selectedMethod == "imageUri") {
      this.handleImageUri(uri);
    } else {
      this.handleInfoJsonUri(uri);
    }
  },
  updateMetadataFieldsWithSelectedOption: function(menuIndex, selectedFieldName) {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];

    var metadataFieldToDelete = activeMetadataFields[menuIndex];
    var numUnassignedMetadataFields = (metadataFieldToDelete.name === undefined) ? this.state.numUnassignedMetadataFields - 1 : this.state.numUnassignedMetadataFields;

    // delete the selected menu at the given index in the active list of metadata fields
    activeMetadataFields.splice(menuIndex, 1);

    // find the available metadata field based on the field name
    var availableMetadataFieldIndex = this.getAvailableMetadataFieldIndexByFieldName(availableMetadataFields, selectedFieldName);
    var availableMetadataField = availableMetadataFields[availableMetadataFieldIndex];
    availableMetadataField.value = 'N/A';

    // insert the available field at the location of the deleted field
    activeMetadataFields.splice(menuIndex, 0, availableMetadataField);

    // delete the available field
    availableMetadataFields.splice(availableMetadataFieldIndex, 1);

    // update the metadata field lists in the state so that the component uses the correct values when rendering
    this.setState({
      numUnassignedMetadataFields: numUnassignedMetadataFields,
      availableMetadataFields: availableMetadataFields,
      activeMetadataFields: activeMetadataFields
    });

    // add the metadata field to the manifest data object in the store
    this.props.dispatch(actions.addMetadataFieldAtPath(availableMetadataField.name, availableMetadataField.value, availableMetadataField.addPath));
  },
  deleteMetadataField: function(metadataFieldToDelete, index) {
    // create copies of the metadata field lists
    var availableMetadataFields = [...this.state.availableMetadataFields];
    var activeMetadataFields = [...this.state.activeMetadataFields];

    var numUnassignedMetadataFields = (metadataFieldToDelete.name === undefined) ? this.state.numUnassignedMetadataFields - 1 : this.state.numUnassignedMetadataFields;

    // append the metadata field to delete to the list of available fields
    if(metadataFieldToDelete.name !== undefined) {
      metadataFieldToDelete.value = undefined;
      availableMetadataFields.push(metadataFieldToDelete);
    }

    // delete the metadata field from the list of active fields
    activeMetadataFields.splice(index, 1);

    // update the metadata field lists in the state so that the component uses the correct values when rendering
    this.setState({
      numUnassignedMetadataFields: numUnassignedMetadataFields,
      availableMetadataFields: availableMetadataFields,
      activeMetadataFields: activeMetadataFields
    });

    // delete the metadata field to the manifest data object in the store
    if(metadataFieldToDelete.name !== undefined) {
      this.props.dispatch(actions.deleteMetadataFieldAtPath(metadataFieldToDelete.updatePath));
    }
  },
  render: function() {
    var image = this.state.selectedCanvas.getImages()[0];
    if(this.state.selectedCanvas !== null) {
      var _this = this;
      return (
        <div className="metadata-sidebar-panel">
          <ImageAnnotationChoiceDialog ref="imageAnnotationDialog" onSubmitHandler={this.handleImageAnnotationChoice} canvas={this.state.selectedCanvas} addOrReplace={image !== undefined ? 'replace' : 'add'} />
          <MetadataSidebarCanvas canvasId={this.props.selectedCanvasId}/>
          <div className="row">
            <div className="col-md-12">
              <button onClick={this.openImageAnnotationChoiceDialog} className="btn btn-default center-block add-replace-image-on-canvas-button"><i className={image !== undefined ? 'fa fa-refresh' : 'fa fa-plus-circle'}></i> {image !== undefined ? 'Replace Image on Canvas' : 'Add Image to Canvas'}</button>
            </div>
          </div>
          <hr/>
          {this.displayImageAnnotationFetchErrors()}
          {
            Object.keys(this.state.activeMetadataFields).map(function(fieldIndex) {
              var metadataField = _this.state.activeMetadataFields[fieldIndex];
              return (
                <dl key={fieldIndex}>
                  {(() => {
                    if(metadataField.name === undefined) {
                      return (
                        <dt className="metadata-field-label">
                          <FormSelect id={fieldIndex} options={_this.state.availableMetadataFields} placeholder="Choose field" selectedOption="" onChange={_this.updateMetadataFieldsWithSelectedOption}/>
                        </dt>
                      );
                    } else {
                      return (
                        <dt className="metadata-field-label">
                          {metadataField.label}
                        </dt>
                      );
                    }
                  })()}
                  {(() => {
                    if(metadataField.name === undefined) {
                      return (
                        <dd className="metadata-field-value">N/A</dd>
                      );
                    } else {
                      return (
                        <dd className="metadata-field-value">
                          <EditableTextArea fieldName={metadataField.name} fieldValue={metadataField.value} path={metadataField.updatePath} onUpdateHandler={metadataField.handler}/>
                        </dd>
                      );
                    }
                  })()}
                  {(() => {
                    if(!metadataField.isRequired) {
                      return (
                        <dd className="metadata-field-delete">
                          <a href="javascript:;" title={"Delete " + metadataField.label + " field"} onClick={() => _this.deleteMetadataField(metadataField, fieldIndex)}>
                            <span className="fa fa-times-circle"></span>
                          </a>
                        </dd>
                      );
                    }
                  })()}
                </dl>
              );
            })
          }
          {(() => {
            if(Object.keys(_this.state.availableMetadataFields).length != _this.state.numUnassignedMetadataFields) {
              return (
                <button type="button" className="btn btn-default add-metadata-field-button" title="Add metadata field" onClick={_this.addMetadataField}>
                  <span className="fa fa-plus"></span> Add metadata field
                </button>
              );
            }
          })()}
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
)(CanvasMetadataPanelPredefinedFields);