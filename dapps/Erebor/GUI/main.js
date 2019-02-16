'use strict';

const fs = require('fs');
const path = require('path');
const Erebor = require('../Erebor.js');
const appOpts = require('../Erebor.json');
const {app, BrowserWindow, ipcMain} = require('electron');
const url = require('url');

const rpcport = process.env.rpcport || 3000;
const rpchost = process.env.rpchost || '127.0.0.1';
const confdir = process.env.configDir;
console.log(`DEBUG: ${rpcport} ${rpchost}`); console.dir(appOpts);
const erebor = new Erebor(rpcport, rpchost, appOpts);

// Temporary solution before UI is migrated...
const cfgObjs = {};
cfgObjs.geth = require(path.join(confdir, 'config.json'));
cfgObjs.ipfs = require(path.join(confdir, 'ipfsserv.json'));

// electron window global object
let win;

const createWindow = () => {
	  // Create the browser window.
	  erebor.connectRPC()
	  .then((rc) => {
	    	console.log(`DEBUG: connected`);
		return erebor.init().catch((err) => { console.trace(err); return; }); 
	  })
	  .then(() => {
	    win = new BrowserWindow({minWidth: 960, minHeight: 370, resizable: true, icon: path.join(__dirname, 'public', 'assets', 'icon', '11be_logo.png')});
	    win.setMenu(null);
	
	    // and load the index.html of the app.
	    win.loadURL(url.format({
	      pathname: path.join(__dirname, '/public/index.html'),
	      protocol: 'file:',
	      slashes: true
	    }))
	
	    global.erebor = erebor;
	
	    // Open the DevTools.
	    win.webContents.openDevTools()
	
	    // Emitted when the window is closed.
	    win.on('closed', () => {
	      // Dereference the window object, usually you would store windows
	      // in an array if your app supports multi windows, this is the time
	      // when you should delete the corresponding element.
	      win = null
	    })
	  })
	}

	app.on('ready', createWindow)

	// Whole process reloader via ipcRenderer for config reload
	ipcMain.on('reload', (e, args) => {
	        app.relaunch();
	        app.exit();
	});
	
	// Quit when all windows are closed.
	app.on('window-all-closed', () => {
	  // On macOS it is common for applications and their menu bar
	  // to stay active until the user quits explicitly with Cmd + Q
	  if (process.platform !== 'darwin') {
	    app.quit()
	  }
	})
	
	app.on('activate', () => {
	  // On macOS it's common to re-create a window in the app when the
	  // dock icon is clicked and there are no other windows open.
	  if (win === null) {
	    createWindow()
	  }
	})
