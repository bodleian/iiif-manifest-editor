
var stateDefaults = {
  isFetching: false,
  url: undefined,
  manifestData: undefined,
  errorMessage: undefined,
  fieldName: undefined,
  fieldValue: undefined
}

export var manifestReducer = (state = stateDefaults, action) => {
  switch (action.type) {
    case 'START_MANIFEST_FETCH':
      return {
        isFetching: true,
        url: undefined,
        manifestData: undefined,
        errorMessage: undefined
      };
    case 'COMPLETE_MANIFEST_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    case 'SET_MANIFEST_DATA':
      return {
        manifestData: action.manifestData
      };
    case 'SET_ERROR_MESSAGE':
      return {
        errorMessage: action.errorMessage
      };
    case 'SAVE_METADATA_FIELD':
      switch(action.fieldName) {
        case 'label':
          state.manifestData.data.label = action.fieldValue;
          break;
        case 'attribution':
          state.manifestData.data.attribution = action.fieldValue;
          break;
        case 'description':
          state.manifestData.data.description[1]['@value'] = action.fieldValue;
          break;
        case 'license':
          state.manifestData.data.license = action.fieldValue;
          break;
        default:
          break;
      }
      return {
        manifestData: state.manifestData
      };
    default:
      return state;
  }
};
