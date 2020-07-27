const { createStore } = require('redux');
const createTypeBoxForm = require('./modals/add-type-box/add-type-box.js');
const {CREATE_TYPE_BOX} = require('./action.constants.js');

const semanticDiagram = require('./diagram.js');
const xmlns = require('./new-utility/svg-utils/xmlns.js');
const {buildDiagram, buildTypeBoxViewModel} = require('./new-utility/build-diagram.js');
const initialiseDiagram = require('./renderers/initialise-diagram.js');
const createTypeBoxComponent = require('./renderers/type-box.js');
const {mergeFormDataWithViewModel} = require('./new-utility/merge-form-data-with-view-model.js');

//  reducer
const diagramReducer = require('./reducers/diagram-reducer.js');

//  actions
const moveNodeAction = require('./actions/move-node-action.js');
const moveTypeBoxAction = require('./actions/move-type-box-action.js');

const {ipcRenderer} = require('electron');
const uniqid = require('uniqid');

const svgEl = document.getElementById('diagram');

const store = createStore(
  diagramReducer,
);

let components = [];

function render(components, store) {

  const markedForDeletion = [];

  const newComponents = [];

  for(let i = 0; i < components.length; i++ ) {
    const markForDeletion = components[i](store);

    if (!markForDeletion) {
      newComponents.push(components[i]);
    }
  }

  components = newComponents;

  // remove marked components from components array here
  return components;
}

function baseViewModel(id) {
  return {
    id,
    horizontalConnectors: [],
    x: 100,
    y: 100,
  };
}

ipcRenderer.on('create:typeBox', () => {

  const dialogEl = document.createElement('dialog');
  dialogEl.className = 'dialog';
  document.body.append(dialogEl);
  document.body.style.overflow = 'hidden';

  let initialFormState =  {
    name: '',
    mode: 'abstract-class',
    properties: [],
    methods: [],
  };

  createTypeBoxForm(dialogEl, initialFormState).then(formData => {
    dialogEl.close();
    document.body.style.overflow = 'auto';

    const newId = uniqid();

    /*
     *  create type box component
     */

    components.push(createTypeBoxComponent(svgEl, newId, store));

    /*
     *  create backing data for type box and dispatch action
     *  to send to store
     */

    const typeBoxConfig = mergeFormDataWithViewModel(baseViewModel(newId), formData);
    const typeBoxViewModel = buildTypeBoxViewModel(typeBoxConfig, svgEl);

    store.dispatch({
      type: CREATE_TYPE_BOX,
      typeBoxViewModel,
    });

    dialogEl.remove();
  });

  dialogEl.showModal();
  
});

ipcRenderer.on('create:diagram', () => {
  createDiagram();
});


function createDiagram() {

  // at this point, we will assume the json is valid
  // we will do validation on the main process
  // using json schema perhaps

  svgEl.innerHTML = '';

  /*
  let diagram = buildDiagram(semanticDiagram, svgEl);

  store.dispatch({
    type: LOAD_DIAGRAM,
    diagram,
  });
  */

//  components = initialiseDiagram(svgEl, store);

  svgEl.addEventListener('drag', (event) => {
    if (event.detail.type === 'typeBox') {
      store.dispatch(moveTypeBoxAction(event, store));
    } else if (event.detail.type === 'node') {
      store.dispatch(moveNodeAction(event, store))
    }
  });


  store.subscribe(() => {
    components = render(components, store);
  });

  components = render(components, store);
}

