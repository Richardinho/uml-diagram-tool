
function getTypeBox(store, id) {
  return store.getState().typeBoxes.find((typeBox) => {
    return typeBox.id === id;
  });
}

module.exports.getTypeBox = getTypeBox;
