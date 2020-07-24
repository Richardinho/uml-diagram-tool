const DRAG_EVENT = 'drag';

module.exports = function makeDraggable(el, type, id) {

  let startX;
  let startY;

  el.addEventListener('pointerdown', (event) => {
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
