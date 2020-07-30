const {MOVE_NODE} = require('../action.constants.js');
const {getTypeBox} = require('../store/type-box.js');
const {detectTypeBoxCollision} = require('../new-utility/detect-type-box-collision.js');

class Builder {
  constructor(connectorId, nodes) {
    this.connectorId = connectorId;
    this.nodes = nodes;
    this.typeBoxes = [];
  }

  setOuter1Y(y) {
    this.nodes.outer1.y = y;
  }

  setOuter1X(x) {
    this.nodes.outer1.x = x;
  }

  setInner1X(x) {
    this.nodes.inner1.x = x;
  }

  setInner2Y(y) {
    this.nodes.inner2.y = y;
  }

  setOuter2X(x) {
    this.nodes.outer2.x = x;
  }

  setOuter1TypeBoxId(id, typeBox) {

    const connectorInTypeBox = typeBox.horizontalConnectors.find(connector => {
      return connector.id === this.connectorId
        && connector.nodeType === 'outer1';
    });

    if (!connectorInTypeBox) {
      this.typeBoxes.push({
        ...typeBox,
        horizontalConnectors: [
          ...typeBox.horizontalConnectors,
          {
            id: this.connectorId,
            nodeType: 'outer1'
          },
        ],
      });
    }

    this.nodes.outer1.typeBox = id;
  }

  setOuter2TypeBoxId(id, typeBox) {
    const connectorInTypeBox = typeBox.horizontalConnectors.find(connector => {
      return connector.id === this.connectorId
        && connector.nodeType === 'outer2';
    });

    if (!connectorInTypeBox) {
      this.typeBoxes.push({
        ...typeBox,
        horizontalConnectors: [
          ...typeBox.horizontalConnectors,
          {
            id: this.connectorId,
            nodeType: 'outer2'
          },
        ],
      });
    }

    this.nodes.outer2.typeBox = id;
  }

