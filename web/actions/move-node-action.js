const {MOVE_NODE} = require('../action.constants.js');
const {getTypeBox} = require('../store/type-box.js');
const {detectTypeBoxCollision} = require('../new-utility/detect-type-box-collision.js');

const {
  NODE_OUTER_1,
  NODE_INNER_1,
  NODE_INNER_2,
  NODE_OUTER_2,
} = require('../node.constants.js');

module.exports = function moveNodeAction(event, store) {

  const {clientX, clientY, altKey } = event.detail;

  const connectorId = event.detail.extras.connectorId;
  const nodeType = event.detail.extras.nodeType;

  const connectorModel = store.getState().horizontalConnectors.find(connector => {
    return connector.id === connectorId;
  });

  let x;
  let y;
  let newX;
  let newY;

  const outerNode1 = connectorModel.nodes[NODE_OUTER_1];
  const innerNode1 = connectorModel.nodes[NODE_INNER_1];
  const innerNode2 = connectorModel.nodes[NODE_INNER_2];
  const outerNode2 = connectorModel.nodes[NODE_OUTER_2];

  let typeBoxToConnectId;
  let typeBox;

  switch(nodeType) {
    case NODE_OUTER_1:
      if (outerNode1.typeBox) {

        typeBox = getTypeBox(store, outerNode1.typeBox)
        
        newX = outerNode1.x;
        newY = outerNode1.y + event.detail.ydiff;
        newY = Math.max(newY, typeBox.y);
        newY = Math.min(newY, typeBox.y + typeBox.height);

      } else {

        if (altKey) {
          const typeBoxCollision = detectTypeBoxCollision(store, clientX, clientY);

          if (typeBoxCollision) {
            const typeBoxX = typeBoxCollision.x;
            const typeBoxY = typeBoxCollision.y;
            const typeBoxWidth = typeBoxCollision.width;
            const typeBoxHeight = typeBoxCollision.height;

            newX = typeBoxX;
            newY = outerNode1.y + event.detail.ydiff;
            typeBoxToConnectId = typeBoxCollision.id; 

          } else {
            newX = outerNode1.x + event.detail.xdiff;
            newY = outerNode1.y + event.detail.ydiff;
          }
        } else {

          newX = outerNode1.x + event.detail.xdiff;
          newY = outerNode1.y + event.detail.ydiff;
        }
        
      }

      break;
    case NODE_INNER_1:

      // check if outerNode 1 and if outerNode2 are connected to type boxes
      // if (outerNode1.typeBox || outerNode2.typeBox) {
     if (outerNode1.typeBox) {
        // detect if newX is greater than right edge of type box

        typeBox = getTypeBox(store, outerNode1.typeBox)

        newX = innerNode1.x + event.detail.xdiff;
        // is newX greater than typeBox.x + typeBox.width ? 
       // if outerNode1 is connected then y value is dependent on the size of the box
        newY = outerNode1.y + event.detail.ydiff;
        newY = Math.max(newY, typeBox.y);
        newY = Math.min(newY, typeBox.y + typeBox.height);

      } else {
        newX = innerNode1.x + event.detail.xdiff;
        newY = outerNode1.y + event.detail.ydiff;
      }

      break;
    case NODE_INNER_2:
      if (outerNode2.typeBox) {

        typeBox = getTypeBox(store, outerNode2.typeBox)

        newX = innerNode1.x + event.detail.xdiff;
        newY = innerNode2.y + event.detail.ydiff;
        newY = Math.max(newY, typeBox.y);
        newY = Math.min(newY, typeBox.y + typeBox.height);
      } else {
        newX = innerNode1.x + event.detail.xdiff;
        newY = innerNode2.y + event.detail.ydiff;
      }

      break;
    case NODE_OUTER_2:
      if (outerNode2.typeBox) {

        typeBox = getTypeBox(store, outerNode2.typeBox)

        newX = outerNode2.x;
        newY = innerNode2.y + event.detail.ydiff;
        newY = Math.max(newY, typeBox.y);
        newY = Math.min(newY, typeBox.y + typeBox.height);
      } else {
        if (altKey) {
          const typeBoxCollision = detectTypeBoxCollision(store, clientX, clientY);

          if (typeBoxCollision) {
            const typeBoxX = typeBoxCollision.x;
            const typeBoxY = typeBoxCollision.y;
            const typeBoxWidth = typeBoxCollision.width;
            const typeBoxHeight = typeBoxCollision.height;

            newX = typeBoxX;
            newY = innerNode2.y + event.detail.ydiff;
            typeBoxToConnectId = typeBoxCollision.id; 

          } else {
            newX = outerNode2.x + event.detail.xdiff;
            newY = innerNode2.y + event.detail.ydiff;
          }
        } else {
          newX = outerNode2.x + event.detail.xdiff;
          newY = innerNode2.y + event.detail.ydiff;
        }
      }

      break;

    default: 
      // error
  }


  return {
    type: MOVE_NODE,
    connectorId,
    nodeType,
    newX,
    newY,
    typeBoxToConnectId,
  };
}
