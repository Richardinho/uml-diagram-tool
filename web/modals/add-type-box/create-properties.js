const createTitle = require('./create-title.js');
const createButton = require('./create-button.js');
const createProperty = require('./create-property.js');

module.exports = function createProperties(el, properties) {

  const headerEl = document.createElement('div');
  headerEl.className = 'header';

  headerEl.append(createTitle('Properties'));
  headerEl.append(createButton('add property', 'add-property'));

  el.append(headerEl);

  const propertiesEl = document.createElement('ul');

  let updateFuncs = properties.map((property, index) => {
    return createProperty(propertiesEl, property, index);
  });

  el.append(propertiesEl);

  function recreateProperties(properties) {
    propertiesEl.innerHTML = '';

    updateFuncs = properties.map((property, index) => {
      return createProperty(propertiesEl, property, index);
    });
  }

  function updatePropertyName(index, name) {
    updateFuncs[index]['updatePropertyName'](name);
  }

  function updatePropertyType(index, type) {
    updateFuncs[index]['updatePropertyType'](type);
  }

  return {
    //  recreateProperties,
    recreateProperties,
    updatePropertyName,
    updatePropertyType
  };
}
