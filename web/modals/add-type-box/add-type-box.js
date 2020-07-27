const {get} = require('lodash');
const {ipcRenderer} = require('electron');
const INPUT_EVENT = 'input-event';
const createTypeBoxFormComponent = require('./form.js');

const {updateState} = require('./update-state.js');



module.exports = function start(appEl, state) {
  return new Promise((resolve, reject) => {

    const render = createTypeBoxFormComponent(appEl, state);

    appEl.addEventListener('visibility-button', (event) => {
      state = updateState(state, event.detail);

      render(state);
    });

    appEl.addEventListener(INPUT_EVENT, (event) => {
      state = updateState(state, event.detail);

      render(state);
    });

    appEl.addEventListener('button-event', (event) => {
      if (event.detail.type === 'create-type') {
        resolve(state);
      } else {
        state = updateState(state, event.detail);

        render(state);
      }
    });

    appEl.addEventListener('select-event', (event) => {
      state = updateState(state, event.detail);

      //render(state);
    });
  });
}
