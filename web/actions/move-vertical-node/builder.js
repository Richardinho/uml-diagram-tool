const {MOVE_VERTICAL_NODE} = require('../../action.constants.js');

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

  setInner1Y(y) {
    this.nodes.inner1.y = y;
  }

  setInner2X(x) {
    this.nodes.inner2.x = x;
  }

  setOuter2Y(y) {
    this.nodes.outer2.y = y;
  }

  setOuter1TypeBoxId(id, typeBox) {
    const connectorInTypeBox = typeBox.verticalConnectors.find(connector => {
      return connector.id === this.connectorId
        && connector.nodeType === 'outer1';
    });

    if (!connectorInTypeBox) {
      this.typeBoxes.push({
        ...typeBox,
        verticalConnectors: [
          ...typeBox.verticalConnectors,
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
    const connectorInTypeBox = typeBox.verticalConnectors.find(connector => {
      return connector.id === this.connectorId
        && connector.nodeType === 'outer2';
    });

    if (!connectorInTypeBox) {
      this.typeBoxes.push({
        ...typeBox,
        verticalConnectors: [
          ...typeBox.verticalConnectors,
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
      type: MOVE_VERTICAL_NODE,
      connectorId: this.connectorId,
      typeBoxes: this.typeBoxes,
      nodes: this.nodes,
    }
  }
}

module.exports.Builder = Builder;
