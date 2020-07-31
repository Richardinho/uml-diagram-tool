
function getConnector(store, id) {
  return store.getState().horizontalConnectors.find(connector => {
    return connector.id === id;
  });
}

function getVerticalConnector(store, id) {
  return store.getState().verticalConnectors.find(connector => {
    return connector.id === id;
  });
}

module.exports.getConnector = getConnector;
module.exports.getVerticalConnector = getVerticalConnector;
