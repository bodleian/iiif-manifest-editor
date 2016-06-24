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
