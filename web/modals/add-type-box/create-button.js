
module.exports = function createButton(text, eventType, options) {
  const el = document.createElement('button');

  const detail = {
    ...options,
    type: eventType,
  };

  el.addEventListener('click', (event) => {
    event.preventDefault();
    var inputEvent = new CustomEvent('button-event', {
      bubbles: true,
      detail,
    });

    el.dispatchEvent(inputEvent);
  });

  el.textContent = text;

  return el;
}
