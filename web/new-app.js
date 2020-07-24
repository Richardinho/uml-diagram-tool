const { createStore } = require('redux');
const createTypeBoxForm = require('./modals/add-type-box/add-type-box.js');

const semanticDiagram = require('./diagram.js');
const xmlns = require('./new-utility/svg-utils/xmlns.js');
const {buildDiagram} = require('./new-utility/build-diagram.js');
const initialiseDiagram = require('./renderers/initialise-diagram.js');
const createTypeBoxComponent = require('./renderers/type-box.js');

//  reducer
const diagramReducer = require('./reducers/diagram-reducer.js');

//  actions
const moveNodeAction = require('./actions/move-node-action.js');
const moveTypeBoxAction = require('./actions/move-type-box-action.js');
const createTypeBoxAction = require('./actions/create-type-box-action.js');

const {ipcRenderer} = require('electron');
const uniqid = require('uniqid');

const svgEl = document.getElementById('diagram');

const store = createStore(
  diagramReducer,
);

let components = [];

function render(components, store) {

  const markedForDeletion = [];

  for(let i = 0; i < components.length; i++ ) {
    const markForDeletion = components[i](store);

    if (markForDeletion) {
      markedForDeletion.push(i);
    }
  }

  // remove marked components from components array here

}

ipcRenderer.on('create:typeBox', () => {

  const dialogEl = document.createElement('dialog');
  dialogEl.className = 'dialog';
  document.body.append(dialogEl);
  document.body.style.overflow = 'hidden';

  createTypeBoxForm(dialogEl).then(typeBox => {
    dialogEl.close();
    document.body.style.overflow = 'auto';

    const newId = uniqid();

    //  create a typebox and push it into components array
    components.push(createTypeBoxComponent(svgEl, newId));

    store.dispatch(createTypeBoxAction(newId, typeBox));

    dialogEl.remove();
  });

  dialogEl.showModal();
  
});

ipcRenderer.on('create:diagram', () => {
  console.log('create diagram');
  createDiagram();
});


function createDiagram() {

  // at this point, we will assume the json is valid
  // we will do validation on the main process
  // using json schema perhaps

  svgEl.innerHTML = '';

  let diagram = buildDiagram(semanticDiagram, svgEl);

  store.dispatch({
    type: 'LOAD_DIAGRAM',
    diagram,
  });

  components = initialiseDiagram(svgEl, store.getState());

  svgEl.addEventListener('drag', (event) => {
    if (event.detail.type === 'typeBox') {
      store.dispatch(moveTypeBoxAction(event, store));
    } else if (event.detail.type === 'node') {
      store.dispatch(moveNodeAction(event, store))
    }
  });


  store.subscribe(() => {
    render(components, store);
  });

  render(components, store);
}

