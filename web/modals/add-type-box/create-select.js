
module.exports = function createSelect(parentEl, options, initialValue) {
  const modeEl = document.createElement('select');

  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.text = option.text;
    optionEl.value = option.value;
    modeEl.append(optionEl);
  });

  modeEl.value = initialValue;

  parentEl.append(modeEl);

  modeEl.addEventListener('change', (event) => {
    var changeEvent = new CustomEvent('select-event', {
      bubbles: true,
      detail: {
        type: 'select-mode',
        value: event.target.value,
      },
    });

    modeEl.dispatchEvent(changeEvent);
  });

  return (value) => {
    modeEl.value = value;
  }
}
