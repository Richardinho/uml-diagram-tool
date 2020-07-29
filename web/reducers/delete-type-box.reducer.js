function deleteTypeBoxReducer(state, action) {
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

    typeBoxes: state.typeBoxes.filter(tb => {
      return tb.id !== typeBox.id;
    })
  };
}
module.exports.deleteTypeBoxReducer = deleteTypeBoxReducer;
