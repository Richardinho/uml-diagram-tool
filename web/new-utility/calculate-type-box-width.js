const calculateTextWidth = require('./calculate-text-width.js');

/*
 *  calculate the width of a type box by measuring all the text in it
 *  and returning the length of the longest one plus padding to give the width of the 
 *  containing box
 */

module.exports = function calculateTypeBoxWidth(rawTypeBox, svgEl) {
  let maxLength = calculateTextWidth(rawTypeBox.title, rawTypeBox.titleFontSize, svgEl);

  maxLength = rawTypeBox.properties.reduce((max, property) => {
    return Math.max(max, calculateTextWidth(property, rawTypeBox.propertyFontSize, svgEl));
  }, maxLength);

  maxLength = rawTypeBox.methods.reduce((max, method) => {
    return Math.max(max, calculateTextWidth(method, rawTypeBox.methodFontSize, svgEl));
  }, maxLength);

  return maxLength + (rawTypeBox.padding * 2);
}
