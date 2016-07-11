var manifesto = require('manifesto.js');

var stateDefaults = {
  isFetchingLocalManifest: false,
  isFetchingRemoteManifest: false,
  isFetchingImageAnnotation: false,
  manifestData: undefined,
  manifestoObject: undefined,
  manifestFilenameToSave: 'manifest.json',
  metadataFieldValue: undefined,
  selectedCanvasId: undefined,
  error: undefined
}

export var manifestReducer = (state = stateDefaults, action) => {
  switch (action.type) {
    case 'START_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetchingLocalManifest: action.manifestType === 'MANIFEST_TYPE_LOCAL',
        isFetchingRemoteManifest: action.manifestType === 'MANIFEST_TYPE_REMOTE',
        error: undefined
      });
    case 'COMPLETE_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetchingLocalManifest: false,
        isFetchingRemoteManifest: false
      });
    case 'SET_MANIFESTO_OBJECT':
      return Object.assign({}, state, {
        manifestoObject: action.manifestoObject
      });
    case 'SET_MANIFEST_DATA':
      return Object.assign({}, state, {
        manifestData: action.manifestData
      });
    case 'SET_MANIFEST_FILE_NAME':
      return Object.assign({}, state, {
        manifestFilenameToSave: action.manifestFilenameToSave
      });
    case 'UPDATE_METADATA_FIELD_VALUE_AT_PATH':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };
      // update the metadata field at the given path
      var object = updatedManifestData;
      var stack = action.path.split('/');
      while(stack.length > 1) {
        object = object[stack.shift()];
      }
      object[stack.shift()] = action.metadataFieldValue;

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'DELETE_CANVAS_BY_INDEX':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // delete the canvas at the given index from the first sequence
      updatedManifestData.sequences[0].canvases.splice(action.canvasIndex, 1);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'SET_SELECTED_CANVAS_ID':
      return Object.assign({}, state, {
        ...state,
        selectedCanvasId: action.selectedCanvasId,
        error: undefined
      });
    case 'START_IMAGE_ANNOTATION_FETCH':
      return Object.assign({}, state, {
        isFetchingImageAnnotation: true,
        error: undefined
      });
    case 'COMPLETE_IMAGE_ANNOTATION_FETCH':
      return Object.assign({}, state, {
        isFetchingImageAnnotation: false
      });
    case 'SET_ERROR':
      return Object.assign({}, state, {
        error: { type: action.errorType, message: action.errorMessage }
      });
    default:
      return state;
  }
};
