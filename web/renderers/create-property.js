const xmlns = require('../new-utility/svg-utils/xmlns.js');
const {createPropertyText} = require('../new-utility/create-property-text.js');

function createProperty(parentEl) {
  let oldState;

  let el = document.createElementNS(xmlns, 'text');

  return function render(newState) {

    if (!newState) {
      el.remove();
    } else if (!oldState) {

      el.innerHTML = createPropertyText(newState.text);

      el.setAttribute('font-family', 'helvetica');
      el.setAttribute('font-size', newState.fontSize);
      el.setAttribute('fill', newState.color);
      el.setAttribute('x', newState.x);
      el.setAttribute('y', newState.y);
      el.setAttribute('alignment-baseline', 'middle');
      parentEl.append(el);

    } else if (oldState !== newState) {
      if (newState.text !== oldState.text) {
        el.innerHTML = createPropertyText(newState.text);
      }

      if (newState.y !== oldState.y) {
        el.setAttribute('y', newState.y);
      }

      if (newState.x !== oldState.x) {
        el.setAttribute('x', newState.x);
      }
    }

    oldState = newState;

  }
}

module.exports.createProperty = createProperty;
