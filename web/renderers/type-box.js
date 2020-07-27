const makeDraggable = require('../new-utility/make-draggable.js');
const {attachContextMenu} = require('../new-utility/attach-context-menu.js');
const xmlns = require('../new-utility/svg-utils/xmlns.js');
const {createPropertyText} = require('../new-utility/create-property-text.js');
const {createMethodText} = require('../new-utility/create-method-text.js');
const {createName} = require('./create-name.js');
const {createRectangle} = require('./create-rectangle.js');
const {createProperties} = require('./create-properties.js');
const {createMethods} = require('./create-methods.js');
const {createSeparators} = require('./create-separators.js');


module.exports = function createTypeBoxComponent(svgEl, id, store) {
  let oldState;
  let el = document.createElementNS(xmlns, 'g');

  let renderName = createName(el);
  let renderRectangle = createRectangle(el);
  let renderProperties = createProperties(el);
  let renderMethods = createMethods(el);
  let renderSeparators = createSeparators(el);

  return function render() {

    const newState = store.getState().typeBoxes.find((typeBox) => {
      return typeBox.id === id;
    });

    if (!newState) {
      el.remove();
      oldState = newState;
      return true;

    } else {
      renderRectangle(newState);
      renderName(newState.name)
      renderProperties(newState.properties);
      renderMethods(newState.methods);
      renderSeparators(newState.separators);

      if (!oldState) {
        svgEl.append(el);

        makeDraggable(el, 'typeBox', id);
        attachContextMenu(el, store, id);
        el.setAttribute('transform', `translate(${newState.x}, ${newState.y})`);

      } else if (oldState !== newState) {
        el.setAttribute('transform', `translate(${newState.x}, ${newState.y})`);
      }

      oldState = newState;

      return false;
    }
  }
}
