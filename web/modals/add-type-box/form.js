const createSelect = require('./create-select.js');
const createVisibilityButton = require('./create-visibility-button.js');
const createButton = require('./create-button.js');
const createInput = require('./create-input.js');
const createHeader = require('./create-header.js');
const createTitle = require('./create-title.js');
const createArg = require('./create-arg.js');
const createProperties = require('./create-properties.js');
const createMethods = require('./create-methods.js');

module.exports = function createTypeBoxFormComponent(appEl, initialState) {
  let state = initialState;

  const el = document.createElement('form');

  const {selectOption, updateNameInput} = createHeader(el, state.name, state.mode); 

  const {
    updatePropertyName,
    updatePropertyType,
    recreateProperties,
  } = createProperties(el, initialState.properties);

  const {
    updateMethodName,
    updateMethodReturnType,
    recreateMethods,
    updateArgName,
    updateArgType,
    recreateArgs,

  } = createMethods(el, initialState.methods);

  el.append(createButton('create', 'create-type', {}));

  appEl.append(el);

  return function render(newState) {
    if (newState !== state) {
      if (newState.name !== state.name) {
        updateNameInput(newState.name);
      }

      if (newState.mode !== state.mode) {
        selectOption(newState.mode);
      }
/*
 * if new.state.properties !== state.properties {
 *  // change detected, do something
 *  if newState.properties.length > state.properties.length {
 *    // create additional properites
 *  if newState.properties.length < state.properties.length
 *    // remove properties
 *   remove D element  compare A C D to A B C
 *
 *  for each new property
 *    
 *
 *   A B C D => A C D
 *   remove item at index 1
 *
 *   A B C D => A B C D E
 *   Add E at index 4 
 *
 *   A B C D => B D
 *   remove item at index 2 then remove item at index 0
 *
 *   B D => A B C D
 *   Add item before item at index 0 then add item before item at index 2
 *
 *   A B C D  => A B Z D
 *   remove item at index 2
 *   A B C D => A B D
 *   Add item before index 2
 *   A B D => A B Z Djk
 *
 */
      if (newState.properties !== state.properties) {
        if (newState.properties.length === state.properties.length) {
          for (let i = 0; i < newState.properties.length; i++) {
            const newProperty = newState.properties[i];
            const oldProperty = state.properties[i];

            if (newProperty !== oldProperty) {
              if (oldProperty.name !== newProperty.name) {
                updatePropertyName(i, newProperty.name);
              }

              if (oldProperty.type !== newProperty.type) {
                updatePropertyType(i, newProperty.type);
              }
            }
          }
        } else {
          /*
           * It would be good to only remove deleted property and add
           * new properties, but this is hard to do
           */

          recreateProperties(newState.properties);
        }
      }

      if (newState.methods !== state.methods) {
        if (newState.methods.length === state.methods.length) {
          for (let i = 0; i < newState.methods.length; i++) {
            const newMethod = newState.methods[i];
            const oldMethod = state.methods[i];

            if (newMethod !== oldMethod) {
              if (oldMethod.name !== newMethod.name) {
                updateMethodName(i, newMethod.name);
              }

              if (oldMethod.returnValue !== newMethod.returnValue) {
                updateMethodReturnType(i, newMethod.returnValue);
              }

              if (newMethod.args !== oldMethod.args) {
                if (newMethod.args.length === oldMethod.args.length) {
                  for (let j = 0; j < newMethod.args.length; j++) {
                    const newArg = newMethod.args[j];
                    const oldArg = oldMethod.args[j];

                    if (oldArg.name !== newArg.name) {
                      updateArgName(i, j, newArg.name);
                    }

                    if (oldArg.type !== newArg.type) {
                      updateArgType(i, j, newArg.type);
                    }
                  }

                } else {
                  recreateArgs(i, newMethod.args);
                }
              }
            }
          }
        } else {
          recreateMethods(newState.methods);
        }
      }

      state = newState;
    }
  }
}
