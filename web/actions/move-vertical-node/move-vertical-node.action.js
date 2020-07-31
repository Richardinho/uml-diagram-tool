const {
  NODE_OUTER_1,
  NODE_INNER_1,
  NODE_INNER_2,
  NODE_OUTER_2,
} = require('../../node.constants.js');
const {handleOuter1Node} = require('./handle-outer-1-node.js');
const {handleInner1Node} = require('./handle-inner-1-node.js');
const {handleInner2Node} = require('./handle-inner-2-node.js');
const {handleOuter2Node} = require('./handle-outer-2-node.js');

const {Builder} = require('./builder.js');

function moveVerticalNodeAction(event, store) {

  const {clientX, clientY, xdiff, ydiff, altKey } = event.detail;

  const connectorId = event.detail.extras.connectorId;
  const nodeType = event.detail.extras.nodeType;


  const connectorModel = store.getState().verticalConnectors.find(connector => {
    return connector.id === connectorId;
  });

  const builder = new Builder(connectorId, connectorModel.nodes);

  switch(nodeType) {

    case NODE_OUTER_1:
      handleOuter1Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store);
      break;
    case NODE_INNER_1:
      handleInner1Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store);
      break;
    case NODE_INNER_2:
      handleInner2Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store);
      break;
    case NODE_OUTER_2:
      handleOuter2Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store);
      break;

    default:
  }

  return builder.build();
}

module.exports.moveVerticalNodeAction = moveVerticalNodeAction;
