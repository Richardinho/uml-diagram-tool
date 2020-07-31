const {moveNodeReducer} = require('./move-node.reducer.js');
const {moveVerticalNodeReducer} = require('./move-vertical-node.reducer.js');
const {disconnectNodeReducer} = require('./disconnect-node.reducer.js');
const {moveTypeBoxReducer} = require('./move-type-box.reducer.js');
const {deleteTypeBoxReducer} = require('./delete-type-box.reducer.js');

const {
  CREATE_TYPE_BOX,
  CREATE_HORIZONTAL_CONNECTOR,
  CREATE_VERTICAL_CONNECTOR,
  DELETE_TYPE_BOX,
  EDIT_TYPE_BOX,
  LOAD_DIAGRAM,
  DISCONNECT_NODE,
  MOVE_TYPE_BOX,
  MOVE_NODE,
  MOVE_VERTICAL_NODE,
} = require('../action.constants.js');

const initialState = {
  horizontalConnectors: [],
  verticalConnectors: [],
  typeBoxes: [],
};

module.exports = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_DIAGRAM:
      return action.diagram;

    case MOVE_TYPE_BOX:
      return moveTypeBoxReducer(state, action);

    case MOVE_NODE:
      return moveNodeReducer(state, action);

    case MOVE_VERTICAL_NODE:
      return moveVerticalNodeReducer(state, action);

    case DISCONNECT_NODE:
      return disconnectNodeReducer(state, action);

    case CREATE_TYPE_BOX:
      return {
        ...state,
        typeBoxes: [...state.typeBoxes, action.typeBoxViewModel ],
      };

    case DELETE_TYPE_BOX:
      return deleteTypeBoxReducer(state, action);

    case CREATE_VERTICAL_CONNECTOR:
      return {
        ...state,
        verticalConnectors: [
          ...state.verticalConnectors,
          action.data,
        ],
      };

    case CREATE_HORIZONTAL_CONNECTOR:
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

          /*
           *  replace old type box with new one
           */

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
