var manifesto = require('manifesto.js');
var uuid = require('uuid');
var deepcopy = require('deepcopy');

var hardCodedManifestData = '{ "@context": "http://iiif.io/api/presentation/2/context.json", "@id": "http://www.e-codices.unifr.ch/metadata/iiif/aaa/manifest.json", "@type": "sc:Manifest", "label": "Trois Canvases de la Manifest", "viewingDirection": "right-to-left", "metadata": [ { "label": "Location", "value": "Beromünster" }, { "label": "Date", "value": [ { "@value": "erste Hälfte des 11. Jahrhunderts", "@language": "de" }, { "@value": "first half of the 11th century", "@language": "en" }, { "@value": "première moitié du XIe siècle", "@language": "fr" }, { "@value": "prima metà del sec. XI", "@language": "it" } ] } ], "description": [ { "@value": "Das Epistolar ist die älteste Handschrift der Bibliothek des Stifts Beromünster und laut „Haustradition“ wurde es von einem Mitglied der Stifterfamilie von Lenzburg, dem Grafen Ulrich († vor 1050), geschenkt. Der Vorderdeckel besteht aus einer später hinzugefügten Elfenbeintafel der 2. Hälfte-Ende des 13. Jhs.", "@language": "de" }, { "@value": "The Epistolary is the oldest manuscript in the library at Beromunster; according to local tradition it was presented by a member of the patron family of Lenzburg, Count Ulrich († before 1050). The front cover, added later, is an ivory panel dating from the second half of, perhaps the end of, the 13th century.", "@language": "en" }, { "@value": "L’épistolaire est le plus ancien manuscrit du chapitre collégial de Beromünster et fut, selon la tradition, offert par un membre de la famille du fondateur de Lenzbourg, le comte Ulrich († avant 1050). Le plat antérieur se compose d’une tablette d’ivoire de la seconde moitié ou de la fin du XIIIe s. ajoutée plus tard.", "@language": "fr" }, { "@value": "L’Epistolario è il più antico manoscritto conservato dalla biblioteca di Beromünster e, secondo la tradizione locale, venne donato da un membro della famiglia dei fondatori von Lenzburg, il conte Ulrico († prima del 1050). La coperta anteriore è costituita da un tavola di avorio della seconda metà-fine del sec. XIII, aggiunta in un secondo tempo.", "@language": "it" } ], "license": "http://creativecommons.org/licenses/by-nc/4.0/", "attribution": "e-codices - Virtual Manuscript Library of Switzerland", "service": [ { "@context": "https://www.w3.org/TR/webmention/", "@id": "http://www.e-codices.unifr.ch/webmention/receive", "profile": "http://w3.org/TR/webmention", "label": "e-codices Webmention Service" } ], "seeAlso": "http://www.e-codices.unifr.ch/en/list/one/sbb/epist", "within": "http://www.e-codices.unifr.ch/en/list/sbb", "sequences": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/sequence/Sequence-960.json", "@type": "sc:Sequence", "label": [ { "@value": "Standardabfolge", "@language": "de" }, { "@value": "Normal Sequence", "@language": "en" }, { "@value": "Séquence normale", "@language": "fr" }, { "@value": "Sequenza normale", "@language": "it" } ], "canvases": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/canvas/sbb-epist_e001.json", "@type": "sc:Canvas", "label": "bindingA", "height": 6496, "width": 4872, "images": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/annotation/sbb-epist_e001.json", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/canvas/sbb-epist_e001.json", "resource": { "@id": "http://www.e-codices.unifr.ch/loris/sbb/sbb-epist/sbb-epist_e001.jp2/full/full/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 6496, "width": 4872, "service": { "@context": "http://iiif.io/api/image/2/context.json", "@id": "http://www.e-codices.unifr.ch/loris/sbb/sbb-epist/sbb-epist_e001.jp2", "profile": "http://iiif.io/api/image/2/level2.json" } } } ] }, { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/canvas/sbb-epist_e005.json", "@type": "sc:Canvas", "label": "bindingE", "height": 6496, "width": 4872, "images": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/annotation/sbb-epist_e005.json", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/canvas/sbb-epist_e005.json", "resource": { "@id": "http://www.e-codices.unifr.ch/loris/sbb/sbb-epist/sbb-epist_e005.jp2/full/full/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 6496, "width": 4872, "service": { "@context": "http://iiif.io/api/image/2/context.json", "@id": "http://www.e-codices.unifr.ch/loris/sbb/sbb-epist/sbb-epist_e005.jp2", "profile": "http://iiif.io/api/image/2/level2.json" } } } ] }, { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/canvas/sbb-epist_001r.json", "@type": "sc:Canvas", "label": "1r", "height": 6496, "width": 4872, "images": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/annotation/sbb-epist_001r.json", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "http://www.e-codices.unifr.ch/metadata/iiif/sbb-epist/canvas/sbb-epist_001r.json", "resource": { "@id": "http://www.e-codices.unifr.ch/loris/sbb/sbb-epist/sbb-epist_001r.jp2/full/full/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 6496, "width": 4872, "service": { "@context": "http://iiif.io/api/image/2/context.json", "@id": "http://www.e-codices.unifr.ch/loris/sbb/sbb-epist/sbb-epist_001r.jp2", "profile": "http://iiif.io/api/image/2/level2.json" } } } ] } ] } ], "structures": [ ] }';

var stateDefaults = {
  isFetchingLocalManifest: false,
  isFetchingRemoteManifest: false,
  isFetchingImageAnnotation: false,
  manifestData: JSON.parse(hardCodedManifestData),
  manifestoObject: manifesto.create(hardCodedManifestData),
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
    case 'ADD_METADATA_FIELD_TO_LIST_AT_PATH':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // add the metadata field to the list at the given path; the metadata field will be appended to the end of the list
      var object = updatedManifestData;
      var stack = action.path.split('/');
      while(stack.length > 1) {
        object = object[stack.shift()];
      }
      object[stack.shift()].push(action.metadataFieldObject);

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
    case 'DELETE_METADATA_FIELD_FROM_LIST_AT_PATH_AND_INDEX':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      // delete the metadata field from the list at the given index and the given path
      var object = updatedManifestData;
      var stack = action.path.split('/');
      while(stack.length > 1) {
        object = object[stack.shift()];
      }
      object[stack.shift()].splice(action.fieldIndex, 1);

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
      
      // ensure that a duplicate canvas id is not added to the manifest
      for(var canvasIndex = 0; canvasIndex < updatedManifestData.sequences[0].canvases.length; canvasIndex++) {
        var canvas = updatedManifestData.sequences[0].canvases[canvasIndex];
        if(canvas['@id'] === action.canvas['@id']) {
          // generate a unique uuid for the newly added canvas
          var newCanvasId = "http://" + uuid();

          // update the canvas id with the new uuid
          action.canvas['@id'] = newCanvasId;

          // update the 'images.on' property with the new uuid
          action.canvas.images[0]['on'] = newCanvasId;

          break;
        }
      };

      // insert the canvas at the given index in the sequence
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
    case 'REVERSE_SEQUENCE':
      // make a copy of the manifest data to update
      var updatedManifestData = {
        ...state.manifestData
      };

      updatedManifestData.sequences[0].canvases = state.manifestData.sequences[0].canvases.reverse();

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