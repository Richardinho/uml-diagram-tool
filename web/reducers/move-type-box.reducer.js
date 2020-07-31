/*
 *  move type box and also move any connected nodes
 */

function moveTypeBoxReducer(state, action) {
  return {
    ...state,
    // todo: handle vertical connectors here
    verticalConnectors: state.verticalConnectors.map(connector => {
      const vcs = action.verticalConnectors;

      const vc = vcs.find(vc => vc.id === connector.id);

      if (vc) {
        if(vc.nodeType === 'outer1') {
          return {
            ...connector,
            nodes: {
              ...connector.nodes,
              outer1: {
                ...connector.nodes.outer1,
                x: vc.x,
                y: vc.y,
              },
              inner1: {
                ...connector.nodes.inner1,
                x: vc.x,
              }
            }
          };
        } else if (vc.nodeType === 'outer2') {
          return {
            ...connector,
            nodes: {
              ...connector.nodes,
              outer2: {
                ...connector.nodes.outer2,
                y: vc.y,
              },
              inner2: {
                ...connector.nodes.inner2,
                x: vc.x,
              }
            }
          };
        }
      } 

      return connector;
    }),

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
}

module.exports.moveTypeBoxReducer = moveTypeBoxReducer;
