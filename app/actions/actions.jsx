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

export var setManifestFilename = (manifestFilenameToSave) => {
  return {
    type: 'SET_MANIFEST_FILE_NAME',
    manifestFilenameToSave
  }
};

export var setErrorMessage = (errorMessage) => {
  return {
    type: 'SET_ERROR_MESSAGE',
    errorMessage
  }
};

export var saveMetadataField = (fieldName, fieldValue) => {
  return {
    type: 'SAVE_METADATA_FIELD',
    fieldName,
    fieldValue
  }
};

export var setSelectedCanvasData = (selectedCanvasData) => {
  return {
    type: 'SET_SELECTED_CANVAS_DATA',
    selectedCanvasData
  }
};
