const fs = require('fs');
const path = require('path');
const { ipcMain, BrowserWindow } = require('electron');
const keytar = require('keytar');
const EthCrypto = require('eth-crypto');
const Wallet = require('ethereumjs-wallet');

ipcMain.on('get-public-key', async (event, address, data) => {
  // we collect the data because eventually we might want to do something else with it here
  let privateKey = await keytar.getPassword('backup', address);
  // take off the '0x' at the beginning of the private key
  // privateKey = privateKey.slice(2);
  const privateKeyBuffer = new Buffer(privateKey, 'hex');
  const wallet = Wallet.fromPrivateKey(privateKeyBuffer);
  // chop off '0x' from the public key
  let publicKey = wallet.getPublicKeyString().slice(2);
  event.sender.send('got-public-key', publicKey, data);
})
