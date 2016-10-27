var expect = require('expect');
var df = require('deep-freeze-strict');
var reducers = require('reducers');
var manifesto = require('manifesto.js');

var manifestDataFixture = '{ "@context": "http://iiif.io/api/presentation/2/context.json", "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/manifest.json", "@type": "sc:Manifest", "label": "Aarau, Aargauer Kantonsbibliothek, MsMurF 31a", "metadata": [ { "label": "Location", "value": "Aarau" }, { "label": "Date", "value": [ { "@value": "Mitte des 13. Jahrhunderts", "@language": "de" }, { "@value": "middle of the 13th century", "@language": "en" }, { "@value": "au milieu du XIIIe siècle", "@language": "fr" }, { "@value": "metà del sec. XIII", "@language": "it" } ] } ], "description": [ { "@value": "Das Osterspiel von Muri gilt als das älteste bekannte Schauspiel in deutschen Reimen. Der Autor ist unbekannt. Sprachanalysen lassen auf eine Herkunft aus dem mittleren oder westlichen Teil des hochalemannischen Raums schliessen. Die erhalten gebliebenen Teile des Osterspiels deuten auf ein reines Rededrama ohne lateinische oder musikalische Elemente hin.", "@language": "de" }, { "@value": "The Osterspiel von Muri (Easter Play of Muri) is the oldest known rhyming dramatic piece in German. The author is unknown. Linguistic analyses lead to the conclusion that the work originated in the middle or western region of the area where high Alemannic was spoken. The surviving portion of the Osterspiel indicates a true spoken drama, without Latin or musical elements.", "@language": "en" }, { "@value": "Le drame pascal de Muri est considéré comme la plus ancienne représentation théâtrale sacrée en langue allemande et en vers. Son auteur est inconnu. Les analyses linguistiques laissent supposer qu’il est originaire de la partie médiane ou occidentale de la région alémanique. Les parties restantes du drame pascal laissent penser qu’il s’agit d’un vrai drame parlé, sans éléments latins ou musicaux.", "@language": "fr" }, { "@value": "Il dramma pasquale di Muri è considerata la più antica rappresentazione sacra in lingua tedesca in rima. L’autore è sconosciuto. Analisi linguistiche lasciano supporre un’origine dalla zona centrale o occidentale della regione altoalemanna. Le parti rimaste del dramma pasquale fanno pensare che si tratti di un vero dramma parlato, senza elementi latini o musicali.", "@language": "it" } ], "license": "http://creativecommons.org/licenses/by-nc/4.0/", "attribution": "e-codices - Virtual Manuscript Library of Switzerland", "service": [ { "@context": "https://www.w3.org/TR/webmention/", "@id": "http://www.e-codices.unifr.ch/webmention/receive", "profile": "http://w3.org/TR/webmention", "label": "e-codices Webmention Service" } ], "see_also": "http://www.e-codices.unifr.ch/en/list/one/kba/MurF0031a", "within": "http://www.e-codices.unifr.ch/en/list/kba", "sequences": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/sequence/Sequence-919.json", "@type": "sc:Sequence", "label": [ { "@value": "Standardabfolge", "@language": "de" }, { "@value": "Normal Sequence", "@language": "en" }, { "@value": "Séquence normale", "@language": "fr" }, { "@value": "Sequenza normale", "@language": "it" } ], "canvases": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/canvas/kba-MurF0031a_recto.json", "@type": "sc:Canvas", "label": "recto", "height": 4872, "width": 6496, "images": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/annotation/kba-MurF0031a_recto.json", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/canvas/kba-MurF0031a_recto.json", "resource": { "@id": "http://www.e-codices.unifr.ch/loris/kba/kba-MurF0031a/kba-MurF0031a_recto.jp2/full/,150/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 4872, "width": 6496, "service": { "@context": "http://iiif.io/api/image/2/context.json", "@id": "http://www.e-codices.unifr.ch/loris/kba/kba-MurF0031a/kba-MurF0031a_recto.jp2", "profile": "http://iiif.io/api/image/2/level2.json" } } } ] }, { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/canvas/kba-MurF0031a_verso.json", "@type": "sc:Canvas", "label": "verso", "height": 4872, "width": 6496, "images": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/annotation/kba-MurF0031a_verso.json", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/canvas/kba-MurF0031a_verso.json", "resource": { "@id": "http://www.e-codices.unifr.ch/loris/kba/kba-MurF0031a/kba-MurF0031a_verso.jp2/full/,150/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 4872, "width": 6496, "service": { "@context": "http://iiif.io/api/image/2/context.json", "@id": "http://www.e-codices.unifr.ch/loris/kba/kba-MurF0031a/kba-MurF0031a_verso.jp2", "profile": "http://iiif.io/api/image/2/level2.json" } } } ] }, { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/canvas/kba-MurF0031a_001r.json", "@type": "sc:Canvas", "label": "1r", "height": 4248, "width": 2120, "images": [ { "@id": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/annotation/kba-MurF0031a_001r.json", "@type": "oa:Annotation", "motivation": "sc:painting", "on": "http://www.e-codices.unifr.ch/metadata/iiif/kba-MurF0031a/canvas/kba-MurF0031a_001r.json", "resource": { "@id": "http://www.e-codices.unifr.ch/loris/kba/kba-MurF0031a/kba-MurF0031a_001r.jp2/full/,150/0/default.jpg", "@type": "dctypes:Image", "format": "image/jpeg", "height": 4248, "width": 2120, "service": { "@context": "http://iiif.io/api/image/2/context.json", "@id": "http://www.e-codices.unifr.ch/loris/kba/kba-MurF0031a/kba-MurF0031a_001r.jp2", "profile": "http://iiif.io/api/image/2/level2.json" } } } ] } ] } ], "structures": [ ] }';

