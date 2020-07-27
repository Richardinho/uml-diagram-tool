const {createProperty} = require('./create-property.js');
const xmlns = require('../new-utility/svg-utils/xmlns.js');

function createProperties(parentEl) {
  let oldState;
  let el = document.createElementNS(xmlns, 'g');
  let components = [];

  return function render(newState) {

    if (!newState) {
      el.remove();
    } else if (!oldState) {

      newState.forEach(property => {
        const render = createProperty(el);
        render(property);
        components.push(render);
      });

      parentEl.append(el);
    } else if (oldState !== newState) {
      
      // add new components if required
      if (components.length < newState.length) {
        for (let i = components.length; i < newState.length; i++) {
          components.push(createProperty(el));
        }
      } 

      components.forEach((render, index) => {
        const property = newState[index];

        // if you render an undefined property, render will delete the property from the DOM
        render(property);
      });

      // remove excess components
      components = components.slice(0, newState.length);

    }

    oldState = newState;
  }
}

module.exports.createProperties = createProperties;
