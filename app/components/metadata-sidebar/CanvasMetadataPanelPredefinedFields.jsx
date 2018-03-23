var React = require('react');
var ReactDOM = require('react-dom');
var { connect } = require('react-redux');
var actions = require('actions');
var axios = require('axios');
var deepcopy = require('deepcopy');
var EmptyMetadataPropertyCard = require('EmptyMetadataPropertyCard');
var EditablePrimitiveMetadataPropertyCard = require('EditablePrimitiveMetadataPropertyCard');
var EditableObjectMetadataPropertyCard = require('EditableObjectMetadataPropertyCard');
var MetadataSidebarCanvas = require('MetadataSidebarCanvas');
var ImageAnnotationChoiceDialog = require('ImageAnnotationChoiceDialog');
var uuid = require('uuid');
var Utils = require('Utils');

var CanvasMetadataPanelPredefinedFields = React.createClass({
  getInitialState: function() {
    return {
      selectedCanvas: this.getSelectedCanvas(this.props.selectedCanvasId),
      metadataFields: this.getMetadataFieldsForCanvas(this.props.selectedCanvasId)
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(this.props.selectedCanvasId !== nextProps.selectedCanvasId) {
      this.setState({
        selectedCanvas: this.getSelectedCanvas(nextProps.selectedCanvasId),
        metadataFields: this.getMetadataFieldsForCanvas(nextProps.selectedCanvasId)
      });
    }
  },

  getMetadataFieldByName: function(metadataFields, fieldName) {
    for(var fieldIndex = 0; fieldIndex < metadataFields.length; fieldIndex++) {
      var metadataField = metadataFields[fieldIndex];
      if(metadataField.name === fieldName) {
        return metadataField;
      }
    }
    return undefined;
  },

  getMetadataFieldIndexByFieldName: function(metadataFields, fieldName) {
    var metadataFieldIndex = -1;
    for(var fieldIndex = 0; fieldIndex < metadataFields.length; fieldIndex++) {
      var metadataField = metadataFields[fieldIndex];
      if(metadataField.name === fieldName) {
        metadataFieldIndex = fieldIndex;
        break;
      }
    }
    return metadataFieldIndex;
  },

  getSelectedCanvas: function(canvasId) {
    var manifest = this.props.manifestoObject;
    var sequence = manifest.getSequenceByIndex(0);
    var canvas = sequence.getCanvasById(canvasId);
    return canvas;
  },

  getMetadataFieldsForCanvas: function(canvasId) {
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
        isMultiValued: false,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/label',
        handler: this.saveMetadataFieldToStore
      },
      {
        name: 'width',
        label: 'Canvas Width',
        value: canvas.getWidth().toString(),
        isRequired: true,
        isMultiValued: false,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/width',
        handler: this.saveMetadataFieldToStore
      },
      {
        name: 'height',
        label: 'Canvas Height',
        value: canvas.getHeight().toString(),
        isRequired: true,
        isMultiValued: false,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/height',
        handler: this.saveMetadataFieldToStore
      },
      {
        name: 'image_uri',
        label: 'Image URI',
        value: resource !== undefined ? resource['@id'] : 'N/A',
        isRequired: true,
        isMultiValued: false,
        addPath: canvasPathPrefix,
        updatePath: '',
        handler: this.handleImageUri
      },
      {
        name: 'image_annotation_uri',
        label: 'Image Annotation URI',
        value: image !== undefined ? image.id : 'N/A',
        isRequired: true,
        isMultiValued: false,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/images/0',
        handler: this.updateImageAnnotationForCanvasWithId
      },
      {
        name: 'related',
        label: 'Related',
        value: canvas.__jsonld.related,
        isRequired: false,
        isMultiValued: true,
        addPath: canvasPathPrefix,
        updatePath: canvasPathPrefix + '/related',
        propertyValueTemplate: { '@id': undefined, label: undefined, format: undefined },
        handler: this.saveMetadataFieldToStore
      }
    ];
  },

  saveMetadataFieldToStore: function(fieldValue, path) {
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
    // create a copy of the metadata field list
    var metadataFields = [...this.state.metadataFields];

    // append an empty stub metadata record to the metadata list
    if(metadataFields.length > 0) {
      var stubMetadataRecord = {
        // TODO: update list of properties that apply to the canvas
        name: undefined,
        label: undefined,
        value: undefined,
        isRequired: undefined,
        isMultiValued: undefined,
        addPath: undefined,
        updatePath: undefined,
        propertyValueTemplate: undefined
      };
      metadataFields.push(stubMetadataRecord);

      // update the metadata field list in the state
      this.setState({
        metadataFields: metadataFields
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

  updateMetadataFieldWithSelectedOption: function(selectedOptionObject) {
    // update the property value in the metadata list
    var metadataFields = [...this.state.metadataFields];

    // find the existing field by name
    var activeMetadataField = this.getMetadataFieldByName(metadataFields, selectedOptionObject.name);

    // set the default value of the property value based on whether the field is multi-valued
    var defaultFieldValue = '';
    if(activeMetadataField.propertyValueTemplate !== undefined) {
      // Note: The following code assumes that the 'propertyValueTemplate' is set for multi-valued fields.
      defaultFieldValue = deepcopy(activeMetadataField.propertyValueTemplate);
    }

    // add a new property with a default value if one doesn't already exist
    var newMetadataFieldValue = Utils.addMetadataFieldValue(activeMetadataField.value, defaultFieldValue);
    activeMetadataField.value = newMetadataFieldValue;

    // delete the empty stub metadata record
    var stubRecordFieldIndex = this.getMetadataFieldIndexByFieldName(metadataFields, undefined);
    metadataFields.splice(stubRecordFieldIndex, 1);

    // save the updated metadata list to the state so the component re-renders
    this.setState({ metadataFields: metadataFields });

    // update the property value in the store
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(activeMetadataField.value, activeMetadataField.updatePath));
  },

  updateMetadataPropertyValue: function(propertyIndex, updatePath, propertyName, propertyValue) {
    // update the property value in the metadata list
    var metadataFields = [...this.state.metadataFields];

    // find the existing field by name
    var activeMetadataField = this.getMetadataFieldByName(metadataFields, propertyName);

    // update the existing property with the given value if one already exists
    var newMetadataPropertyValue = Utils.updateMetadataFieldValue(activeMetadataField.value, propertyValue, propertyIndex);
    activeMetadataField.value = newMetadataPropertyValue;

    // save the updated metadata list to the state so the component re-renders
    this.setState({ metadataFields: metadataFields });

    // update the property value in the store
    this.props.dispatch(actions.updateMetadataFieldValueAtPath(activeMetadataField.value, activeMetadataField.updatePath));
  },

  updateMetadataPropertyObjectValue: function(fieldIndex, updatePath, propertyIndex, propertyName, propertyValue) {
    if(propertyName !== undefined) {
      // update the value in the metadata field
      var metadataFields = [...this.state.metadataFields];
      if(propertyIndex !== -1) {
        metadataFields[fieldIndex].value[propertyIndex][propertyName] = propertyValue;
      } else {
        metadataFields[fieldIndex].value[propertyName] = propertyValue;
      }
      this.setState({
        metadataFields: metadataFields
      });

      // update the metadata field value to the manifest data object in the store
      var propertyUpdatePath = (propertyIndex !== -1)
        ? updatePath + '/' + propertyIndex + '/' + propertyName
        : updatePath + '/' + propertyName;
      this.props.dispatch(actions.updateMetadataFieldValueAtPath(propertyValue, propertyUpdatePath));
    }
  },

  deleteMetadataProperty: function(fieldIndex, updatePath, propertyIndex, propertyName) {
    if(propertyName === undefined) {
      // delete the empty stub metadata record
      var metadataFields = [...this.state.metadataFields];
      metadataFields.splice(fieldIndex, 1);
      this.setState({ metadataFields: metadataFields });
    } else {
      // reset the value of the metadata property
      var metadataFields = [...this.state.metadataFields];
      if(propertyIndex !== -1) {
        metadataFields[fieldIndex].value[propertyIndex] = undefined;
      } else {
        metadataFields[fieldIndex].value = undefined;
      }
      this.setState({ metadataFields: metadataFields });

      // delete the metadata property from the manifest data object in the store
      if(propertyIndex !== -1) {
        var propertyUpdatePath = updatePath + '/' + propertyIndex;
        this.props.dispatch(actions.deleteMetadataFieldFromListAtPathAndIndex(updatePath, propertyIndex));
      } else {
        this.props.dispatch(actions.deleteMetadataFieldAtPath(updatePath));
      }
    }
  },

  render: function() {
    // get the list of available metadata properties that can be added
    var availablePropertiesToAdd = this.state.metadataFields.filter(function(field) {
      return field.name !== undefined && (field.value === undefined || field.isMultiValued);
    });

    var image = this.state.selectedCanvas.getImages()[0];
    if(this.state.selectedCanvas !== null) {
      var _this = this;
      return (
        <div className="metadata-sidebar-panel">

          <ImageAnnotationChoiceDialog ref="imageAnnotationDialog" onSubmitHandler={this.handleImageAnnotationChoice} canvas={this.state.selectedCanvas} addOrReplace={image !== undefined ? 'replace' : 'add'} />
          <MetadataSidebarCanvas canvasId={this.props.selectedCanvasId}/>
          <div className="row">
            <div className="col-md-12">
              <button onClick={this.openImageAnnotationChoiceDialog} className="btn btn-default center-block add-replace-image-on-canvas-button">
                <i className={image !== undefined ? 'fa fa-refresh' : 'fa fa-plus-circle'}></i> {image !== undefined ? 'Replace Image on Canvas' : 'Add Image to Canvas'}
              </button>
            </div>
          </div>

          <hr/>

          {this.displayImageAnnotationFetchErrors()}

          {
            this.state.metadataFields.map((metadataField, fieldIndex) => {
              if(metadataField.name === undefined) {
                return (
                  <EmptyMetadataPropertyCard
                    key={fieldIndex}
                    labelOptions={availablePropertiesToAdd}
                    updateLabelHandler={_this.updateMetadataFieldWithSelectedOption}
                    deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, -1, metadataField.name)}
                  />
                );
              } else if(metadataField.value !== undefined) {
                if(Array.isArray(metadataField.value)) {
                  return metadataField.value.map((propertyValue, propertyIndex) => {
                    if(propertyValue instanceof Object) {
                      return (
                        <EditableObjectMetadataPropertyCard
                          key={fieldIndex + '-' + propertyIndex}
                          name={metadataField.name}
                          label={metadataField.label}
                          value={propertyValue}
                          isRequired={metadataField.isRequired}
                          isMultiLingual={metadataField.isMultiLingual}
                          updateValueHandler={_this.updateMetadataPropertyObjectValue.bind(this, fieldIndex, metadataField.updatePath, propertyIndex)}
                          deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, propertyIndex, metadataField.name)}
                        />
                      );
                    }
                    else if(Array.isArray(propertyValue)) {
                      // arrays of arrays are not supported
                    }
                    else {
                      return (
                        <EditablePrimitiveMetadataPropertyCard
                          key={fieldIndex + '-' + propertyIndex}
                          name={metadataField.name}
                          label={metadataField.label}
                          value={propertyValue}
                          isRequired={metadataField.isRequired}
                          updateValueHandler={_this.updateMetadataPropertyValue.bind(this, fieldIndex, metadataField.updatePath)}
                          deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, propertyIndex, metadataField.name)}
                        />
                      );
                    }
                  });
                }
                else if(metadataField.value instanceof Object) {
                  return (
                    <EditableObjectMetadataPropertyCard
                      key={fieldIndex}
                      name={metadataField.name}
                      label={metadataField.label}
                      value={metadataField.value}
                      isRequired={metadataField.isRequired}
                      isMultiLingual={metadataField.isMultiLingual}
                      updateValueHandler={_this.updateMetadataPropertyObjectValue.bind(this, fieldIndex, metadataField.updatePath, -1)}
                      deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, -1, metadataField.name)}
                    />
                  );
                }
                else {
                  return (
                    <EditablePrimitiveMetadataPropertyCard
                      key={fieldIndex}
                      name={metadataField.name}
                      label={metadataField.label}
                      value={metadataField.value}
                      isRequired={metadataField.isRequired}
                      updateValueHandler={_this.updateMetadataPropertyValue.bind(this, fieldIndex, metadataField.updatePath)}
                      deleteHandler={_this.deleteMetadataProperty.bind(this, fieldIndex, metadataField.updatePath, -1, metadataField.name)}
                    />
                  );
                }
              }
            })
          }
          {(() => {
            if(Object.keys(availablePropertiesToAdd).length > 0) {
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