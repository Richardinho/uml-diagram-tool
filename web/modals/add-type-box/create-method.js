const createVisibilityButton = require('./create-visibility-button.js');
const createButton = require('./create-button.js');
const createInput = require('./create-input.js');
const createArg = require('./create-arg.js');

module.exports = function createMethod(methodsEl, method, index) {
  const el = document.createElement('li');
  methodsEl.append(el);

  const mce = document.createElement('div');
  mce.className = 'method';

  const updateVisibility = createVisibilityButton(mce, 'method-visibility', index, 'public')

  const updateMethodName = createInput(mce, 'Name', method.name, {index, type: 'method-name'});
  const updateMethodReturnType = createInput(mce, 'Return Type', method.returnValue, { index, type: 'method-return-type' });

  mce.append(createButton('add arg', 'add-arg', { index }));
  mce.append(createButton('delete', 'delete-method', { index }));

  el.append(mce);

  const argsEl = document.createElement('ul');

  let argFuncs = method.args.map((arg, argIndex) => {
    return createArg(argsEl, arg, index, argIndex);
  });

  el.append(argsEl);

  function recreateArgs(args) {
    argsEl.innerHTML = '';

    argFuncs = args.map((arg, argIndex) => {
      return createArg(argsEl, arg, index, argIndex);
    });
  }

  function updateArgName(argIndex, name) {
    argFuncs[argIndex]['updateName'](name);
  }

  function updateArgType(argIndex, type) {
    argFuncs[argIndex]['updateType'](type);
  }

  return {
    updateMethodName,
    updateMethodReturnType,
    updateArgName,
    updateArgType,
    recreateArgs,
  }
}
