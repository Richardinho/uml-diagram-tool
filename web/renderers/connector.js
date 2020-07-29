const xmlns = require('../new-utility/svg-utils/xmlns.js');
const buildPath = require('../new-utility/build-path.js');
const createPathArray = require('../new-utility/create-path-array-from-nodes.js');
const makeDraggable = require('../new-utility/make-draggable.js');
const positionConnector = require('./position-connector.js');

const OUTLINE_COLOR = '#777';
const radius = 20;

function createConnector(svgEl, state, id) {
  let el = document.createElementNS(xmlns, 'g');

  let pathEl = document.createElementNS(xmlns, 'path');

  pathEl.setAttributeNS(null, 'd', buildPath(createPathArray(state.nodes), false));
  pathEl.setAttributeNS(null, 'stroke', state.lineColor);
  pathEl.setAttributeNS(null, 'fill', 'none');

  el.append(pathEl);

  let outer1El = document.createElementNS(xmlns, 'circle');
  let inner1El = document.createElementNS(xmlns, 'circle');
  let inner2El = document.createElementNS(xmlns, 'circle');
  let outer2El = document.createElementNS(xmlns, 'circle');

  let nodes = state.nodes;

  outer1El.setAttribute('cx', nodes.outer1.x);
  outer1El.setAttribute('cy', nodes.outer1.y);
  outer1El.setAttribute('r', radius);
  outer1El.setAttribute('fill', 'white');
  outer1El.setAttribute('stroke', OUTLINE_COLOR);
  outer1El.setAttribute('opacity', 0.5);
  outer1El.setAttribute('data-node', 'outer-1');

  inner1El.setAttribute('cx', nodes.inner1.x);
  inner1El.setAttribute('cy', nodes.outer1.y);
  inner1El.setAttribute('r', radius);
  inner1El.setAttribute('fill', 'white');
  inner1El.setAttribute('stroke', OUTLINE_COLOR);
  inner1El.setAttribute('opacity', 0.5);
  inner1El.setAttribute('data-node', 'inner-1');

  inner2El.setAttribute('cx', nodes.inner1.x);
  inner2El.setAttribute('cy', nodes.inner2.y);
  inner2El.setAttribute('r', radius) ;
  inner2El.setAttribute('fill', 'white');
  inner2El.setAttribute('stroke', OUTLINE_COLOR);
  inner2El.setAttribute('opacity', 0.5);
  inner2El.setAttribute('data-node', 'inner-2');

  outer2El.setAttribute('cx', nodes.outer2.x);
  outer2El.setAttribute('cy', nodes.inner2.y);
  outer2El.setAttribute('r', radius);
  outer2El.setAttribute('fill', 'white');
  outer2El.setAttribute('stroke', OUTLINE_COLOR);
  outer2El.setAttribute('opacity', 0.5);
  outer2El.setAttribute('data-node', 'outer-2');

  el.append(outer1El);
  el.append(inner1El);
  el.append(inner2El);
  el.append(outer2El);

  makeDraggable(outer1El, 'node', nodes.outer1.id, {connectorId: id, nodeType: 'outer1'});
  makeDraggable(inner1El, 'node', nodes.inner1.id, {connectorId: id, nodeType: 'inner1'});
  makeDraggable(inner2El, 'node', nodes.inner2.id, {connectorId: id, nodeType: 'inner2'});
  makeDraggable(outer2El, 'node', nodes.outer2.id, {connectorId: id, nodeType: 'outer2'});

  svgEl.append(el);

  return {
    el,
    outer1El,
    inner1El,
    outer2El,
    inner2El,
    pathEl,
  };
}

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
