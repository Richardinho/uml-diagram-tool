const xmlns = require('../new-utility/svg-utils/xmlns.js');

function createRectangle(parentEl) {
  let oldState;

  let el = document.createElementNS(xmlns, 'rect');

  return function render(newState) {

    if (!newState) {
      el.remove();
    } else if (!oldState) {
      const {backgroundColor, borderColor, width, height} = newState;

      el.setAttribute('x', 0);
      el.setAttribute('y', 0);
      el.setAttribute('fill', backgroundColor);
      el.setAttribute('stroke', borderColor);
      el.setAttribute('stroke-width', 1);
      el.setAttribute('width', width);
      el.setAttribute('height', height);

      parentEl.append(el);

    } else if (oldState !== newState) {

      if (oldState.width !== newState.width) {
        el.setAttribute('width', newState.width);
      }

      if (oldState.height !== newState.height) {
        el.setAttribute('height', newState.height);
      }
    }

    oldState = newState;
  }
}

module.exports.createRectangle = createRectangle;
