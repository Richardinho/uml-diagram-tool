const createTitle = require('./create-title.js');
const createButton = require('./create-button.js');
const createMethod = require('./create-method.js');

module.exports = function createMethods(el, methods) {
  const headerEl = document.createElement('div');
  headerEl.className = 'header';

  headerEl.append(createTitle('Methods'));
  headerEl.append(createButton('add method', 'add-method'));

  el.append(headerEl);

  const methodsEl = document.createElement('ul');

  let updateFuncs = methods.map((method, index) => {
    return createMethod(methodsEl, method, index);
  });

  el.append(methodsEl);

  function updateMethodName(index, name) {
    updateFuncs[index]['updateMethodName'](name);
  }

  function updateMethodReturnType(index, returnType) {
    updateFuncs[index]['updateMethodReturnType'](returnType);
  }

  function updateArgName(methodIndex, argIndex, name) {
    updateFuncs[methodIndex]['updateArgName'](argIndex, name);
  }

  function updateArgType(methodIndex, argIndex, type) {
    updateFuncs[methodIndex]['updateArgType'](argIndex, type);
  }

  function recreateMethods(methods) {
    methodsEl.innerHTML = '';

    updateFuncs = methods.map((method, index) => {
      return createMethod(methodsEl, method, index);
    });
  }

  function recreateArgs(methodIndex, args) {
    updateFuncs[methodIndex]['recreateArgs'](args);
  }

  return {
    recreateMethods,
    updateMethodName,
    updateMethodReturnType,
    updateArgName,
    updateArgType,
    recreateArgs,
  }
}
