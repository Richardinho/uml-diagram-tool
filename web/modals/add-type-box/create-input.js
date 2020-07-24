const INPUT_EVENT = 'input-event';
module.exports = function createInput(parentEl, label, value, options) {

  const el = document.createElement('div');
  parentEl.append(el);

  const labelNameEl = document.createElement('label');
  labelNameEl.textContent = label;
  labelNameEl.setAttribute('for', 'property-1-name');

  const inputEl = document.createElement('input');
  inputEl.value = value;

  inputEl.id = 'property-1-name';

  inputEl.addEventListener('change', (event) => {
    const detail = {...options, value: event.target.value };

    var inputEvent = new CustomEvent(INPUT_EVENT, {
      bubbles: true,
      detail,
    });

    inputEl.dispatchEvent(inputEvent);
  });

  el.append(labelNameEl);
  el.append(inputEl);

  return (val) => {
    inputEl.value = val;
  }
}
