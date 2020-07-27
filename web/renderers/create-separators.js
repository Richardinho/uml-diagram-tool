const xmlns = require('../new-utility/svg-utils/xmlns.js');
const {createSeparator} = require('./create-separator.js');

function createSeparators(parentEl) {
  let oldState;
  let el = document.createElementNS(xmlns, 'g');
  let components = [];

  return function render(newState) {

    if (!newState) {
      el.remove();
    } else if (!oldState) {

      newState.forEach(separator => {
        const render = createSeparator(el);
        render(separator);
        components.push(render);
      });

      parentEl.append(el);

    } else if (oldState !== newState) {
      if (components.length < newState.length) {
        for (let i = components.length; i < newState.length; i++) {
          components.push(createSeparator(el));
        }
      }

      components.forEach((render, index) => {
        const separator = newState[index];

        render(separator);
      });

      components = components.slice(0, newState.length)
    }

    oldState = newState;
  }
}

module.exports.createSeparators = createSeparators;
