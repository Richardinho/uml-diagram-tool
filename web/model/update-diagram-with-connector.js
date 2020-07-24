function updateNodes(nodeType, nodes, newX, newY) {
  switch(nodeType) {
    case 'outer1':
      return {
        ...nodes, 
        outer1: {
          ...nodes.outer1,
          x: newX,
          y: newY,
        },
      };
    case 'inner1':
      return {
        ...nodes, 
        outer1: {
          ...nodes.outer1,
          y: newY,
        },
        inner1: {
          ...nodes.inner1,
          x: newX,
        }
      };
    case 'inner2':
      return {
        ...nodes, 
        inner2: {
          ...nodes.inner2,
          y: newY,
        },
        inner1: {
          ...nodes.inner1,
          x: newX,
        }
      };
    case 'outer2':
      return {
        ...nodes, 
        outer2: {
          ...nodes.outer2,
          x: newX,
        },
        inner2: {
          ...nodes.inner2,
          y: newY,
        }
      };
    default:
      return nodes;
  }
}

module.exports = function updateDiagramWithConnector(diagram, connectorId, nodeType, newX, newY) {
  return {
    ...diagram,
    horizontalConnectors: diagram.horizontalConnectors.map(connector => {
      if (connector.id === connectorId) {
        return {
          ...connector,
          nodes: updateNodes(nodeType, connector.nodes, newX, newY),
        };
      }

      return connector;
    }),
  };
}
