
module.exports = (store, id) => {
  return store.getState().horizontalConnectors.find(connector => {
    return connector.id === id;
  });
}
