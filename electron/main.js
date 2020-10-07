"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var MainWindow_1 = require("./MainWindow");
var Menu_1 = require("./Menu");
var AppManager_1 = __importDefault(require("./AppManager"));
var SubmitUsernameChannel_1 = require("./SubmitUsernameChannel");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.prototype.onWindowAllClosed = function () {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    };
    Main.prototype.setupApplication = function () {
        var window = new MainWindow_1.MainWindow();
        AppManager_1.default.setWindow('MainWindow', window);
        AppManager_1.default.setMenu(new Menu_1.NativeMenu(window.mainWindow));
    };
    Main.prototype.registerIpcChannels = function (ipcChannels) {
        ipcChannels.forEach(function (channel) { return electron_1.ipcMain.on(channel.getName(), function (event, request) { return channel.handle(event, request); }); });
    };
    Main.prototype.init = function (ipcChannels) {
        electron_1.app.on('ready', this.setupApplication);
        electron_1.app.disableHardwareAcceleration();
        electron_1.app.on('window-all-closed', this.onWindowAllClosed);
        this.registerIpcChannels(ipcChannels);
    };
    return Main;
}());
(new Main()).init([new SubmitUsernameChannel_1.SubmitUsernameChannel()]);
