const createText = require('./svg-utils/create-text.js');

/*
 *  Create an SVG text element and render it to the DOM so that we can measure it.
 */

module.exports = function calculateTextWidth(text, fontSize, svgEl) {
  let textEl = createText(text, 0, 0, fontSize);
  svgEl.append(textEl);
  const width = textEl.getBBox().width; 
  textEl.remove();
  return width;
}
