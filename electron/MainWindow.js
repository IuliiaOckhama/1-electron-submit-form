"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainWindow = void 0;
var electron_1 = require("electron");
var path = require('path');
var isDev = require('electron-is-dev');
var MainWindow = /** @class */ (function () {
    function MainWindow() {
        this.mainWindow = this.createWindow();
    }
    MainWindow.prototype.createWindow = function () {
        var mainWindow = new electron_1.BrowserWindow({
            width: 1400,
            height: 1000,
            show: false,
            webPreferences: {
                nodeIntegration: true
            },
        });
        if (isDev) {
            mainWindow.webContents.openDevTools();
            mainWindow.loadURL('http://localhost:3000');
        }
        else {
            mainWindow.loadURL("file://" + path.join(__dirname, '../../build/index.html'));
        }
        mainWindow.once('ready-to-show', function () { return mainWindow.show(); });
        return mainWindow;
    };
    MainWindow.prototype.send = function (channel, args) {
        if (this.mainWindow) {
            this.mainWindow.webContents.send(channel, args);
        }
    };
    return MainWindow;
}());
exports.MainWindow = MainWindow;
