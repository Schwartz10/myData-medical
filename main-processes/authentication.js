const fs = require('fs');
const path = require('path');
const { ipcMain, BrowserWindow } = require('electron');
const keytar = require('keytar');
const EthCrypto = require('eth-crypto');
const Wallet = require('ethereumjs-wallet');

  ipcMain.on('check-account-configuration', async (event, address) => {
    let pass = await keytar.getPassword('backup', address);
    let configuredAccount = pass ? address : null;
    event.sender.send('checked-account-configuration', configuredAccount);
  });

  ipcMain.on('create-new-identity', (event) => {
    const identity = EthCrypto.createIdentity();
    // chops off the 0x0 from the private key to keep formatting consistent
    identity.privateKey = identity.privateKey.slice(2);
    identity.address = identity.address.toLowerCase();
    keytar.setPassword('backup', identity.address, identity.privateKey);
    event.sender.send('created-new-identity', identity.address);
  })

  ipcMain.on('import-identity', (event, privateKey) => {
    // turns privateKey into a buffer so the walletjs-eth module can get the public key
    let privateKeyBuffer = new Buffer(privateKey, 'hex');
    const wallet = Wallet.fromPrivateKey(privateKeyBuffer);
    const address = '0x' + wallet.getAddress().toString('hex');
    keytar.setPassword('backup', address, privateKey);
    event.sender.send('imported-identity', address);
  })
