"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeMenu = void 0;
var electron_1 = require("electron");
var NativeMenu = /** @class */ (function () {
    function NativeMenu(mainWindow) {
        electron_1.Menu.setApplicationMenu(this.createMenu());
        this.mainWindow = mainWindow;
    }
    NativeMenu.prototype.showMessage = function (message) {
        electron_1.dialog.showMessageBox({
            type: 'info',
            message: "You activated action: \"" + message + "\"",
            buttons: ['Close'],
        });
    };
    NativeMenu.prototype.createMenu = function () {
        var _this = this;
        var contextMenu = electron_1.Menu.buildFromTemplate([
            {
                label: 'Preferences',
                submenu: [
                    {
                        label: 'Color',
                        submenu: [
                            {
                                label: 'Red',
                                type: 'radio',
                                accelerator: 'CmdOrCtrl+R',
                                click: function () { return _this.showMessage('Red'); },
                            },
                            {
                                label: 'Green',
                                type: 'radio',
                                accelerator: 'CmdOrCtrl+G',
                                click: function () { return _this.showMessage('Green'); },
                            },
                            {
                                label: 'Blue',
                                type: 'radio',
                                accelerator: 'CmdOrCtrl+B',
                                click: function () { return _this.showMessage('Blue'); },
                            },
                        ],
                    },
                ],
            },
        ]);
        return contextMenu;
    };
    return NativeMenu;
}());
exports.NativeMenu = NativeMenu;
