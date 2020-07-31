const {
  NODE_OUTER_1,
  NODE_INNER_1,
} = require('../../node.constants.js');
const {getTypeBox} = require('../../store/type-box.js');
const {detectTypeBoxCollision} = require('../../new-utility/detect-type-box-collision.js');

function handleOuter1Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store) {

  const outerNode1 = connectorModel.nodes[NODE_OUTER_1];
  const innerNode1 = connectorModel.nodes[NODE_INNER_1];

  let outer1X = outerNode1.x + xdiff;
  let outer1Y = outerNode1.y + ydiff;
  let inner1Y = innerNode1.y;

  if (outerNode1.typeBox) {

    let typeBox = getTypeBox(store, outerNode1.typeBox)

    const {
      x: typeBoxX,
      y: typeBoxY,
      width: typeBoxWidth,
      height: typeBoxHeight,
    } = typeBox;

    if (inner1Y < typeBoxY) {
      outer1Y = typeBoxY;
    } else {
      outer1Y = typeBoxY + typeBoxHeight;
    }

    if (outer1X < typeBoxX) {
      outer1X = typeBoxX;
    } else if (outer1X > typeBoxX + typeBoxWidth) {
      outer1X = typeBoxX + typeBoxWidth;
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
          outer1Y = typeBoxY;
        } else {
          outer1Y = typeBoxY + typeBoxHeight;
        }

        outer1X = outer1X + event.detail.xdiff;

        builder.setOuter1TypeBoxId(typeBoxCollision.id, typeBoxCollision);

      }
    }
  }

  builder.setOuter1X(outer1X);
  builder.setOuter1Y(outer1Y);
}

module.exports.handleOuter1Node = handleOuter1Node;
