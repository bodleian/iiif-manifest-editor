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

export var addMetadataFieldAtPath = (metadataFieldName, metadataFieldValue, path) => {
  return {
    type: 'ADD_METADATA_FIELD_AT_PATH',
    metadataFieldName,
    metadataFieldValue,
    path
  }
};

export var addMetadataFieldToListAtPath = (metadataFieldObject, path) => {
  return {
    type: 'ADD_METADATA_FIELD_TO_LIST_AT_PATH',
    metadataFieldObject,
    path
  }
};

export var updateMetadataFieldNameAtPath = (oldMetadataFieldName, newMetadataFieldName, path) => {
  return {
    type: 'UPDATE_METADATA_FIELD_NAME_AT_PATH',
    oldMetadataFieldName,
    newMetadataFieldName,
    path
  }
};

export var updateMetadataFieldValueAtPath = (metadataFieldValue, path) => {
  return {
    type: 'UPDATE_METADATA_FIELD_VALUE_AT_PATH',
    metadataFieldValue,
    path
  }
};

export var deleteMetadataFieldAtPath = (path) => {
  return {
    type: 'DELETE_METADATA_FIELD_AT_PATH',
    path
  }
};

export var deleteMetadataFieldFromListAtPathAndIndex = (path, fieldIndex) => {
  return {
    type: 'DELETE_METADATA_FIELD_FROM_LIST_AT_PATH_AND_INDEX',
    path,
    fieldIndex
  }
};

export var addEmptyCanvasAtIndex = (emptyCanvas, canvasIndex) => {
  return {
    type: 'ADD_EMPTY_CANVAS_AT_INDEX',
    emptyCanvas,
    canvasIndex
  }
};

export var addCanvasAtIndex = (canvas, canvasIndex) => {
  return {
    type: 'ADD_CANVAS_AT_INDEX',
    canvas,
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

export var reorderCanvases = (updatedSortOrder) => {
  return {
    type: 'REORDER_CANVASES',
    updatedSortOrder
  }
};

export var reverseSequence = () => {
  return {
    type: 'REVERSE_SEQUENCE'
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

export var addImageAnnotationToCanvas = (imageAnnotation, canvasIndex) => {
  return {
    type: 'ADD_IMAGE_ANNOTATION_TO_CANVAS',
    imageAnnotation,
    canvasIndex
  };
};

export var setShowMetadataSidebar = (showMetadataSidebar) => {
  return {
    type: 'SET_SHOW_METADATA_SIDEBAR',
    showMetadataSidebar
  };
};

export var renameCanvasLabelsByPagination = (canvasIndexOffset) => {
  return {
    type: 'RENAME_CANVAS_LABELS_BY_PAGINATION',
    canvasIndexOffset
  };
};

export var renameCanvasLabelsByFoliation = (canvasIndexOffset, startWithFoliationSide) => {
  return {
    type: 'RENAME_CANVAS_LABELS_BY_FOLIATION',
    canvasIndexOffset,
    startWithFoliationSide
  };
};

export var setError = (errorType, errorMessage) => {
  return {
    type: 'SET_ERROR',
    errorType,
    errorMessage
  }
};

export var resetError = () => {
  return {
    type: 'RESET_ERROR'
  }
};
