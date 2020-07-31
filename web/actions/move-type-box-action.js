const {MOVE_TYPE_BOX} = require('../action.constants.js');

const {
  getVerticalConnector,
  getConnector,
} = require('../store/connector.js');

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

  // newX may be x + width
  const newX = typeBoxModel.x + event.detail.xdiff;
  const newY = typeBoxModel.y + event.detail.ydiff;
  const height = typeBoxModel.height;
  const width = typeBoxModel.width;

  // find out any connectors to this box
  // For each one, move the nodes
  const horizontalConnectors = typeBoxModel.horizontalConnectors;
  const verticalConnectors = typeBoxModel.verticalConnectors;

  const connectors = [];

  if (horizontalConnectors && horizontalConnectors.length > 0) {
    horizontalConnectors.forEach((hc) => {
      let connectorId = hc.id;
      let nodeType = hc.nodeType;
      let connector = getConnector(store, connectorId);

      let nodeX;
      let nodeY;

      if (nodeType === NODE_OUTER_1) {
        nodeY = connector.nodes[NODE_OUTER_1].y + event.detail.ydiff;
      } else if (nodeType === NODE_OUTER_2) {
        nodeY = connector.nodes[NODE_INNER_2].y + event.detail.ydiff;
      }

      if (connector.nodes[NODE_INNER_1].x < newX) {
        nodeX = newX;
      } else {
        nodeX = newX + width;
      }

      connectors.push({
        nodeType,
        id: connectorId,
        x: nodeX,
        y: nodeY, 
      });
    });
  }

  const verticalConnectorsArray = [];

  if (verticalConnectors && verticalConnectors.length > 0) {
    verticalConnectors.forEach(verticalConnector => {
      const {id: connectorId, nodeType } = verticalConnector;

      let connector = getVerticalConnector(store, connectorId);

      let nodeX;
      let nodeY;

      if (nodeType === NODE_OUTER_1) {
        nodeX = connector.nodes[NODE_OUTER_1].x + event.detail.xdiff; 
      } else if (nodeType === NODE_OUTER_2) {
        nodeX = connector.nodes[NODE_INNER_2].x + event.detail.xdiff; 
      }

      if (connector.nodes[NODE_INNER_1].y < newY) {
        nodeY = newY;
      } else {
        nodeY = newY + height;
      }

      verticalConnectorsArray.push({
        nodeType,
        id: connectorId,
        x: nodeX,
        y: nodeY,
      });
    });
  }

  return {
    type: MOVE_TYPE_BOX,
    id,
    newX,
    newY,
    horizontalConnectors: connectors,
    verticalConnectors: verticalConnectorsArray,
  };
}
