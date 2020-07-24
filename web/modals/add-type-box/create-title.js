
module.exports = function createTitle(text) {
  const propTitleEl = document.createElement('h2');
  propTitleEl.textContent = text;

  return propTitleEl;
}
