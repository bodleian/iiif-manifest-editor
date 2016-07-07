var manifesto = require('manifesto.js');

var stateDefaults = {
  isFetching: false,
  url: undefined,
  manifestData: undefined,
  manifestoObject: undefined,
  manifestFilenameToSave: 'manifest.json',
  errorMessage: undefined,
  fieldName: undefined,
  fieldValue: undefined,
  selectedCanvasData: undefined
  selectedCanvasId: undefined
}

export var manifestReducer = (state = stateDefaults, action) => {
  switch (action.type) {
    case 'START_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetching: true,
        url: undefined,
        manifestoObject: undefined,
        manifestData: undefined,
        errorMessage: undefined
      });
    case 'COMPLETE_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetching: false,
        url: action.url
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
    case 'SET_ERROR_MESSAGE':
      return Object.assign({}, state, {
        errorMessage: action.errorMessage
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
      object[stack.shift()] = action.fieldValue;

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'SET_SELECTED_CANVAS_ID':
      return {
        ...state,
        selectedCanvasId: action.selectedCanvasId
      }
    case 'START_IMAGE_ANNOTATION_FETCH':
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: undefined
      });
    case 'COMPLETE_IMAGE_ANNOTATION_FETCH':
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
};
