/*
 * disconnects a node from a typebox
 * Need to delete the node from the typebox and 
 * the type box from the node
 */

function disconnectNodeReducer(state, action) {
  return {
    ...state,
    typeBoxes: state.typeBoxes.map(typeBox => {
      if (typeBox.id === action.typeBoxId) {
        return {
          ...typeBox,

          /*
           *  deletes the node from the type box
           *
           *  note that two identical connectorIds can exist in this array 
           *  (If both ends are joined to the box)
           */

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

              /*
               *  deletes the type box from the node
               */

              typeBox: '',
            }
          },
        };
      }

      return connector;
    }),
  }
}

module.exports.disconnectNodeReducer = disconnectNodeReducer;
