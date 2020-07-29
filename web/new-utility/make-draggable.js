const DRAG_EVENT = 'drag';
const { POINTER_DOWN_ON_ELEMENT } = '../event.constants.js';

module.exports = function makeDraggable(el, type, id, extras) {

  let startX;
  let startY;

  el.addEventListener('pointerdown', (event) => {

    /*
     * if this event occurs on an end node
     * whilst holding down alt
     * and this node is connected to a type box
     * then disconnect the node from the type box
     */

    if (type === 'node') {
      const pointerDownEvent = new CustomEvent('pointer-down-on-node', {
        bubbles: true,
        detail: {
          id,
          type,
          altKey: event.altKey,
          extras,
        }
      });

      el.dispatchEvent(pointerDownEvent);
    }

    event.stopPropagation();

    el.setPointerCapture(event.pointerId);
    startX = event.clientX;
    startY = event.clientY;
  });

  el.addEventListener('pointermove', (event) => {

    event.stopPropagation();

    if (el.hasPointerCapture(event.pointerId)) {
      var dragEvent = new CustomEvent(DRAG_EVENT, {
        bubbles: true,
        detail: {
          id,
          type,
          xdiff: event.clientX - startX,
          ydiff: event.clientY - startY,
          altKey: event.altKey,
          clientX: event.clientX,
          clientY: event.clientY,
          extras,
        }
      });

      startX = event.clientX;
      startY = event.clientY;

      el.dispatchEvent(dragEvent);
    }
  });

  el.addEventListener('pointerup', (event) => {
    event.stopPropagation();

    el.releasePointerCapture(event.pointerId);
  });
}
