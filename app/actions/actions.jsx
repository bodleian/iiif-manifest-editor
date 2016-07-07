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

export var setManifestoObject = (manifestoObject) => {
  return {
    type: 'SET_MANIFESTO_OBJECT',
    manifestoObject
  }
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

export var updateMetadataFieldValueAtPath = (fieldValue, path) => {
  return {
    type: 'UPDATE_METADATA_FIELD_VALUE_AT_PATH',
    fieldValue,
    path
  }
};

export var setSelectedCanvasId = (selectedCanvasId) => {
  return {
    type: 'SET_SELECTED_CANVAS_ID',
    selectedCanvasId
  }
};

export var startImageAnnotationFetch = () => {
  return {
    type: 'START_IMAGE_ANNOTATION_FETCH'
  };
};

export var completeImageAnnotationFetch = () => {
  return {
    type: 'COMPLETE_IMAGE_ANNOTATION_FETCH'
  };
};
