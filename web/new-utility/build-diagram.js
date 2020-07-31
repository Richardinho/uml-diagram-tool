const {createPropertyText} = require('./create-property-text.js');
const {createMethodText} = require('./create-method-text.js');
const {calculateWidthFromTypeBoxVM} = require('./calculate-width-from-type-box-vm.js');

// config object to use here instead of getting value out of config

const padding = 5;
const titleFontSize = 16;
const propertyFontSize = 14;
const methodFontSize = 14;
const borderWidth = 1;
const titleLineHeight = 16;
const propertyLineHeight = 15;
const methodLineHeight = 15;

const lineColor = '#666';
const backgroundColor = '#ffffce';
const textColor = '#333';

// buildTypeBoxViewModel
function buildTypeBoxViewModel(config, svgEl) {
  let tb = {};

  tb.id = config.id;
  tb.x = config.x;
  tb.y = config.y;

  tb.paddingLeft = padding;
  tb.borderWidth = borderWidth;

  tb.horizontalConnectors = config.horizontalConnectors;
  tb.verticalConnectors = config.verticalConnectors;

  tb.backgroundColor = backgroundColor;
  tb.borderColor = lineColor;

  let currentY = 0;

  tb.properties = [];
  tb.methods = [];
  tb.separators = [];

  currentY += padding;

  tb.name = {
    text: config.name,
    color: textColor,
    x: padding,
    y: currentY + (titleLineHeight / 2),
    fontSize: titleFontSize,
  };

  currentY += titleLineHeight;
  currentY += padding;

  if (config.properties.length > 0) {

    tb.separators.push({
      y: currentY,
      color: lineColor,
      thickness: 1,
      currentY,
    });

    currentY += padding;

    for (let i = 0; i < config.properties.length; i++) {
      tb.properties[i] = {
        text: config.properties[i],
        fontSize: propertyFontSize,
        color: textColor,
        x: padding,
        y: currentY + (propertyLineHeight / 2),
      };

      currentY += propertyLineHeight;
    }

    currentY += padding;
  }

  if (config.methods.length > 0) {
    tb.separators.push({
      y: currentY,
      color: lineColor,
      thickness: 1,
      currentY,
    });

    currentY += padding;

    for (let i = 0; i < config.methods.length; i++) {
      tb.methods[i] = {
        text: config.methods[i],
        fontSize: methodFontSize,
        color: textColor,
        x: padding,
        y: currentY + (methodLineHeight / 2),
      };

      currentY += methodLineHeight;
    }

    currentY += padding;
  }

  tb.height = currentY;
  tb.width = calculateWidthFromTypeBoxVM(tb, svgEl);

  // update separators array now that we know the width
  tb.separators = tb.separators.map(separator => {
    return {
      ...separator,
      width: tb.width,
    };
  });


  return tb;
}

/*
 *  take a semantic diagram and create a representation of it
 *  that we can use to generate svg elements.
 *  Mostly calculating dimensions
 */


function buildDiagram(source, svgEl) {

  const result = {};

  result.horizontalConnectors = [];

  function createNodes(id, nodes) {
    const result = {};

    result.outer1 = { ...nodes.outer1, id: id + '_outer1' };
    result.inner1 = { ...nodes.inner1, id: id + '_inner1' };
    result.inner2 = { ...nodes.inner2, id: id + '_inner2' };
    result.outer2 = { ...nodes.outer2, id: id + '_outer2' };

    return result;
  }

  /*
  for (let i =0; i < source.horizontalConnectors.length; i++) {
    let hs = source.horizontalConnectors[i];

    result.horizontalConnectors[i] = {
      pathId: hs.id + '_path',
      lineColor: hs.lineColor,
      id: hs.id,
      nodes: createNodes(hs.id, hs.nodes),
    };
  }
  */

  result.typeBoxes = [];

  /*
  for(let i =0; i < source.typeBoxes.length; i++) {
    result.typeBoxes.push(buildTypeBox(source.typeBoxes[i], svgEl));
  }
  */


  return {
    typeBoxes : [],
    horizontalConnectors: [],
  };
}

module.exports = {
  buildTypeBoxViewModel,
  buildDiagram,
}
