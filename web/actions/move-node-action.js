const {MOVE_NODE} = require('../action.constants.js');
const {getTypeBox} = require('../store/type-box.js');
const {detectTypeBoxCollision} = require('../new-utility/detect-type-box-collision.js');

module.exports = function moveNodeAction(event, store) {

  const {clientX, clientY, altKey } = event.detail;

  const nodeId = event.detail.id;
  const connectorId = nodeId.substring(0, nodeId.indexOf('_'));
  const nodeType = nodeId.substring(nodeId.indexOf('_') + 1);

  const connectorModel = store.getState().horizontalConnectors.find(connector => {
    return connector.id === connectorId;
  });

  let x;
  let y;
  let newX;
  let newY;

  const outerNode1 = connectorModel.nodes['outer1'];
  const innerNode1 = connectorModel.nodes['inner1'];
  const innerNode2 = connectorModel.nodes['inner2'];
  const outerNode2 = connectorModel.nodes['outer2'];

  let typeBoxToConnectId;
  let typeBox;

  switch(nodeType) {
    case 'outer1':
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
    case 'inner1':
      if (outerNode1.typeBox) {

        typeBox = getTypeBox(store, outerNode1.typeBox)

        newX = innerNode1.x + event.detail.xdiff;
        newY = outerNode1.y + event.detail.ydiff;
        newY = Math.max(newY, typeBox.y);
        newY = Math.min(newY, typeBox.y + typeBox.height);

      } else {
        newX = innerNode1.x + event.detail.xdiff;
        newY = outerNode1.y + event.detail.ydiff;
      }

      break;
    case 'inner2':
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
    case 'outer2':
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
