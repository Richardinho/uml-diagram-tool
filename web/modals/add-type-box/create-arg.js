const createInput = require('./create-input.js');
const createButton = require('./create-button.js');

module.exports = function createArg(argsEl, arg, methodIndex, argIndex) {
  const argEl = document.createElement('li');

  argsEl.append(argEl);
  argEl.className = 'arg';

  const updateName = createInput(argEl, 'Name', arg.name, {methodIndex, argIndex, type: 'arg-name'});
  const updateType = createInput(argEl, 'Type', arg.type, {methodIndex, argIndex, type: 'arg-type'});

  argEl.append(createButton('delete', 'delete-arg', { methodIndex, argIndex }));

  function deleteArg() {
    argEl.remove();
  }

  return {
    updateName,
    updateType,
    deleteArg,
  };
}
