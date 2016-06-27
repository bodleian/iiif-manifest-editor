export var manifestReducer = (state = {isFetching: false, url: undefined, manifestData: undefined, fetchRemoteManifestError: false}, action) => {
  switch (action.type) {
    case 'START_MANIFEST_FETCH':
      return {
        isFetching: true,
        url: undefined,
        manifestData: undefined
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
    case 'SET_LOAD_REMOTE_MANIFEST_ERROR':
      return {
        fetchRemoteManifestError: true,
        url: undefined,
        manifestData: undefined
      }
    default:
      return state;
  }
};
