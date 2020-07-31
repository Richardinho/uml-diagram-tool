const {
  NODE_INNER_2,
  NODE_OUTER_2,
  NODE_INNER_1,
} = require('../../node.constants.js');
const {getTypeBox} = require('../../store/type-box.js');
const {detectTypeBoxCollision} = require('../../new-utility/detect-type-box-collision.js');

function handleOuter2Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store) {

  const outerNode2 = connectorModel.nodes[NODE_OUTER_2];
  const innerNode2 = connectorModel.nodes[NODE_INNER_2];
  const innerNode1 = connectorModel.nodes[NODE_INNER_1];

  let inner2X = innerNode2.x + xdiff;
  let outer2Y = outerNode2.y + ydiff;
  let inner1Y = innerNode1.y;

  if (outerNode2.typeBox) {

    let typeBox = getTypeBox(store, outerNode2.typeBox)

    const {
      x: typeBoxX,
      y: typeBoxY,
      width: typeBoxWidth,
      height: typeBoxHeight,
    } = typeBox;

    if (inner1Y < typeBoxY) {
      outer2Y = typeBoxY;
    } else {
      outer2Y = typeBoxY + typeBoxHeight;
    }

    if (inner2X < typeBoxX) {
      inner2X = typeBoxX;
    } else if (inner2X > typeBoxX + typeBoxWidth) {
      inner2X = typeBoxX + typeBoxWidth;
    }

  } else {
    if (altKey) {

      const typeBoxCollision = detectTypeBoxCollision(store, clientX, clientY);

      if (typeBoxCollision) {
        const {
          x: typeBoxX,
          y: typeBoxY,
          height: typeBoxHeight,
        } = typeBoxCollision;

        if (inner1Y < typeBoxY) {
          outer2Y = typeBoxY;
        } else {
          outer2Y = typeBoxy + typeBoxHeight;
        }

        builder.setOuter2TypeBoxId(typeBoxCollision.id, typeBoxCollision);
      }
    }
  }

  builder.setInner2X(inner2X);
  builder.setOuter2Y(outer2Y);
}

module.exports.handleOuter2Node = handleOuter2Node;
