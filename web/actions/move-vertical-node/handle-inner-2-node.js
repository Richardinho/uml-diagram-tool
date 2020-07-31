const {
  NODE_INNER_1,
  NODE_INNER_2,
  NODE_OUTER_1,
  NODE_OUTER_2,
} = require('../../node.constants.js');
const {getTypeBox} = require('../../store/type-box.js');

function handleInner2Node(connectorModel, builder, xdiff, ydiff, clientX, clientY, altKey, store) {

  const innerNode2 = connectorModel.nodes[NODE_INNER_2];
  const innerNode1 = connectorModel.nodes[NODE_INNER_1];
  const outerNode1 = connectorModel.nodes[NODE_OUTER_1];
  const outerNode2 = connectorModel.nodes[NODE_OUTER_2];

  let inner2X = innerNode2.x + xdiff;
  let inner1Y = innerNode1.y + ydiff;
  let outer1Y = outerNode1.y;

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

    builder.setOuter1Y(outer1Y);
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

    if (inner2X < typeBoxX) {
      inner2X = typeBoxX;
    } else if (inner2X > typeBoxX + typeBoxWidth) {
      inner2X = typeBoxX + typeBoxWidth;
    }

    if (inner1Y > typeBoxY + typeBoxHeight) {
      outer2Y = typeBoxY + typeBoxHeight;
    } else {
      outer2Y = typeBoxY;
    }

    builder.setOuter2Y(outer2Y);
  }

  builder.setInner1Y(inner1Y);
  builder.setInner2X(inner2X);
}

module.exports.handleInner2Node = handleInner2Node;
