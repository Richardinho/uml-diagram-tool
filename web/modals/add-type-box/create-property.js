const createVisibilityButton = require('./create-visibility-button.js');
const createButton = require('./create-button.js');
const createInput = require('./create-input.js');

module.exports = function createProperty(parentEl, property, index) {
  const el = document.createElement('li');
  el.className = 'property';


  const updateVisibility = createVisibilityButton(el, 'property-visibility', index, 'protected')

  const updatePropertyName = createInput(el, 'Name', property.name, { index, type: 'property-name' });

  const updatePropertyType = createInput(el, 'Type', property.type, { index, type: 'property-type' });

  el.append(createButton('delete', 'delete-property', { index }));

  function deleteProperty() {
    el.remove();
  }

  parentEl.append(el);

  return {
    deleteProperty,
    updatePropertyName,
    updatePropertyType,
  };
}
