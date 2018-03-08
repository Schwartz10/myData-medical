const fs = require('fs');
const path = require('path');
const { ipcMain, BrowserWindow } = require('electron');
const keytar = require('keytar')
const EthCrypto = require('eth-crypto');

  ipcMain.on('check-account-configuration', async (event, address) => {
    let pass = await keytar.getPassword('backup', address)
    let configuredAccount = pass ? address : false;
    event.sender.send('checked-account-configuration', configuredAccount)
  });

  ipcMain.on('create-new-identity', (event, address) => {
    const identity = EthCrypto.createIdentity();
    keytar.setPassword('backup', identity.address, identity.privateKey);
    event.sender.send('created-new-identity', identity.address);
  })
