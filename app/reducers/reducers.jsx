
var stateDefaults = {
  isFetching: false,
  url: undefined,
  manifestData: undefined,
  manifestFilenameToSave: 'manifest.json',
  errorMessage: undefined,
  fieldName: undefined,
  fieldValue: undefined
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
    case 'SAVE_METADATA_FIELD':
      var updatedManifestData = {
        ...state.manifestData
      };
      updatedManifestData[action.fieldName] = action.fieldValue;
      return {
        ...state,
        manifestData: updatedManifestData
      };
    default:
      return state;
  }
};
