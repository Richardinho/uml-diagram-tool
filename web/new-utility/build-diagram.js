const calculateTypeBoxWidth = require('./calculate-type-box-width.js');
const {createPropertyText} = require('./create-property-text.js');
const {createMethodText} = require('./create-method-text.js');

function buildTypeBox(stb, svgEl) {
  let tb = {};

  const width = calculateTypeBoxWidth(stb, svgEl);

  tb.id = stb.id;
  tb.x = stb.x;
  tb.y = stb.y;
  tb.width = width;

  tb.paddingLeft = stb.padding;
  tb.borderWidth = stb.borderWidth;
  tb.titleFontSize = stb.titleFontSize;
  tb.propertyFontSize = stb.propertyFontSize;
  tb.methodFontSize = stb.methodFontSize;
  tb.backgroundColor = stb.backgroundColor;
  tb.borderColor = stb.borderColor;
  tb.horizontalConnectors = stb.horizontalConnectors;

  let currentY = 0;

  tb.properties = [];
  tb.methods = [];
  tb.separators = [];

  currentY += stb.padding;

  tb.title = {
    y: currentY + (stb.titleLineHeight / 2),
    text: stb.title,
  };

  currentY += stb.titleLineHeight;
  currentY += stb.padding;

  if (stb.properties.length > 0) {

    tb.separators.push(currentY);
    currentY += stb.padding;

    for (let i = 0; i < stb.properties.length; i++) {
      tb.properties[i] = {
        text: createPropertyText(stb.properties[i]),
        y: currentY + (stb.propertyLineHeight / 2),
      };

      currentY += stb.propertyLineHeight;
    }

    currentY += stb.padding;
  }

  if (stb.methods.length > 0) {
    tb.separators.push(currentY);
    currentY += stb.padding;

    for (let i = 0; i < stb.methods.length; i++) {
      tb.methods[i] = {
        text: createMethodText(stb.methods[i]),
        y: currentY + (stb.methodLineHeight / 2),
      };

      currentY += stb.methodLineHeight;
    }

    currentY += stb.padding;
  }

  tb.height = currentY;
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

  for (let i =0; i < source.horizontalConnectors.length; i++) {
    let hs = source.horizontalConnectors[i];

    result.horizontalConnectors[i] = {
      pathId: hs.id + '_path',
      lineColor: hs.lineColor,
      id: hs.id,
      nodes: createNodes(hs.id, hs.nodes),
    };
  }

  result.typeBoxes = [];

  for(let i =0; i < source.typeBoxes.length; i++) {
    result.typeBoxes.push(buildTypeBox(source.typeBoxes[i], svgEl));
  }

  return result;
}

module.exports = {
  buildTypeBox,
  buildDiagram,
}
