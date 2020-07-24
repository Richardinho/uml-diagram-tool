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

module.exports = (state = {}, action) => {
  switch(action.type) {
    case 'LOAD_DIAGRAM':
      return action.diagram;

    case 'MOVE_TYPE_BOX':
      return {
        ...state,
        horizontalConnectors: state.horizontalConnectors.map((connector) => {
          const hcs = action.horizontalConnectors;

          const hc = hcs.find(hc => hc.id === connector.id);

          if (hc) {
            if(hc.nodeType === 'outer1') {
              return {
                ...connector,
                nodes: {
                  ...connector.nodes,
                  outer1: {
                    ...connector.nodes.outer1,
                    x: hc.x,
                    y: hc.y,
                  },
                  inner1: {
                    ...connector.nodes.inner1,
                    y: hc.y,
                  }
                }
              };
            } else if(hc.nodeType === 'outer2') {
              return {
                ...connector,
                nodes: {
                  ...connector.nodes,
                  outer2: {
                    ...connector.nodes.outer2,
                    x: hc.x,
                    y: hc.y,
                  },
                  inner2: {
                    ...connector.nodes.inner2,
                    y: hc.y,
                  }
                }
              };
            }
          } 

          return connector;
        }),
        typeBoxes: state.typeBoxes.map((typeBox) => {
          if (typeBox.id === action.id) {
            return {
              ...typeBox,
              x: action.newX,
              y: action.newY,
            };
          }

          return typeBox;
        }),
      };

    case 'MOVE_NODE':
      return {
        ...state,
        horizontalConnectors: state.horizontalConnectors.map(connector => {
          if (connector.id === action.connectorId) {
            return {
              ...connector,
              nodes: updateNodes(action.nodeType, connector.nodes, action.newX, action.newY),
            };
          }

          return connector;
        }),
      }

    case 'CREATE_TYPE_BOX':

      return {
        ...state,
        typeBoxes: [...state.typeBoxes, action.typeBox ],
      };

    case 'DELETE_TYPE_BOX':
      const typeBox = action.typeBox;
      return {
        ...state,
        horizontalConnectors: state.horizontalConnectors.map(connector => {
          // if connector is one of typeBox.horizontalConnectors
          const hcs = typeBox.horizontalConnectors;

          const hc = hcs.find(hc => hc.id === connector.id);

          if (hc) {
            if (hc.nodeType === 'outer1') {
              return {
                ...connector,
                nodes: {
                  ...connector.nodes,
                  outer1:  {
                    ...connector.nodes.outer1,
                    type: '',
                    typeBox: '',
                  }
                }
              };
            } else if (hc.nodeType === 'outer2') {
              return {
                ...connector,
                nodes: {
                  ...connector.nodes,
                  outer2:  {
                    ...connector.nodes.outer2,
                    type: '',
                    typeBox: '',
                  }
                }
              };
            }
          }

          return connector;
        }),

        typeBoxes: state.typeBoxes.filter(tb => {
          return tb.id !== typeBox.id;
        })
      };

    default:
      return state;
  }
}
