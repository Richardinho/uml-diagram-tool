
module.exports = function createVisibilityButton(parentEl, type, index, initialValue) {
  const modeEl = document.createElement('select');

  const options = [
    {text: 'private', value: 'private'},
    {text: 'protected', value: 'protected'},
    {text: 'public', value: 'public'},
  ]

  options.forEach(option => {
    const optionEl = document.createElement('option');
    optionEl.text = option.text;
    optionEl.value = option.value;
    modeEl.append(optionEl);
  });

  modeEl.value = initialValue;

  parentEl.append(modeEl);

  modeEl.addEventListener('change', (event) => {
    var changeEvent = new CustomEvent('visibility-button', {
      bubbles: true,
      detail: {
        type,
        index,
        value: event.target.value,
      },
    });

    modeEl.dispatchEvent(changeEvent);
  });

  return (value) => {
    modeEl.value = value;
  }
}
