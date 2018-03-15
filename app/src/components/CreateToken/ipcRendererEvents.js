const rendererEvents = {}

rendererEvents.sendToElectron = function(message, ...args) {
  chrome.ipcRenderer.send(message, ...args);
}

rendererEvents.fetchPublicKey = function(address, data) {
  rendererEvents.sendToElectron('get-public-key', address, data);
}

rendererEvents.openMetamaskNotification = function() {
  rendererEvents.sendToElectron('open-metamask-notification');
}

module.exports = rendererEvents;
