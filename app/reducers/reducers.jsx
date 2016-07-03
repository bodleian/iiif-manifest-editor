
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
      console.log('State from the reducer: ', state);
      return Object.assign({}, state, {
        manifestFilenameToSave: action.manifestFilenameToSave
      });
    case 'SET_ERROR_MESSAGE':
      return Object.assign({}, state, {
        errorMessage: action.errorMessage
      });
    case 'SAVE_METADATA_FIELD':
      switch(action.fieldName) {
        case 'label':
          state.manifestData.label = action.fieldValue;
          break;
        case 'attribution':
          state.manifestData.attribution = action.fieldValue;
          break;
        case 'description':
          state.manifestData.description[1]['@value'] = action.fieldValue;
          break;
        case 'license':
          state.manifestData.license = action.fieldValue;
          break;
        default:
          break;
      }
      return Object.assign({}, state, {
        manifestData: state.manifestData
      });
    default:
      return state;
  }
};
