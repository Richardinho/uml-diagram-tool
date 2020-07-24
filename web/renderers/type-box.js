const makeDraggable = require('../new-utility/make-draggable.js');
const createText = require('../new-utility/svg-utils/create-text.js');
const xmlns = require('../new-utility/svg-utils/xmlns.js');
const createSeparatorLine = require('../new-utility/svg-utils/create-separator-line.js');

function createTypeBox(svgEl, state, id) {

  const paddingLeft = state.paddingLeft;

  let el = document.createElementNS(xmlns, 'g');

  svgEl.append(el);

  let rectEl = document.createElementNS(xmlns, 'rect');

  rectEl.setAttribute('x', 0);
  rectEl.setAttribute('y', 0);
  rectEl.setAttribute('width', state.width);
  rectEl.setAttribute('height', state.height);
  rectEl.setAttribute('fill', state.backgroundColor);
  rectEl.setAttribute('stroke', state.borderColor);
  rectEl.setAttribute('stroke-width', 1);

  el.append(rectEl);

  const title = state.title;
  el.append(createText(title.text, paddingLeft, title.y, state.titleFontSize));

  if (state.properties.length) {
    state.properties.forEach((property) => {
      el.append(createText(property.text, paddingLeft, property.y, state.propertyFontSize));
    })
  }

  if (state.methods.length) {
    state.methods.forEach((method) => {
      el.append(createText(method.text, paddingLeft, method.y, state.methodFontSize));
    })
  }

  if (state.separators.length) {
    state.separators.forEach((separator) => {
      const path = [
        { x: 0, y: separator},
        { x: state.width, y: separator },
      ];

      el.append(createSeparatorLine(path, state.borderWidth, state.borderColor));
    });
  }

  makeDraggable(el, 'typeBox', id);

  el.setAttribute('transform', `translate(${state.x}, ${state.y})`);

  return el;
}

module.exports = function createTypeBoxComponent(svgEl, id) {
  let state;
  let el;

  return function(store) {
    let isDeleted = false;

    const newState = store.getState().typeBoxes.find((typeBox) => {
      return typeBox.id === id;
    });

    if (!state) {
      el = createTypeBox(svgEl, newState, id);
    } else if(state !== newState) {
      el.setAttribute('transform', `translate(${newState.x}, ${newState.y})`);
    } else if(!newState) {
      el.remove();
      isDeleted = true;
    }

    state = newState;

    return isDeleted;
  }
}
