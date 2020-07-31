const {
  NODE_OUTER_1,
  NODE_OUTER_2,
  NODE_INNER_1,
} = require('../../node.constants.js');
const {getTypeBox} = require('../../store/type-box.js');

function handleInner1Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store) {

  const outerNode1 = connectorModel.nodes[NODE_OUTER_1];
  const outerNode2 = connectorModel.nodes[NODE_OUTER_2];
  const innerNode1 = connectorModel.nodes[NODE_INNER_1];

  let outer1X = outerNode1.x + xdiff;
  let outer1Y = outerNode1.y;
  let inner1Y = innerNode1.y + ydiff;

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
  }

  if (outerNode2.typeBox) {
    let outer2Y;

    let typeBox = getTypeBox(store, outerNode2.typeBox)

    const {
      x: typeBoxX,
      y: typeBoxY,
      width: typeBoxWidth,
      height: typeBoxHeight,
    } = typeBox;

    if (inner1Y > typeBoxY + typeBoxHeight) {
      outer2Y = typeBoxY + typeBoxHeight;
    } else {
      outer2Y = typeBoxY;
    }

    builder.setOuter2Y(outer2Y);
  }

  builder.setOuter1X(outer1X);
  builder.setOuter1Y(outer1Y);
  builder.setInner1Y(inner1Y);
}

module.exports.handleInner1Node = handleInner1Node;
