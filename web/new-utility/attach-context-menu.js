const { Menu, MenuItem } = require('electron').remote;
const { getTypeBox } = require('../store/type-box.js');
function attachContextMenu(el, store, id) {
  el.addEventListener('contextmenu', () => {
    let menu = new Menu();

    menu.append(new MenuItem({
      label: 'Edit',
      click() {
        console.log('Edit');
      }
    }));

    menu.append(new MenuItem({
      label: 'Delete',
      click() {
        const typeBox = getTypeBox(store, id);

        store.dispatch({
          type: 'DELETE_TYPE_BOX',
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
