const positionConnector = require('./position-connector.js');
const {createConnector} = require('./create-connector.js');

module.exports = function createConnectorComponent(svgEl, id) {
  let el;
  let state;
  let outer1El;
  let inner1El;
  let inner2El;
  let outer2El;
  let pathEl;

  return function(store) {
    let isDeleted = false;

    const newState = store.getState().horizontalConnectors.find(connector => {
      return connector.id === id;
    });

    if (!state) {
      ({el, outer1El, inner1El, inner2El, outer2El, pathEl } = createConnector(svgEl, newState, id));

    } else if (state !== newState) {

      positionConnector(newState, {
        outer1El,
        inner1El,
        inner2El,
        outer2El,
        pathEl,
      });

    } else if (!newState) {
      el.remove();

      isDeleted = true;
    }

    state = newState;

    return isDeleted;
  }
}
