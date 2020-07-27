const {createMethod} = require('./create-method.js');
const xmlns = require('../new-utility/svg-utils/xmlns.js');

function createMethods(parentEl) {
  let oldState;

  let el = document.createElementNS(xmlns, 'g');
  let components = [];

  return function render(newState) {
    if (!newState) {

    } else if(!oldState) {

      newState.forEach(method => {
        const render = createMethod(el);
        render(method);
        components.push(render);
      });

      parentEl.append(el);

    } else if (oldState !== newState) {
      // add new components if required
      if (components.length < newState.length) {
        for (let i = components.length; i < newState.length; i++) {
          components.push(createMethod(el));
        }
      } 

      components.forEach((render, index) => {
        const method = newState[index];

        // if you render an undefined property, render will delete the property from the DOM
        render(method);
      });

      // remove excess components
      components = components.slice(0, newState.length);


    }

    oldState = newState;

  }
}

module.exports.createMethods = createMethods;
