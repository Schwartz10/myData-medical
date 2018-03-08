function sendToElectron(message, ...args) {
  chrome.ipcRenderer.send(message, ...args);
}

function createIdentity(e) {
  e.preventDefault()
  sendToElectron('create-new-identity')
}

export default createIdentity;
