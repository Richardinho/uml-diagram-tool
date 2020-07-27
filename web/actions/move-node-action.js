const {MOVE_NODE} = require('../action.constants.js');
const {getTypeBox} = require('../store/type-box.js');

module.exports = function moveNodeAction(event, store) {

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

  let attachedTypeBoxId;
  let typeBox;

  switch(nodeType) {
    case 'outer1':
      if (outerNode1.typeBox) {

        attachedTypeBoxId = outerNode1.typeBox;

        typeBox = getTypeBox(store, attachedTypeBoxId)

        newX = outerNode1.x;
        newY = outerNode1.y + event.detail.ydiff;
        newY = Math.max(newY, typeBox.y);
        newY = Math.min(newY, typeBox.y + typeBox.height);

      } else {
        newX = outerNode1.x + event.detail.xdiff;
        newY = outerNode1.y + event.detail.ydiff;
      }

      break;
    case 'inner1':
      if (outerNode1.typeBox) {

        attachedTypeBoxId = outerNode1.typeBox;

        typeBox = getTypeBox(store, attachedTypeBoxId)

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
        attachedTypeBoxId = outerNode2.typeBox;

        typeBox = getTypeBox(store, attachedTypeBoxId)

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
        attachedTypeBoxId = outerNode2.typeBox;

        typeBox = getTypeBox(store, attachedTypeBoxId)

        newX = outerNode2.x;
        newY = innerNode2.y + event.detail.ydiff;
        newY = Math.max(newY, typeBox.y);
        newY = Math.min(newY, typeBox.y + typeBox.height);
      } else {
        newX = outerNode2.x + event.detail.xdiff;
        newY = innerNode2.y + event.detail.ydiff;
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
  };
}
