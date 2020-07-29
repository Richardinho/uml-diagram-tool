const {MOVE_TYPE_BOX} = require('../action.constants.js');
const {getConnector} = require('../store/connector.js');
const {
  NODE_OUTER_1,
  NODE_INNER_1,
  NODE_INNER_2,
  NODE_OUTER_2,
} = require('../node.constants.js');

module.exports = (event, store) => {
  const id = event.detail.id;

  const typeBoxModel = store.getState().typeBoxes.find((typeBox) => {
    return typeBox.id === id;
  });

  const newX = typeBoxModel.x + event.detail.xdiff;
  const newY = typeBoxModel.y + event.detail.ydiff;

  // find out any connectors to this box
  // For each one, move the nodes
  const horizontalConnectors = typeBoxModel.horizontalConnectors;

  const connectors = [];

  if (horizontalConnectors && horizontalConnectors.length > 0) {
    horizontalConnectors.forEach((hc) => {
      let connectorId = hc.id;
      let nodeType = hc.nodeType;
      let connector = getConnector(store, connectorId);
      let node = connector.nodes[nodeType]

      let nodeY;

      if (nodeType === NODE_OUTER_2) {
        nodeY = connector.nodes[NODE_INNER_2].y;
      } else {
        nodeY = node.y;
      }

      connectors.push({
        nodeType,
        id: connectorId,
        x: newX,
        y: nodeY + event.detail.ydiff, 
      });
    });
  }

  return {
    type: MOVE_TYPE_BOX,
    id,
    newX,
    newY,
    horizontalConnectors: connectors,
  };
}
