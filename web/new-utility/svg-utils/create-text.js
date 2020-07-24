let xmlns = require('./xmlns.js');

module.exports = function createText(text, x, y, fontSize) {
  var textEl = document.createElementNS(xmlns, "text");
  textEl.innerHTML = text;

  textEl.setAttribute('font-family', 'helvetica');
  textEl.setAttribute('font-size', fontSize);
  textEl.setAttribute('fill', 'black');
  textEl.setAttribute('x', x);
  textEl.setAttribute('y', y);
  textEl.setAttribute('alignment-baseline', 'middle');

  return textEl;
}