describe('Reducers', () => {
  describe('manifestReducer', () => {
    it('should set isFetchingLocalManifest to the store when fetching a local manifest', () => {
      var action = {
        type: 'START_MANIFEST_FETCH',
        manifestType: 'MANIFEST_TYPE_LOCAL'
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.isFetchingLocalManifest).toEqual(true);
      expect(res.isFetchingRemoteManifest).toEqual(false);
      expect(res.error).toEqual(undefined);
    });

    it('should set isFetchingRemoteManifest to the store when fetching a remote manifest', () => {
      var action = {
        type: 'START_MANIFEST_FETCH',
        manifestType: 'MANIFEST_TYPE_REMOTE'
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.isFetchingLocalManifest).toEqual(false);
      expect(res.isFetchingRemoteManifest).toEqual(true);
      expect(res.error).toEqual(undefined);
    });

    it('should set isFetchingLocalManifest and isFetchingRemoteManifest to the store when fetching a manifest completes', () => {
      var action = {
        type: 'COMPLETE_MANIFEST_FETCH'
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.isFetchingLocalManifest).toEqual(false);
      expect(res.isFetchingRemoteManifest).toEqual(false);
    });

    it('should set manifestoObject to the store after loading a manifest file', () => {
      var manifestoObject = manifesto.create(manifestDataFixture);
      var action = {
        type: 'SET_MANIFESTO_OBJECT',
        manifestoObject: manifestoObject
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.manifestoObject).toEqual(manifestoObject);
    });

    it('should set manifestData to the store after loading a manifest file', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'SET_MANIFEST_DATA',
        manifestData: manifestData
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.manifestData).toEqual(manifestData);
    });

    it('should set manifestFilenameToSave to the store after saving a manifest file', () => {
      var manifestFilenameToSave = 'manifest filename to save';
      var action = {
        type: 'SET_MANIFEST_FILE_NAME',
        manifestFilenameToSave: manifestFilenameToSave
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.manifestFilenameToSave).toEqual(manifestFilenameToSave);
    });

    it('should add a manifest metadata field to the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'ADD_METADATA_FIELD_AT_PATH',
        metadataFieldName: 'newMetadataFieldName',
        metadataFieldValue: 'new metadata field value',
        path: ''
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.newMetadataFieldName).toExist();
      expect(res.manifestData.newMetadataFieldName).toEqual('new metadata field value');
    });

    it('should add a sequence metadata field to the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'ADD_METADATA_FIELD_AT_PATH',
        metadataFieldName: 'newMetadataFieldName',
        metadataFieldValue: 'new metadata field value',
        path: 'sequences/0'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].newMetadataFieldName).toExist();
      expect(res.manifestData.sequences[0].newMetadataFieldName).toEqual('new metadata field value');
    });

    it('should add a canvas metadata field to the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'ADD_METADATA_FIELD_AT_PATH',
        metadataFieldName: 'newMetadataFieldName',
        metadataFieldValue: 'new metadata field value',
        path: 'sequences/0/canvases/0'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].newMetadataFieldName).toExist();
      expect(res.manifestData.sequences[0].canvases[0].newMetadataFieldName).toEqual('new metadata field value');
    });

    it('should append a metadata field object to the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var nextMetadataFieldIndex = manifestData.metadata.length;
      var action = {
        type: 'ADD_METADATA_FIELD_TO_LIST_AT_PATH',
        metadataFieldObject: { label: "Label", value: "Value" },
        path: 'metadata'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.metadata[nextMetadataFieldIndex]).toExist();
      expect(res.manifestData.metadata[nextMetadataFieldIndex].label).toEqual('Label');
      expect(res.manifestData.metadata[nextMetadataFieldIndex].value).toEqual('Value');
    });

    it('should update a manifest metadata field name in the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var oldMetadataValue = manifestData.label;
      var action = {
        type: 'UPDATE_METADATA_FIELD_NAME_AT_PATH',
        oldMetadataFieldName: 'label',
        newMetadataFieldName: 'newLabel',
        path: ''
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.label).toBe(undefined);
      expect(res.manifestData.newLabel).toExist();
      expect(res.manifestData.newLabel).toEqual(oldMetadataValue);
    });

    it('should update a sequence metadata field name in the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var oldMetadataValue = manifestData.sequences[0].label[0]['@value'];
      var action = {
        type: 'UPDATE_METADATA_FIELD_NAME_AT_PATH',
        oldMetadataFieldName: '@value',
        newMetadataFieldName: '@newValue',
        path: 'sequences/0/label/0'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].label[0]['@value']).toBe(undefined);
      expect(res.manifestData.sequences[0].label[0]['@newValue']).toExist();
      expect(res.manifestData.sequences[0].label[0]['@newValue']).toEqual(oldMetadataValue);
    });

    it('should update a canvas metadata field name in the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var oldMetadataValue = manifestData.sequences[0].canvases[0].label;
      var action = {
        type: 'UPDATE_METADATA_FIELD_NAME_AT_PATH',
        oldMetadataFieldName: 'label',
        newMetadataFieldName: 'newLabel',
        path: 'sequences/0/canvases/0'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toBe(undefined);
      expect(res.manifestData.sequences[0].canvases[0].newLabel).toExist();
      expect(res.manifestData.sequences[0].canvases[0].newLabel).toEqual(oldMetadataValue);
    });

    it('should update a manifest metadata field value in the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var newMetadataFieldValue = 'new metadata field value';
      var action = {
        type: 'UPDATE_METADATA_FIELD_VALUE_AT_PATH',
        metadataFieldValue: newMetadataFieldValue,
        path: 'label'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.label).toEqual(newMetadataFieldValue);
    });

    it('should update a sequence metadata field value in the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var newMetadataFieldValue = 'new metadata field value';
      var action = {
        type: 'UPDATE_METADATA_FIELD_VALUE_AT_PATH',
        metadataFieldValue: newMetadataFieldValue,
        path: 'sequences/0/label/0/@value'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].label[0]['@value']).toEqual(newMetadataFieldValue);
    });

    it('should update a canvas metadata field value in the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var newMetadataFieldValue = 'new metadata field value';
      var action = {
        type: 'UPDATE_METADATA_FIELD_VALUE_AT_PATH',
        metadataFieldValue: newMetadataFieldValue,
        path: 'sequences/0/canvases/0/label'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual(newMetadataFieldValue);
    });

    it('should delete a manifest metadata field from the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'DELETE_METADATA_FIELD_AT_PATH',
        path: 'label'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.label).toBe(undefined);
    });

    it('should delete a sequence metadata field from the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'DELETE_METADATA_FIELD_AT_PATH',
        path: 'sequences/0/label/0/@value'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].label[0]['@value']).toBe(undefined);
    });

    it('should delete a canvas metadata field from the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'DELETE_METADATA_FIELD_AT_PATH',
        path: 'sequences/0/canvases/0/label'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toBe(undefined);
    });

    it('should delete the first metadata field object in the metadata field list from the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numMetadataFields = manifestData.metadata.length;
      var action = {
        type: 'DELETE_METADATA_FIELD_FROM_LIST_AT_PATH_AND_INDEX',
        path: 'metadata',
        fieldIndex: 0
      }
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.metadata.length).toBe(numMetadataFields-1);
    });

    it('should delete the last metadata field object in the metadata field list from the manifestData object in the store', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numMetadataFields = manifestData.metadata.length;
      var action = {
        type: 'DELETE_METADATA_FIELD_FROM_LIST_AT_PATH_AND_INDEX',
        path: 'metadata',
        fieldIndex: numMetadataFields - 1
      }
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.metadata.length).toBe(numMetadataFields-1);
    });

    it('should add an empty canvas to the front of the list of canvases', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numCanvases = manifestData.sequences[0].canvases.length;
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
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases.length).toEqual(numCanvases + 1);
      expect(res.manifestData.sequences[0].canvases[0]['@id']).toEqual('empty canvas id');
    });

    it('should add a canvas to the front of the list of canvases', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numCanvases = manifestData.sequences[0].canvases.length;
      var action = {
        type: 'ADD_CANVAS_AT_INDEX',
        canvas: {
          "@id": "http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/canvas/ssg-fab0002_e001.json",
          "@type": "sc:Canvas",
          "label": "bindingA",
          "height": 6496,
          "width": 4872,
          "images": [
            {
              "@id": "http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/annotation/ssg-fab0002_e001.json",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "on": "http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/canvas/ssg-fab0002_e001.json",
              "resource": {
                "@id": "http://www.e-codices.unifr.ch/loris/ssg/ssg-fab0002/ssg-fab0002_e001.jp2/full/full/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 6496,
                "width": 4872,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "http://www.e-codices.unifr.ch/loris/ssg/ssg-fab0002/ssg-fab0002_e001.jp2",
                  "profile": "http://iiif.io/api/image/2/level2.json"
                }
              }
            }
          ]
        },
        canvasIndex: 0
      }
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases.length).toEqual(numCanvases + 1);
      expect(res.manifestData.sequences[0].canvases[0]['@id']).toEqual('http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/canvas/ssg-fab0002_e001.json');
    });

    it('should add a canvas to the end of the list of canvases', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numCanvases = manifestData.sequences[0].canvases.length;
      var action = {
        type: 'ADD_CANVAS_AT_INDEX',
        canvas: {
          "@id": "http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/canvas/ssg-fab0002_e001.json",
          "@type": "sc:Canvas",
          "label": "bindingA",
          "height": 6496,
          "width": 4872,
          "images": [
            {
              "@id": "http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/annotation/ssg-fab0002_e001.json",
              "@type": "oa:Annotation",
              "motivation": "sc:painting",
              "on": "http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/canvas/ssg-fab0002_e001.json",
              "resource": {
                "@id": "http://www.e-codices.unifr.ch/loris/ssg/ssg-fab0002/ssg-fab0002_e001.jp2/full/full/0/default.jpg",
                "@type": "dctypes:Image",
                "format": "image/jpeg",
                "height": 6496,
                "width": 4872,
                "service": {
                  "@context": "http://iiif.io/api/image/2/context.json",
                  "@id": "http://www.e-codices.unifr.ch/loris/ssg/ssg-fab0002/ssg-fab0002_e001.jp2",
                  "profile": "http://iiif.io/api/image/2/level2.json"
                }
              }
            }
          ]
        },
        canvasIndex: 3
      }
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases.length).toEqual(numCanvases + 1);
      expect(res.manifestData.sequences[0].canvases[3]['@id']).toEqual('http://www.e-codices.unifr.ch/metadata/iiif/ssg-fab0002/canvas/ssg-fab0002_e001.json');
    });

    it('should add a duplicated canvas to the right', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numCanvases = manifestData.sequences[0].canvases.length;
      var canvasLabel = manifestData.sequences[0].canvases[0].label;
      var action = {
        type: 'DUPLICATE_CANVAS_AT_INDEX',
        canvasIndex: 0
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases.length).toEqual(numCanvases + 1);
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual(canvasLabel);
      expect(res.manifestData.sequences[0].canvases[1].label).toEqual(canvasLabel);
    });

    it('should delete the first canvas', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numCanvases = manifestData.sequences[0].canvases.length;
      var action = {
        type: 'DELETE_CANVAS_AT_INDEX',
        canvasIndex: 0
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases.length).toEqual(numCanvases - 1);
    });

    it('should set the selectedCanvasId to the store when the second canvas is selected', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var secondCanvasId = manifestData.sequences[0].canvases[1]['@id'];
      var action = {
        type: 'SET_SELECTED_CANVAS_ID',
        selectedCanvasId: secondCanvasId
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.selectedCanvasId).toEqual(secondCanvasId);
    });

    it('should reorder the canvases using a list of orderings', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var numCanvases = manifestData.sequences[0].canvases.length;
      var firstCanvasId = manifestData.sequences[0].canvases[0]['@id'];
      var secondCanvasId = manifestData.sequences[0].canvases[1]['@id'];
      var thirdCanvasId = manifestData.sequences[0].canvases[2]['@id'];
      var action = {
        type: 'REORDER_CANVASES',
        updatedSortOrder: [2, 0, 1]
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases.length).toEqual(numCanvases);
      expect(res.manifestData.sequences[0].canvases[0]['@id']).toEqual(thirdCanvasId);
      expect(res.manifestData.sequences[0].canvases[1]['@id']).toEqual(firstCanvasId);
      expect(res.manifestData.sequences[0].canvases[2]['@id']).toEqual(secondCanvasId);
    });

    it('should set isFetchingImageAnnotation to the store when fetching an image annotation', () => {
      var action = {
        type: 'START_IMAGE_ANNOTATION_FETCH'
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.isFetchingImageAnnotation).toEqual(true);
      expect(res.error).toEqual(undefined);
    });

    it('should set isFetchingImageAnnotation to the store when fetching an image annotation is complete', () => {
      var action = {
        type: 'COMPLETE_IMAGE_ANNOTATION_FETCH'
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.isFetchingImageAnnotation).toEqual(false);
    });

    it('should add an image annotation to the canvas', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'ADD_IMAGE_ANNOTATION_TO_CANVAS',
        imageAnnotation: {
          "@context": "http://iiif.io/api/presentation/2/context.json",
          "@id": "image annotation id",
          "@type": " image annotation type",
          "motivation": "sc:painting",
          "resource": {
            "@id": "resource id",
            "@type": "resource type",
            "format": "resource format",
            "service": {
              "@context": "service context",
              "@id": "service id",
              "profile": "service profile"
            },
            "height": 0,
            "width": 0
          },
          "on": "image annotation on canvas"
        },
        canvasIndex: 0
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].images[0]['@id']).toEqual("image annotation id");
      expect(res.manifestData.sequences[0].canvases[0].images[0].resource['@id']).toEqual("resource id");
      expect(res.manifestData.sequences[0].canvases[0].images[0].resource.service['@id']).toEqual("service id");
    });

    it('should set the canvas dimensions to the image annotation dimensions when an image annotation is added to the canvas', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'ADD_IMAGE_ANNOTATION_TO_CANVAS',
        imageAnnotation: {
          "@context": "http://iiif.io/api/presentation/2/context.json",
          "@id": "image annotation id",
          "@type": " image annotation type",
          "motivation": "sc:painting",
          "resource": {
            "@id": "resource id",
            "@type": "resource type",
            "format": "resource format",
            "service": {
              "@context": "service context",
              "@id": "service id",
              "profile": "service profile"
            },
            "height": 1234,
            "width": 5678
          },
          "on": "image annotation on canvas"
        },
        canvasIndex: 0
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].height).toEqual(1234);
      expect(res.manifestData.sequences[0].canvases[0].width).toEqual(5678);
    });

    it('should rename every canvas label using a pagination scheme starting from 1', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'RENAME_CANVAS_LABELS_BY_PAGINATION',
        canvasIndexOffset: 0
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual("1");
      expect(res.manifestData.sequences[0].canvases[1].label).toEqual("2");
      expect(res.manifestData.sequences[0].canvases[2].label).toEqual("3");
    });

    it('should rename every canvas label except the first using a pagination scheme starting from 1', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'RENAME_CANVAS_LABELS_BY_PAGINATION',
        canvasIndexOffset: 1
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual("recto");
      expect(res.manifestData.sequences[0].canvases[1].label).toEqual("1");
      expect(res.manifestData.sequences[0].canvases[2].label).toEqual("2");
    });

    it('should rename every canvas labels using a foliation scheme starting from 1r', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'RENAME_CANVAS_LABELS_BY_FOLIATION',
        canvasIndexOffset: 0,
        startWithFoliationSide: 'recto'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual("1r");
      expect(res.manifestData.sequences[0].canvases[1].label).toEqual("1v");
      expect(res.manifestData.sequences[0].canvases[2].label).toEqual("2r");
    });

    it('should rename every canvas labels using a foliation scheme starting from 1v', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'RENAME_CANVAS_LABELS_BY_FOLIATION',
        canvasIndexOffset: 0,
        startWithFoliationSide: 'verso'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual("1v");
      expect(res.manifestData.sequences[0].canvases[1].label).toEqual("2r");
      expect(res.manifestData.sequences[0].canvases[2].label).toEqual("2v");
    });

    it('should rename every canvas label except the first using a foliation scheme starting from 1r', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'RENAME_CANVAS_LABELS_BY_FOLIATION',
        canvasIndexOffset: 1,
        startWithFoliationSide: 'recto'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual("recto");
      expect(res.manifestData.sequences[0].canvases[1].label).toEqual("1r");
      expect(res.manifestData.sequences[0].canvases[2].label).toEqual("1v");
    });

    it('should rename every canvas label except the first using a foliation scheme starting from 1v', () => {
      var manifestData = JSON.parse(manifestDataFixture);
      var action = {
        type: 'RENAME_CANVAS_LABELS_BY_FOLIATION',
        canvasIndexOffset: 1,
        startWithFoliationSide: 'verso'
      };
      var res = reducers.manifestReducer({ manifestData: manifestData }, df(action));
      expect(res.manifestData.sequences[0].canvases[0].label).toEqual("recto");
      expect(res.manifestData.sequences[0].canvases[1].label).toEqual("1v");
      expect(res.manifestData.sequences[0].canvases[2].label).toEqual("2r");
    });

    it('should set showMetadataSidebar to true in the store when toggled to the open state', () => {
      var openMetadataSidebarAction = {
        type: 'SET_SHOW_METADATA_SIDEBAR',
        showMetadataSidebar: true
      };
      var res = reducers.manifestReducer(df(''), df(openMetadataSidebarAction));
      expect(res.showMetadataSidebar).toEqual(true);
    });

    it('should set showMetadataSidebar to false in the store when toggled to the closed state', () => {
      var closeMetadataSidebarAction = {
        type: 'SET_SHOW_METADATA_SIDEBAR',
        showMetadataSidebar: false
      };
      var res = reducers.manifestReducer(df(''), df(closeMetadataSidebarAction));
      expect(res.showMetadataSidebar).toEqual(false);
    });

    it('should set an error message with an error type to the store', () => {
      var action = {
        type: 'SET_ERROR',
        errorType: 'type of error',
        errorMessage: 'error message'
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.error.type).toEqual('type of error');
      expect(res.error.message).toEqual('error message');
    });

    it('should reset the error object to undefined', () => {
      var action = {
        type: 'RESET_ERROR'
      };
      var res = reducers.manifestReducer(df(''), df(action));
      expect(res.error).toEqual(undefined);
    });

  });
});