
var stateDefaults = {
  isFetching: false,
  url: undefined,
  manifestData: undefined,
  didFailOnUploadingLocalManifest: false,
  didFailOnFetchingRemoteManifest: false
}

export var manifestReducer = (state = stateDefaults, action) => {
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
        didFailOnFetchingRemoteManifest: true,
        url: undefined,
        manifestData: undefined
      };
    case 'SET_UPLOAD_LOCAL_MANIFEST_ERROR':
      return {
        didFailOnUploadingLocalManifest: true,
        url: undefined,
        manifestData: undefined
      };
    default:
      return state;
  }
};
