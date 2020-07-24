const createInput = require('./create-input.js');
const createSelect = require('./create-select.js');

module.exports = function (el, name, mode) {
  const headerEl = document.createElement('div');
  headerEl.className = 'header';

  const nameEl = document.createElement('div');
  nameEl.className = 'name'

  const updateNameInput = createInput(nameEl, 'Name', name, { type: 'name' });

  headerEl.append(nameEl);
  el.append(headerEl);

  const selectOption = createSelect(headerEl, [
    { text: 'Class', value: 'class',},
    { text: 'Abstract Class', value: 'abstract-class',},
    { text: 'Interface', value: 'interface',},
  ], mode);

  return {
    selectOption,
    updateNameInput,
  }
}
