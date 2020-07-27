const {buildTypeBox} = require('../new-utility/build-diagram.js');
const {getTypeBox} = require('../store/type-box.js');
const {EDIT_TYPE_BOX} = require('../action.constants.js');


function editTypeBoxAction(id, store, formData) {
  const svgEl = document.getElementById('diagram');

  const viewModel = getTypeBox(store, id);

  return {
    type: EDIT_TYPE_BOX,
    typeBox: {
      ...viewModel,

      title: {
        ...viewModel.title,
        text: formData.name,
      },
      properties: [],
      methods: [],
    },
  }
}
module.exports.editTypeBoxAction = editTypeBoxAction;
