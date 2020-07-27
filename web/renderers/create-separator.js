const xmlns = require('../new-utility/svg-utils/xmlns.js');
let buildPath = require('../new-utility/build-path.js');

function createSeparator(parentEl) {
  let oldState;

  let el = document.createElementNS(xmlns, 'path');

  return function render(newState) {

    if (!newState) {
      el.remove();
    } else if (!oldState) {

      const { y, width, thickness, color } = newState;

      const path = [{x: 0, y}, {x: width, y}];

      el.setAttribute('d', buildPath(path, false));
      el.setAttribute('stroke', color);
      el.setAttribute('stroke-width', thickness);
      el.setAttribute('fill', 'none');
      
      parentEl.append(el);

    } else if (oldState !== newState) {
      const { y, width, thickness, color } = newState;
      const path = [{x: 0, y}, {x: width, y}];
      const bp = buildPath(path, false);
      console.log(bp);
      //el.setAttribute('d', buildPath(path, false));
      el.setAttribute('d', bp);
    }

    oldState = newState;
  }
}

module.exports.createSeparator = createSeparator;

