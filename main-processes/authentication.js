const fs = require('fs');
const path = require('path');
const { ipcMain, BrowserWindow } = require('electron');
const keytar = require('keytar')


// how to get and set passwords
// keytar.setPassword('backup', '<address>', '<password>')
// let pass = await keytar.getPassword('backup', '<address>')
