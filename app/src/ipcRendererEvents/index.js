function sendToElectron(message, ...args) {
  chrome.ipcRenderer.send(message, ...args);
}

function configuredAccount(address) {
  sendToElectron('check-account-configuration', address)
}

export default configuredAccount
