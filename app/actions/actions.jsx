export var startManifestFetch = (manifestType) => {
  return {
    type: 'START_MANIFEST_FETCH',
    manifestType
  };
};

export var completeManifestFetch = () => {
  return {
    type: 'COMPLETE_MANIFEST_FETCH',
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

export var updateMetadataFieldValueAtPath = (metadataFieldValue, path) => {
  return {
    type: 'UPDATE_METADATA_FIELD_VALUE_AT_PATH',
    metadataFieldValue,
    path
  }
};

export var addEmptyCanvasAtIndex = (emptyCanvas, canvasIndex) => {
  return {
    type: 'ADD_EMPTY_CANVAS_AT_INDEX',
    emptyCanvas,
    canvasIndex
  }
};

export var duplicateCanvasAtIndex = (canvasIndex) => {
  return {
    type: 'DUPLICATE_CANVAS_AT_INDEX',
    canvasIndex
  }
};

export var deleteCanvasAtIndex = (canvasIndex) => {
  return {
    type: 'DELETE_CANVAS_AT_INDEX',
    canvasIndex
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

export var setShowMetadataSidebar = (showMetadataSidebar) => {
  return {
    type: 'SET_SHOW_METADATA_SIDEBAR',
    showMetadataSidebar
  };
};

export var setError = (errorType, errorMessage) => {
  return {
    type: 'SET_ERROR',
    errorType,
    errorMessage
  }
};
