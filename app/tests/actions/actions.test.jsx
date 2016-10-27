var expect = require('expect');
var actions = require('actions');

describe('Actions', () => {
  it('should start fetching a local manifest', () => {
    var action = {
      type: 'START_MANIFEST_FETCH',
      manifestType: 'MANIFEST_TYPE_LOCAL'
    }
    var res = actions.startManifestFetch(action.manifestType);
    expect(res).toEqual(action);
  });

  it('should start fetching a remote manifest', () => {
    var action = {
      type: 'START_MANIFEST_FETCH',
      manifestType: 'MANIFEST_TYPE_REMOTE'
    }
    var res = actions.startManifestFetch(action.manifestType);
    expect(res).toEqual(action);
  });

  it('should complete fetching a manifest', () => {
    var action = {
      type: 'COMPLETE_MANIFEST_FETCH'
    }
    var res = actions.completeManifestFetch();
    expect(res).toEqual(action);
  });

  it('should set the manifesto object', () => {
    var action = {
      type: 'SET_MANIFESTO_OBJECT',
      manifestoObject: {
        id: 'manifest id'
      }
    }
    var res = actions.setManifestoObject(action.manifestoObject);
    expect(res).toEqual(action);
  });

  it('should set the manifest data', () => {
    var action = {
      type: 'SET_MANIFEST_DATA',
      manifestData: {
        '@id': 'manifest id',
        '@type': 'type of manifest'
      }
    }
    var res = actions.setManifestData(action.manifestData);
    expect(res).toEqual(action);
  });

  it('should set the manifest filename to save', () => {
    var action = {
      type: 'SET_MANIFEST_FILE_NAME',
      manifestFilenameToSave: 'manifest filename to save'
    }
    var res = actions.setManifestFilename(action.manifestFilenameToSave);
    expect(res).toEqual(action);
  });

  it('should add the metadata field name and field value at the path', () => {
    var action = {
      type: 'ADD_METADATA_FIELD_AT_PATH',
      metadataFieldName: 'metadata field name',
      metadataFieldValue: 'metadata field value',
      path: 'path to metadata field'
    }
    var res = actions.addMetadataFieldAtPath(action.metadataFieldName, action.metadataFieldValue, action.path);
    expect(res).toEqual(action);
  });

  it('should add the metadata field object in the metadata field at the path', () => {
    var action = {
      type: 'ADD_METADATA_FIELD_TO_LIST_AT_PATH',
      metadataFieldObject: { label: "Label", value: "Value" },
      path: 'path to metadata field'
    }
    var res = actions.addMetadataFieldToListAtPath(action.metadataFieldObject, action.path);
    expect(res).toEqual(action);
  });

  it('should update the metadata field name at the path', () => {
    var action = {
      type: 'UPDATE_METADATA_FIELD_NAME_AT_PATH',
      oldMetadataFieldName: 'old metadata field name',
      newMetadataFieldName: 'new metadata field name',
      path: 'path to metadata field'
    }
    var res = actions.updateMetadataFieldNameAtPath(action.oldMetadataFieldName, action.newMetadataFieldName, action.path);
    expect(res).toEqual(action);
  });

  it('should update the metadata field value at the path', () => {
    var action = {
      type: 'UPDATE_METADATA_FIELD_VALUE_AT_PATH',
      metadataFieldValue: 'metadata field value',
      path: 'path to metadata field'
    }
    var res = actions.updateMetadataFieldValueAtPath(action.metadataFieldValue, action.path);
    expect(res).toEqual(action);
  });

  it('should delete the metadata field at the path', () => {
    var action = {
      type: 'DELETE_METADATA_FIELD_AT_PATH',
      path: 'path to metadata field'
    }
    var res = actions.deleteMetadataFieldAtPath(action.path);
    expect(res).toEqual(action);
  });

  it('should delete the metadata field object from the metadata field list at the path and index', () => {
    var action = {
      type: 'DELETE_METADATA_FIELD_FROM_LIST_AT_PATH_AND_INDEX',
      path: 'path to metadata field',
      fieldIndex: 0
    }
    var res = actions.deleteMetadataFieldFromListAtPathAndIndex(action.path, action.fieldIndex);
    expect(res).toEqual(action);
  });

  it('should add an empty canvas at the index', () => {
    var action = {
      type: 'ADD_EMPTY_CANVAS_AT_INDEX',
      emptyCanvas: {
        "@id": "empty canvas id",
        "@type": "type of empty canvas",
        "label": "empty canvas",
        "height": 0,
        "width": 0,
        "images": []
      },
      canvasIndex: 0
    }
    var res = actions.addEmptyCanvasAtIndex(action.emptyCanvas, action.canvasIndex);
    expect(res).toEqual(action);
  });

  it('should add a canvas at the index', () => {
    var action = {
      type: 'ADD_CANVAS_AT_INDEX',
      canvas: {
        "@id": "canvas id",
        "@type": "type of canvas",
        "label": "random canvas",
        "height": 0,
        "width": 0,
        "images": [
          {
            "@id": "image id",
            "@type": "type of image",
            "motivation": "image motivation",
            "on": "image on canvas",
            "resource": {
              "@id": "resource id",
              "@type": "type of resource",
              "format": "format of resource",
              "height": 0,
              "width": 0,
              "service": {
                "@context": "http://iiif.io/api/image/2/context.json",
                "@id": "resource id",
                "profile": "http://iiif.io/api/image/2/level2.json"
              }
            }
          }
        ]
      },
      canvasIndex: 0
    }
    var res = actions.addCanvasAtIndex(action.canvas, action.canvasIndex);
    expect(res).toEqual(action);
  });

  it('should duplicate canvas at the index', () => {
    var action = {
      type: 'DUPLICATE_CANVAS_AT_INDEX',
      canvasIndex: 1
    }
    var res = actions.duplicateCanvasAtIndex(action.canvasIndex);
    expect(res).toEqual(action);
  });

  it('should delete canvas at the index', () => {
    var action = {
      type: 'DELETE_CANVAS_AT_INDEX',
      canvasIndex: 2
    }
    var res = actions.deleteCanvasAtIndex(action.canvasIndex);
    expect(res).toEqual(action);
  });

  it('should set the selected canvas id', () => {
    var action = {
      type: 'SET_SELECTED_CANVAS_ID',
      selectedCanvasId: 3
    }
    var res = actions.setSelectedCanvasId(action.selectedCanvasId);
    expect(res).toEqual(action);
  });

  it('should reorder the canvases', () => {
    var action = {
      type: 'REORDER_CANVASES',
      updatedSortOrder: [3, 1, 2]
    }
    var res = actions.reorderCanvases(action.updatedSortOrder);
    expect(res).toEqual(action);
  });

  it('should start fetching an image annotation', () => {
    var action = {
      type: 'START_IMAGE_ANNOTATION_FETCH'
    }
    var res = actions.startImageAnnotationFetch();
    expect(res).toEqual(action);
  });

  it('should complete fetching an image annotation', () => {
    var action = {
      type: 'COMPLETE_IMAGE_ANNOTATION_FETCH'
    }
    var res = actions.completeImageAnnotationFetch();
    expect(res).toEqual(action);
  });

  it('should set the flag to show the metadata sidebar', () => {
    var action = {
      type: 'SET_SHOW_METADATA_SIDEBAR',
      showMetadataSidebar: true
    }
    var res = actions.setShowMetadataSidebar(action.showMetadataSidebar);
    expect(res).toEqual(action);
  });

  it('should rename canvas labels using a pagination scheme starting from the canvas index', () => {
    var action = {
      type: 'RENAME_CANVAS_LABELS_BY_PAGINATION',
      canvasIndexOffset: 0
    }
    var res = actions.renameCanvasLabelsByPagination(action.canvasIndexOffset);
    expect(res).toEqual(action);
  });

  it('should rename canvas labels using a foliation scheme starting from the canvas index offset and foliation side', () => {
    var action = {
      type: 'RENAME_CANVAS_LABELS_BY_FOLIATION',
      canvasIndexOffset: 0,
      startWithFoliationSide: 'recto'
    }
    var res = actions.renameCanvasLabelsByFoliation(action.canvasIndexOffset, action.startWithFoliationSide);
    expect(res).toEqual(action);
  });

  it('should set the error type and error message', () => {
    var action = {
      type: 'SET_ERROR',
      errorType: 'error type',
      errorMessage: 'error message'
    }
    var res = actions.setError(action.errorType, action.errorMessage);
    expect(res).toEqual(action);
  });

  it('should reset the error', () => {
    var action = {
      type: 'RESET_ERROR'
    }
    var res = actions.resetError();
    expect(res).toEqual(action);
  });
});