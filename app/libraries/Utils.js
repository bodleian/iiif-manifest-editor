export var getLanguageLabelFromIsoCode = (isoCode, defaultLabel = '[Unknown Language]') => {
  var languageLabelMap = {
    'de': 'German',
    'deu': 'German',
    'de-DE': 'German',
    'en': 'English',
    'eng': 'English',
    'en-US': 'English',
    'en-UK': 'English',
    'fr': 'French',
    'fra': 'French',
    'it': 'Italian',
    'ita': 'Italian'
  }
  return languageLabelMap[isoCode] !== undefined ? languageLabelMap[isoCode] : defaultLabel;
}

export var getLocalizedPropertyValue = (propertyValue) => {
  // Return strings directly
  if(typeof propertyValue === 'string' || propertyValue instanceof String) {
    return propertyValue;
  }
  // Handle objects containing language-specific property values
  else if(propertyValue instanceof Object) { 
    // Handle multilingual values => return English values only for now
    if(propertyValue['@language'] === 'en' || propertyValue['@language'] === 'eng') {
      return propertyValue['@value'];
    }
  }
  return '';
}

export var getMetadataField = (metadataFieldName, metadataFieldValue) => {
  // Return strings directly
  if(typeof metadataFieldValue === 'string' || metadataFieldValue instanceof String) {
    return metadataFieldValue;
  }
  // Handle Arrays first, since they are also Objects
  else if(Array.isArray(metadataFieldValue)) {
    var arrayContainsLocalizedValues = false;
    for (var i = 0; i < metadataFieldValue.length; i++) {
      var value = metadataFieldValue[i];
      // Handle multilingual values => return English values only for now
      if (value['@language'] !== undefined) {
        arrayContainsLocalizedValues = true;
      }
      if (value['@language'] === 'en' || value['@language'] === 'eng') {
        return value['@value'];
      }
    }
    // If Array does not contain any @language values, return the contents as concatenated string 
    if(!arrayContainsLocalizedValues) {
      var concatenatedValues = '';
      for (var i = 0; i < metadataFieldValue.length; i++) {
      var nonLocalizedValue = metadataFieldValue[i];
        if(nonLocalizedValue['@value'] !== undefined) {
          concatenatedValues += nonLocalizedValue['@value'] + '; '
        }
      }
      if (concatenatedValues !== '') {
        return concatenatedValues.slice(0,-2); // trim the trailing semicolon
      }
      else {
        return '<pre>' + JSON.stringify(metadataFieldValue, null, 2) + '</pre>';
      }
    }
  } 
  // Handle Objects that are not Arrays
  else if(metadataFieldValue instanceof Object) { 
    
    // try to get the @id property for certain fiels
    if((metadataFieldName === 'seeAlso' || metadataFieldName === 'logo') && metadataFieldValue['@id']) {
      return metadataFieldValue['@id'];
    
    // Stringify objects and return them as JSON text wrapped in <pre> tags
    } 
    else {
      return '<pre>' + JSON.stringify(metadataFieldValue, null, 2) + '</pre>';
    }

  }

  else {
    return false;
  }
}

export var addMetadataFieldValue = (currentMetadataFieldValue, metadataFieldValueToAdd) => {
  if(currentMetadataFieldValue === undefined || currentMetadataFieldValue === '') {  // no type
    // no value currently exists so use the new value directly
    return metadataFieldValueToAdd;
  }
  else if(Array.isArray(currentMetadataFieldValue)) {  // array type
    // append the new value to the existing list of values
    return [...currentMetadataFieldValue, metadataFieldValueToAdd];
  }
  else {  // string type or object type
    // create a list and append the current and new values to the list
    return [currentMetadataFieldValue, metadataFieldValueToAdd];
  }
}

export var updateMetadataFieldValue = (currentMetadataFieldValue, newMetadataFieldValue, index) => {
  if(Array.isArray(currentMetadataFieldValue)) {  // array type
    // update the value at the given index
    currentMetadataFieldValue[index] = newMetadataFieldValue;
    return currentMetadataFieldValue;
  }
  else {  // string type or object type
    return newMetadataFieldValue;
  }
}
