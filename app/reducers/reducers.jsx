var manifesto = require('manifesto.js');
var uuid = require('node-uuid');
var deepcopy = require('deepcopy');

var stateDefaults = {
  isFetchingLocalManifest: false,
  isFetchingRemoteManifest: false,
  isFetchingImageAnnotation: false,
  manifestData: undefined,
  manifestoObject: undefined,
  manifestFilenameToSave: 'manifest.json',
  metadataFieldValue: undefined,
  selectedCanvasId: undefined,
  error: undefined,
  showMetadataSidebar: true
}

export var manifestReducer = (state = stateDefaults, action) => {
  switch (action.type) {
    case 'START_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetchingLocalManifest: action.manifestType === 'MANIFEST_TYPE_LOCAL',
        isFetchingRemoteManifest: action.manifestType === 'MANIFEST_TYPE_REMOTE',
        error: undefined
      });
    case 'COMPLETE_MANIFEST_FETCH':
      return Object.assign({}, state, {
        isFetchingLocalManifest: false,
        isFetchingRemoteManifest: false
      });
    case 'SET_MANIFESTO_OBJECT':
      return Object.assign({}, state, {
        manifestoObject: action.manifestoObject
      });
    case 'SET_MANIFEST_DATA':
      return Object.assign({}, state, {
        manifestData: action.manifestData
      });
    case 'SET_MANIFEST_FILE_NAME':
      return Object.assign({}, state, {
        manifestFilenameToSave: action.manifestFilenameToSave
      });
    case 'ADD_METADATA_FIELD_AT_PATH':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // add the metadata field at the given path; when no path is provided, the metadata field will be added at the top-level
      var object = updatedManifestData;
      if(action.path) {
        var stack = action.path.split('/');
        while(stack.length > 0) {
          object = object[stack.shift()];
        }
      }
      object[action.metadataFieldName] = action.metadataFieldValue;

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'UPDATE_METADATA_FIELD_NAME_AT_PATH':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // create the new metadata field and delete the old metadata field at the given path
      var object = updatedManifestData;
      if(action.path) {
        var stack = action.path.split('/');
        while(stack.length > 0) {
          object = object[stack.shift()];
        }
      }
      object[action.newMetadataFieldName] = object[action.oldMetadataFieldName];
      delete object[action.oldMetadataFieldName];

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'UPDATE_METADATA_FIELD_VALUE_AT_PATH':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // update the metadata field at the given path
      var object = updatedManifestData;
      var stack = action.path.split('/');
      while(stack.length > 1) {
        object = object[stack.shift()];
      }
      object[stack.shift()] = action.metadataFieldValue;

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'DELETE_METADATA_FIELD_AT_PATH':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // delete the metadata field at the given path
      var object = updatedManifestData;
      var stack = action.path.split('/');
      while(stack.length > 1) {
        object = object[stack.shift()];
      }
      delete object[stack.shift()];

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'DELETE_CUSTOM_METADATA_FIELD_AT_INDEX':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // delete the custom metadata field at the given index
      updatedManifestData.metadata.splice(action.fieldIndex, 1);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'ADD_EMPTY_CANVAS_AT_INDEX':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // insert the empty canvas at the given index in the sequence
      updatedManifestData.sequences[0].canvases.splice(action.canvasIndex, 0, action.emptyCanvas);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'ADD_CANVAS_AT_INDEX':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };
      
      // Check if canvas ID already exists and if yes, create a new ID
      for (var canvasIndex = 0; canvasIndex < updatedManifestData.sequences[0].canvases.length; canvasIndex++) {
        var canvas = updatedManifestData.sequences[0].canvases[canvasIndex];
        if(canvas['@id'] === action.canvas['@id']) {
          action.canvas['@id'] = uuid();
          break;
        }
      };
      
      // insert the empty canvas at the given index in the sequence
      updatedManifestData.sequences[0].canvases.splice(action.canvasIndex, 0, action.canvas);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'DUPLICATE_CANVAS_AT_INDEX':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // make a copy of the canvas to duplicate
      var duplicatedCanvas = deepcopy(state.manifestData.sequences[0].canvases[action.canvasIndex]);

      // update fields in the duplicated canvas object that need to be modified
      duplicatedCanvas['@id'] = "http://" + uuid();

      // insert the new canvas record to the right of the current canvas
      updatedManifestData.sequences[0].canvases.splice(action.canvasIndex + 1, 0, duplicatedCanvas);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'DELETE_CANVAS_AT_INDEX':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // delete the canvas at the given index from the first sequence
      updatedManifestData.sequences[0].canvases.splice(action.canvasIndex, 1);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'SET_SELECTED_CANVAS_ID':
      return Object.assign({}, state, {
        ...state,
        selectedCanvasId: action.selectedCanvasId,
        error: undefined
      });
    case 'REORDER_CANVASES':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // reorder canvases in sequence according to updatedSortOrder
      function updateSortOrder(arr, sortArr) {
        var result = [];
        for(var i = 0; i < arr.length; i++) {
          result[i] = arr[sortArr[i]];
        }
        return result;
      }
      updatedManifestData.sequences[0].canvases = updateSortOrder(state.manifestData.sequences[0].canvases, action.updatedSortOrder);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'START_IMAGE_ANNOTATION_FETCH':
      return Object.assign({}, state, {
        isFetchingImageAnnotation: true,
        error: undefined
      });
    case 'COMPLETE_IMAGE_ANNOTATION_FETCH':
      return Object.assign({}, state, {
        isFetchingImageAnnotation: false
      });
    case 'ADD_IMAGE_ANNOTATION_TO_CANVAS':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // insert the empty canvas at the given index in the sequence
      var canvasToAnnotate = updatedManifestData.sequences[0].canvases[action.canvasIndex];
      var numImagesOnCanvas = canvasToAnnotate.images.length;
      if(numImagesOnCanvas > 0) {
        // delete existing image annotation
        canvasToAnnotate.images.pop();
        canvasToAnnotate.images[0] = action.imageAnnotation;
      } else {
        canvasToAnnotate.images.push(action.imageAnnotation);
      }
      // set the canvas dimensions to the image dimensions
      canvasToAnnotate.width = action.imageAnnotation.resource.width;
      canvasToAnnotate.height = action.imageAnnotation.resource.height;

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'RENAME_CANVAS_LABELS_BY_PAGINATION':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // automatically rename canvas labels in sequence
      function renameCanvasLabelsByPagination(canvases, canvasIndexOffset) {
        var renamedCanvases = [];
        var canvasLabelCounter = 1;
        for(var canvasIndex = 0; canvasIndex < canvases.length; canvasIndex++) {
          if(canvasIndex >= canvasIndexOffset) {
            canvases[canvasIndex].label = canvasLabelCounter.toString();
            canvasLabelCounter++;
          }
          renamedCanvases[canvasIndex] = canvases[canvasIndex];
        }
        return renamedCanvases;
      }
      updatedManifestData.sequences[0].canvases = renameCanvasLabelsByPagination(state.manifestData.sequences[0].canvases, action.canvasIndexOffset);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'RENAME_CANVAS_LABELS_BY_FOLIATION':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // automatically rename canvas labels in sequence
      function renameCanvasLabelsByFoliation(canvases, canvasIndexOffset, startWithFoliationSide) {
        var renamedCanvases = [];
        var foliationSide = (startWithFoliationSide == 'recto') ? 'r' : 'v';
        var canvasLabelCounter = 1;
        for(var canvasIndex = 0; canvasIndex < canvases.length; canvasIndex++) {
          if(canvasIndex >= canvasIndexOffset) {
            // append the foliation side to the canvas label
            canvases[canvasIndex].label = canvasLabelCounter + foliationSide;

            // increment the canvas label counter when the foliation side changes to verso
            if(foliationSide == 'v') {
              canvasLabelCounter++;
            }

            // toggle the foliation side 
            foliationSide = (foliationSide == 'r') ? 'v' : 'r';
          }

          renamedCanvases[canvasIndex] = canvases[canvasIndex];
        }
        return renamedCanvases;
      }
      updatedManifestData.sequences[0].canvases = renameCanvasLabelsByFoliation(state.manifestData.sequences[0].canvases, action.canvasIndexOffset, action.startWithFoliationSide);

      // update the manifesto object with the updated manifest data by re-creating the entire manifesto object
      var updatedManifestoObject = manifesto.create(JSON.stringify(updatedManifestData));

      // return the updated manifest data with the original state variables
      return {
        ...state,
        manifestoObject: updatedManifestoObject,
        manifestData: updatedManifestData
      };
    case 'SET_SHOW_METADATA_SIDEBAR':
      return Object.assign({}, state, {
        showMetadataSidebar: action.showMetadataSidebar
      });
    case 'SET_ERROR':
      return Object.assign({}, state, {
        error: { type: action.errorType, message: action.errorMessage }
      });
    case 'RESET_ERROR':
      return Object.assign({}, state, {
        error: undefined
      });
    default:
      return state;
  }
};