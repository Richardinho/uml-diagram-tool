let xmlns = require('./xmlns.js');
let buildPath = require('../build-path.js');

module.exports = function createSeparatorLine(path, thickness, color) {
  let pathEl = document.createElementNS(xmlns, 'path');

  pathEl.setAttribute('d', buildPath(path, false));
  pathEl.setAttribute('stroke', color);
  pathEl.setAttribute('stroke-width', thickness);
  pathEl.setAttribute('fill', 'none');

  return pathEl;
}
