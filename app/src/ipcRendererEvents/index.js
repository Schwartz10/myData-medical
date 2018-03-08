const rendererEvents = {}

rendererEvents.sendToElectron = function(message, ...args) {
  chrome.ipcRenderer.send(message, ...args);
}

rendererEvents.configuredAccount = function(address) {
  rendererEvents.sendToElectron('check-account-configuration', address);
}

rendererEvents.openMetamask = function() {
  rendererEvents.sendToElectron('open-metamask-popup');
}

module.exports = rendererEvents
