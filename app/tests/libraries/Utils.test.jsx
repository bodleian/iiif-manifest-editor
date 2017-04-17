var expect = require('expect');
var df = require('deep-freeze-strict');
var Utils = require('Utils');

describe('Libraries', () => {
  describe('Utils', () => {
    it('should return a string for strings', () => {
      var metadata = {
        label: 'Test',
        value: 'Some String'
      }
      var res = Utils.getMetadataField(df(metadata.label), df(metadata.value));
      expect(res).toEqual('Some String');
    });

    it('should return English value for multilingual values with 2-letter language code (en)', () => {
      var metadata = {
        label: "Date",
        value: [
          {
            "@value": "15. Jahrhundert",
            "@language": "de"
          },
          {
            "@value": "15th century",
            "@language": "en"
          }
        ]
      };
      var res = Utils.getMetadataField(df(metadata.label), df(metadata.value));
      expect(res).toEqual('15th century');
    });

    it('should return English value for multilingual values with 3-letter language code (eng)', () => {
      var metadata = {
        label: "Date",
        value: [
          {
            "@value": "15. Jahrhundert",
            "@language": "de"
          },
          {
            "@value": "15th century",
            "@language": "eng"
          }
        ]
      };
      var res = Utils.getMetadataField(df(metadata.label), df(metadata.value));
      expect(res).toEqual('15th century');
    });

    it('should return English label for multilingual labels with 2-letter language code (en)', () => {
      var metadata = {
        label: [
          {
            "@value": "Author",
            "@language": "en"
          },
          {
            "@value": "Awdur",
            "@language": "cy-GB"
          }
        ],
      value: "Author Name"
      };
      var res = Utils.getMetadataField(df(metadata.label), df(metadata.label));
      expect(res).toEqual('Author');
    });

    it('should return English label for multilingual labels with 3-letter language code (eng)', () => {
      var metadata = {
        label: [
          {
            "@value": "Author",
            "@language": "eng"
          },
          {
            "@value": "Awdur",
            "@language": "cy-GB"
          }
        ],
      value: "Author Name"
      };
      var res = Utils.getMetadataField(df(metadata.label), df(metadata.label));
      expect(res).toEqual('Author');
    });

    it('should return concatenated values for arrays with multiple non-multilingual values', () => {
      var metadata = {
        label: "Creator",
        value: [
          {
            "@value": "Creator 1"
          },
          {
            "@value": "Creator 2"
          }
        ]
      };
      var res = Utils.getMetadataField(df(metadata.label), df(metadata.value));
      expect(res).toEqual('Creator 1; Creator 2');
    });

    it('should return JSON wrapped in <pre> tags for all other arrays', () => {
      var metadata = {
        seeAlso: [
          'Some Value'    
        ]
      };
      var res = Utils.getMetadataField('seeAlso', df(metadata.seeAlso));
      expect(res).toEqual('<pre>' + JSON.stringify(metadata.seeAlso, null, 2) + '</pre>');
    });

    it('should return @id for logo if logo is an object', () => {
      var metadata = {
        logo: {
          "@id": "http://path/to/logo.jpg",
          service: {
            "@context": "http://iiif.io/api/image/2/context.json",
            "@id": "https://iif/imageserver/image_id",
            "profile": "http://iiif.io/api/image/2/level1.json"
          }
        }
      };
      var res = Utils.getMetadataField('logo', df(metadata.logo));
      expect(res).toEqual('http://path/to/logo.jpg');
    });

    it('should return @id for seeAlso if seeAlso is an object', () => {
      var metadata = {
        seeAlso: {
          "@id": "http://path/to/seeAlso/resource",
          "format": "application/mods+xml"
        }
      };
      var res = Utils.getMetadataField('seeAlso', df(metadata.seeAlso));
      expect(res).toEqual('http://path/to/seeAlso/resource');
    });

    it('should return an empty string for an empty property value', () => {
      var propertyValue = '';
      var res = Utils.getLocalizedPropertyValue(df(propertyValue));
      expect(res).toEqual('');
    });

    it('should return an empty string for an undefined property value', () => {
      var propertyValue = undefined;
      var res = Utils.getLocalizedPropertyValue(propertyValue);
      expect(res).toEqual('');
    });

    it('should return an empty string for a null property value', () => {
      var propertyValue = null;
      var res = Utils.getLocalizedPropertyValue(propertyValue);
      expect(res).toEqual('');
    });

    it('should return the original string for a string type property value', () => {
      var propertyValue = 'property value';
      var res = Utils.getLocalizedPropertyValue(df(propertyValue));
      expect(res).toEqual('property value');
    });

    it('should return the localized English string for an object type property with a 2-letter language code (en)', () => {
      var propertyValue = {
        "@value": "property value",
        "@language": "en"
      };
      var res = Utils.getLocalizedPropertyValue(df(propertyValue));
      expect(res).toEqual('property value');
    });
  });
});