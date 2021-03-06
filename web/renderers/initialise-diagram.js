const createTypeBoxComponent = require('../renderers/type-box.js');
const createConnectorComponent = require('../renderers/connector.js');

module.exports = function initialiseDiagram(svgEl, store) {
  const diagram = store.getState();
  const components = [];

  /*
   * create SVG elements for typebox, attach listeners, and position in viewport
   */

  diagram.typeBoxes.forEach((typeBox) => {
    components.push(createTypeBoxComponent(svgEl, typeBox.id, store));
  });

  /*
   *  create SVG elements for connectors, attach listeners, and position in viewport
   */

  diagram.horizontalConnectors.forEach((connector) => {
    components.push(createConnectorComponent(svgEl, connector.id));
  });

  return components;
}
