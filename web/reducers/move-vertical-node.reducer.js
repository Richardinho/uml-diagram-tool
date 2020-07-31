const {get} = require('lodash');

function getTypeBoxFromAction(typeBoxes, typeBoxId) {
  return typeBoxes.find(typeBox => {
    return typeBox.id === typeBoxId;
  });
}

function moveVerticalNodeReducer(state, action) {
  return {
    ...state, 

    typeBoxes: state.typeBoxes.map(typeBox => {
      let actionTypeBox = getTypeBoxFromAction(action.typeBoxes, typeBox.id);

      if (actionTypeBox) {
        return actionTypeBox;
      }

      return typeBox;
    }),

    verticalConnectors: state.verticalConnectors.map(connector => {
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

module.exports.moveVerticalNodeReducer = moveVerticalNodeReducer;
