const xmlns = require('../new-utility/svg-utils/xmlns.js');

function createName(parentEl) {
  let oldState;
  let el;

  return function render(newState) {

    if (!oldState) {

      el = document.createElementNS(xmlns, "text");

      el.innerHTML = newState.text;

      el.setAttribute('font-family', 'helvetica');
      el.setAttribute('font-size', newState.fontSize);
      el.setAttribute('fill', newState.color);
      el.setAttribute('x', newState.x);
      el.setAttribute('y', newState.y);
      el.setAttribute('alignment-baseline', 'middle');

      parentEl.append(el);

    } else if (newState !== oldState) {

      if (newState.x !== oldState.x) {
        el.setAttribute('x', newState.x);
      }

      if (newState.y !== oldState.y) {
        el.setAttribute('y', newState.y);
      }

      if (newState.text !== oldState.text) {
        el.innerHTML = newState.text;
      }

    } else if (!newState) {
      el.remove();
    }

    oldState = newState;
  }
}

module.exports.createName = createName;
