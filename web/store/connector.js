
function getConnector(store, id) {
  return store.getState().horizontalConnectors.find(connector => {
    return connector.id === id;
  });
}

module.exports.getConnector = getConnector;
