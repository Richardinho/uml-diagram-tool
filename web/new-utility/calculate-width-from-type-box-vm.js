const {calculateTextWidth} = require('./svg-utils/calculate-text-width.js');
const {createMethodText} = require('./create-method-text.js');
const {createPropertyText} = require('./create-property-text.js');

function calculatePropertiesWidth(maxWidth, properties) {
  return properties.reduce((maxWidth, property) => {
    const {x, text, fontSize} = property;
    const propertyText = createPropertyText(text);

    const width = x + calculateTextWidth(propertyText, fontSize) + x;

    return Math.max(maxWidth, width);
  }, maxWidth);
}

function calculateMethodsWidth(maxWidth, methods) {
  return methods.reduce((maxWidth, method) => {
    const {x, text, fontSize} = method;
    const methodText = createMethodText(text);

    const width = x + calculateTextWidth(methodText, fontSize) + x;

    return Math.max(maxWidth, width);
  }, maxWidth);
}

function calculateNameWidth(maxWidth, name) {
  const { x, text, fontSize } = name;
  return Math.max(maxWidth, x + calculateTextWidth(text, fontSize) + x);
}

function calculateWidthFromTypeBoxVM(viewModel) {
  const { name, properties, methods } = viewModel;

  let maxWidth = 0;

  maxWidth = calculateNameWidth(maxWidth, name);
  maxWidth = calculatePropertiesWidth(maxWidth, properties);
  maxWidth = calculateMethodsWidth(maxWidth, methods);

  return maxWidth;
}

module.exports.calculateWidthFromTypeBoxVM = calculateWidthFromTypeBoxVM;
