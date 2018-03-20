const fs = require('fs');
const path = require('path');
const { ipcMain, BrowserWindow } = require('electron');
const keytar = require('keytar');
const EthCrypto = require('eth-crypto');
const Wallet = require('ethereumjs-wallet');

ipcMain.on('get-public-key', async (event, address, data) => {
  // we collect the data because eventually we might want to do something else with it here

  let privateKey = await keytar.getPassword('backup', address);
  const privateKeyBuffer = new Buffer(privateKey, 'hex');
  const wallet = Wallet.fromPrivateKey(privateKeyBuffer);
  // chop off '0x' from the public key
  let publicKey = wallet.getPublicKeyString().slice(2);
  event.sender.send('got-public-key', publicKey, data);
});

ipcMain.on('reEncrypt', async (event, addressFrom, addressTo, publicKeyTo, encryptedData) => {
  // let privateKey = await keytar.getPassword('backup', addressFrom);
  console.log(addressTo)
  event.sender.send('reEncrypted', 'newdata', addressFrom, addressTo);
});
