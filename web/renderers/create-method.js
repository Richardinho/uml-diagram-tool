const xmlns = require('../new-utility/svg-utils/xmlns.js');
const {createMethodText} = require('../new-utility/create-method-text.js');

function createMethod(parentEl) {
  let oldState;

  let el = document.createElementNS(xmlns, 'text');

  return function render(newState) {
    let markForDeletion = false;

    if (!newState) {
      el.remove();
    } else if (!oldState) {

      el.innerHTML = createMethodText(newState.text);

      el.setAttribute('font-family', 'helvetica');
      el.setAttribute('font-size', newState.fontSize);
      el.setAttribute('fill', newState.color);
      el.setAttribute('x', newState.x);
      el.setAttribute('y', newState.y);
      el.setAttribute('alignment-baseline', 'middle');
      parentEl.append(el);

    } else if (oldState !== newState) {
      if (newState.text !== oldState.text) {
        el.innerHTML = createMethodText(newState.text);
      }

      if (newState.y !== oldState.y) {
        el.setAttribute('y', newState.y);
      }

      if (newState.x !== oldState.x) {
        el.setAttribute('y', newState.y);
      }
    }

    oldState = newState;
  }
}

module.exports.createMethod = createMethod;
