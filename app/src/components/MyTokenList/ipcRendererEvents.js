const rendererEvents = {}

rendererEvents.sendToElectron = function(message, ...args) {
  chrome.ipcRenderer.send(message, ...args);
}

rendererEvents.reEncrypt = function(addressFrom, addressTo, publicKeyTo, data) {
  rendererEvents.sendToElectron('reEncrypt', addressFrom, addressTo, publicKeyTo, data);
}

rendererEvents.openMetamaskNotification = function() {
  rendererEvents.sendToElectron('open-metamask-notification');
}

module.exports = rendererEvents;
