const {get} = require('lodash');


function getTypeBoxFromAction(typeBoxes, typeBoxId) {
  return typeBoxes.find(typeBox => {
    return typeBox.id === typeBoxId;
  });
}

function moveNodeReducer(state, action) {
  return {
    ...state, 

    typeBoxes: state.typeBoxes.map(typeBox => {
      let actionTypeBox = getTypeBoxFromAction(action.typeBoxes, typeBox.id);

      if (actionTypeBox) {
        return actionTypeBox;
      }

      return typeBox;
    }),

    horizontalConnectors: state.horizontalConnectors.map(connector => {
      if (connector.id === action.connectorId) {
        return {
          ...connector,
          nodes: action.nodes, 
        };
      }

      return connector;
    }),
  };
}

module.exports.moveNodeReducer = moveNodeReducer;