  build() {
    return {
      type: MOVE_NODE,
      connectorId: this.connectorId,
      typeBoxes: this.typeBoxes,
      nodes: this.nodes,
    };
  }
}

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

  const builder = new Builder(connectorId, connectorModel.nodes);

  let x;
  let y;
  let newX;
  let newY;

  const outerNode1 = connectorModel.nodes[NODE_OUTER_1];
  const innerNode1 = connectorModel.nodes[NODE_INNER_1];
  const innerNode2 = connectorModel.nodes[NODE_INNER_2];
  const outerNode2 = connectorModel.nodes[NODE_OUTER_2];

  let typeBoxToConnectId1 = outerNode1.typeBox;
  let typeBoxToConnectId2 = outerNode2.typeBox;
  let typeBox;

  let outer1X = outerNode1.x;
  let outer1Y = outerNode1.y;
  let inner1X = innerNode1.x;
  let inner2Y = innerNode2.y;
  let outer2X = outerNode2.x;

  switch(nodeType) {
    case NODE_OUTER_1:

      outer1X = outerNode1.x + event.detail.xdiff;
      outer1Y = outerNode1.y + event.detail.ydiff;

      if (outerNode1.typeBox) {

        typeBox = getTypeBox(store, outerNode1.typeBox)

        const typeBoxX = typeBox.x;
        const typeBoxWidth = typeBox.width;

        if (inner1X > typeBoxX + typeBoxWidth) {
          outer1X = typeBoxX + typeBoxWidth;
        } else {
          outer1X = typeBoxX;
        }
        outer1Y = outerNode1.y + event.detail.ydiff;
        outer1Y = Math.max(outer1Y, typeBox.y);
        outer1Y = Math.min(outer1Y, typeBox.y + typeBox.height);

      } else if (altKey) { 

        const typeBoxCollision = detectTypeBoxCollision(store, clientX, clientY);

        if (typeBoxCollision) {
          const typeBoxX = typeBoxCollision.x;
          const typeBoxY = typeBoxCollision.y;
          const typeBoxWidth = typeBoxCollision.width;
          const typeBoxHeight = typeBoxCollision.height;

          if (inner1X > typeBoxX + typeBoxWidth) {
            outer1X = typeBoxX + typeBoxWidth;
          } else {
            outer1X = typeBoxX;
          }

          outer1Y = outer1Y + event.detail.ydiff;

          builder.setOuter1TypeBoxId(typeBoxCollision.id, typeBoxCollision);
        }
      }

      builder.setOuter1X(outer1X);
      builder.setOuter1Y(outer1Y);

      break;

    case NODE_INNER_1:

      inner1X = innerNode1.x + event.detail.xdiff;
      outer1Y = outerNode1.y + event.detail.ydiff;

      if (outerNode1.typeBox) {

        let typeBox = getTypeBox(store, outerNode1.typeBox)

        if (outer1Y < typeBox.y) {
          outer1Y = typeBox.y;
        } else if(outer1Y > typeBox.y + typeBox.height) {
          outer1Y = typeBox.y + typeBox.height;
        }

        if (inner1X > typeBox.x + typeBox.width) { 
          outer1X = typeBox.x + typeBox.width;
        } else if (inner1X < typeBox.x) {
          outer1X = typeBox.x;
        }
      }

      if (outerNode2.typeBox) {
        let typeBox = getTypeBox(store, outerNode2.typeBox)

        if (inner1X > typeBox.x + typeBox.width) {
          builder.setOuter2X(typeBox.x + typeBox.width);
        } else if (inner1X < typeBox.x) {
          builder.setOuter2X(typeBox.x);
        }
      }

      builder.setInner1X(inner1X);
      builder.setOuter1X(outer1X);
      builder.setOuter1Y(outer1Y);

      break;

    case NODE_INNER_2:

      inner1X = innerNode1.x + event.detail.xdiff;
      inner2Y = innerNode2.y + event.detail.ydiff;

      if (outerNode2.typeBox) {

        let typeBox = getTypeBox(store, outerNode2.typeBox)

        if (inner2Y < typeBox.y) {
          inner2Y = typeBox.y;
        } else if(inner2Y > typeBox.y + typeBox.height) {
          inner2Y = typeBox.y + typeBox.height;
        }

        if (inner1X > typeBox.x + typeBox.width) {
          outer2X = typeBox.x + typeBox.width;
        } else if (inner1X < typeBox.x) {
          outer2X = typeBox.x;
        }
      }

      if (outerNode1.typeBox) {

        let typeBox = getTypeBox(store, outerNode1.typeBox)

        if (inner1X > typeBox.x + typeBox.width) {
          builder.setOuter1X(typeBox.x + typeBox.width);
        } else if (inner1X < typeBox.x) {
          builder.setOuter1X(typeBox.x);
        }
      }

      builder.setOuter2X(outer2X);
      builder.setInner1X(inner1X);
      builder.setInner2Y(inner2Y);

      break;

    case NODE_OUTER_2:
      if (outerNode2.typeBox) {

        typeBox = getTypeBox(store, outerNode2.typeBox)

        outer2X = outerNode2.x;
        inner2Y = innerNode2.y + event.detail.ydiff;
        inner2Y = Math.max(inner2Y, typeBox.y);
        inner2Y = Math.min(inner2Y, typeBox.y + typeBox.height);
      } else {
        if (altKey) {
          const typeBoxCollision = detectTypeBoxCollision(store, clientX, clientY);

          if (typeBoxCollision) {
            const typeBoxX = typeBoxCollision.x;
            const typeBoxY = typeBoxCollision.y;
            const typeBoxWidth = typeBoxCollision.width;
            const typeBoxHeight = typeBoxCollision.height;

            outer2X = typeBoxX;
            inner2Y = innerNode2.y + event.detail.ydiff;

            builder.setOuter2TypeBoxId(typeBoxCollision.id, typeBoxCollision);

          } else {
            outer2X = outerNode2.x + event.detail.xdiff;
            inner2Y = innerNode2.y + event.detail.ydiff;
          }
        } else {
          outer2X = outerNode2.x + event.detail.xdiff;
          inner2Y = innerNode2.y + event.detail.ydiff;
        }
      }

      builder.setOuter2X(outer2X);
      builder.setInner2Y(inner2Y)

      break;

    default: 
      // error
  }

  return builder.build();
}
