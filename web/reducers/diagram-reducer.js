const {
  CREATE_TYPE_BOX,
  DELETE_TYPE_BOX,
  EDIT_TYPE_BOX,
  LOAD_DIAGRAM,
  DISCONNECT_NODE,
  MOVE_TYPE_BOX,
  MOVE_NODE,
} = require('../action.constants.js');

/*
 *  attachedTypeBoxId can be undefined, in which case, we just want to keep the
 *  existing value
 */

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

module.exports = (state = {
  horizontalConnectors: [],
  typeBoxes: [],
}, action) => {
  switch(action.type) {
    case LOAD_DIAGRAM:
      return action.diagram;

    case MOVE_TYPE_BOX:
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
            } else if (hc.nodeType === 'outer2') {
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

    case MOVE_NODE:
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

    case DISCONNECT_NODE:
      return {
        ...state,
        typeBoxes: state.typeBoxes.map(typeBox => {
          if (typeBox.id === action.typeBoxId) {
            return {
              ...typeBox,
              horizontalConnectors: typeBox.horizontalConnectors.filter((connector) => {
                return connector.id !== action.connectorId && connector.nodeType !== action.nodeType;
              }) 

            };
          }
        }),
        horizontalConnectors: state.horizontalConnectors.map(connector => {
          if (connector.id === action.connectorId) {
            return {
              ...connector,
              nodes: {
                ...connector.nodes,
                [action.nodeType]: {
                  ...connector.nodes[action.nodeType],
                  typeBox: '',
                }
              },
            };
          }

          return connector;
        }),
      }

    case CREATE_TYPE_BOX:

      return {
        ...state,
        typeBoxes: [...state.typeBoxes, action.typeBoxViewModel ],
      };

    case DELETE_TYPE_BOX:
      const typeBox = action.typeBox;
      return {
        ...state,
        // disconnect type box from its connectors
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

        // remove type box from store
        typeBoxes: state.typeBoxes.filter(tb => {
          return tb.id !== typeBox.id;
        })
      };
    case CREATE_HORIZONTAL_CONNECTOR:
      console.log('create horizontal connector');
      return {
        
        ...state,

        horizontalConnectors: [
          ...state.horizontalConnectors, 
          action.data,
        ],

      };

    case EDIT_TYPE_BOX:
      
      return {
        ...state,
        typeBoxes: state.typeBoxes.map((typeBox) => {
          if (typeBox.id === action.id) {
            return action.typeBoxViewModel;
          }

          return typeBox;
        }),
      }

    default:
      return state;
  }
}
