const rendererEvents = {}

rendererEvents.sendToElectron = function(message, ...args) {
  chrome.ipcRenderer.send(message, ...args);
}

rendererEvents.createIdentity = function(e) {
  e.preventDefault();
  rendererEvents.sendToElectron('create-new-identity');
}

rendererEvents.importIdentity = function(e) {
  e.preventDefault();
  rendererEvents.sendToElectron('import-identity', e.target.elements[0].value);
}

module.exports = rendererEvents;
