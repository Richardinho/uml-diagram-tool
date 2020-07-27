const { Menu, MenuItem } = require('electron').remote;
const { getTypeBox } = require('../store/type-box.js');
const {createFormData} = require('./create-form-data.js');
const {editTypeBoxAction} = require('../actions/edit-type-box-action.js');
const createTypeBoxForm = require('../modals/add-type-box/add-type-box.js');
const {
  EDIT_TYPE_BOX,
  DELETE_TYPE_BOX
} = require('../action.constants.js');

const {buildTypeBoxViewModel} = require('./build-diagram.js');
const {mergeFormDataWithViewModel} = require('./merge-form-data-with-view-model.js');

function attachContextMenu(el, store, id) {
  el.addEventListener('contextmenu', () => {
    let menu = new Menu();

    menu.append(new MenuItem({
      label: 'Edit',
      click() {
        const typeBox = getTypeBox(store, id);
        const formData = createFormData(typeBox);

        const dialogEl = document.createElement('dialog');
        dialogEl.className = 'dialog';
        document.body.append(dialogEl);
        document.body.style.overflow = 'hidden';

        createTypeBoxForm(dialogEl, formData).then(newFormData => {
          dialogEl.close();
          document.body.style.overflow = 'auto';

          const typeBoxConfig = mergeFormDataWithViewModel(typeBox, newFormData);
          const typeBoxViewModel = buildTypeBoxViewModel(typeBoxConfig, svgEl);

          store.dispatch({
            type: EDIT_TYPE_BOX,
            id,
            typeBoxViewModel,
          });

          dialogEl.remove();
        });
        dialogEl.showModal();
      }
    }));

    menu.append(new MenuItem({
      label: 'Delete',
      click() {
        const typeBox = getTypeBox(store, id);

        store.dispatch({
          type: DELETE_TYPE_BOX,
          typeBox,
        });
      }
    }));

    menu.append(new MenuItem({
      label: 'Attach Note',
      click() {
        console.log('attach note');
      }
    }));

    menu.popup();
  });
}

module.exports.attachContextMenu = attachContextMenu;
