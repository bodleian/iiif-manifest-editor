export var startManifestFetch = () => {
  return {
    type: 'START_MANIFEST_FETCH'
  };
};

export var completeManifestFetch = (url) => {
  return {
    type: 'COMPLETE_MANIFEST_FETCH',
    url
  };
};

export var setManifestData = (manifestData) => {
  return {
    type: 'SET_MANIFEST_DATA',
    manifestData
  }
};

export var setUploadLocalManifestError = () => {
  return {
    type: 'SET_UPLOAD_LOCAL_MANIFEST_ERROR'
  }
};

export var setLoadRemoteManifestError = () => {
  return {
    type: 'SET_LOAD_REMOTE_MANIFEST_ERROR'
  }
};
