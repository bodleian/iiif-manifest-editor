
var stateDefaults = {
  isFetching: false,
  url: undefined,
  manifestData: undefined,
  errorMessage: undefined
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
    default:
      return state;
  }
};
