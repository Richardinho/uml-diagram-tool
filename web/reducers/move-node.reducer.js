function updateNodes(nodeType, nodes, newX, newY, attachedTypeBoxId) {
  switch(nodeType) {
    case 'outer1':
      return {
        ...nodes, 
        outer1: {
          ...nodes.outer1,
          x: newX,
          y: newY,
          typeBox: attachedTypeBoxId || nodes.outer1.typeBox,
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
          typeBox: attachedTypeBoxId || nodes.outer2.typeBox,
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

function moveNodeReducer(state, action) {
  return {
    ...state,
    typeBoxes: state.typeBoxes.map(typeBox => {
      if (typeBox.id === action.typeBoxToConnectId) {
        return {
          ...typeBox,
          horizontalConnectors: [
            ...typeBox.horizontalConnectors,
            {
              nodeType: action.nodeType,
              id: action.connectorId
            }
          ],
        };
      }

      return typeBox;
    }),

    horizontalConnectors: state.horizontalConnectors.map(connector => {
      if (connector.id === action.connectorId) {
        return {
          ...connector,
          nodes: updateNodes(action.nodeType, connector.nodes, action.newX, action.newY, action.typeBoxToConnectId),
        };
      }

      return connector;
    }),
  }
}

module.exports.moveNodeReducer = moveNodeReducer;
