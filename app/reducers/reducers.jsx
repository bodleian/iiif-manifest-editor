
var stateDefaults = {
  isFetching: false,
  url: undefined,
  manifestData: undefined,
  manifestFilenameToSave: 'manifest.json',
  errorMessage: undefined,
  fieldName: undefined,
  fieldValue: undefined,
  selectedCanvasData: undefined
}

export var manifestReducer = (state = stateDefaults, action) => {
  switch (action.type) {
    case 'START_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetching: true,
        url: undefined,
        manifestData: undefined,
        errorMessage: undefined
      });
    case 'COMPLETE_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetching: false,
        url: action.url
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
      var updatedManifestData = {
        ...state.manifestData
      };

      var object = updatedManifestData;
      var stack = action.path.split('/');
      while(stack.length > 1) {
        object = object[stack.shift()];
      }
      object[stack.shift()] = action.fieldValue;

      return {
        ...state,
        manifestData: updatedManifestData
      };
    case 'SET_SELECTED_CANVAS_DATA':
      return {
        ...state,
        selectedCanvasData: action.selectedCanvasData
      }
    default:
      return state;
  }
};
