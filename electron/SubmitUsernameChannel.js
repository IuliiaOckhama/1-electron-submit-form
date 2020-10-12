"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitUsernameChannel = void 0;
var electron_1 = require("electron");
var SubmitUsernameChannel = /** @class */ (function () {
    function SubmitUsernameChannel(window) {
        this.window = window;
    }
    SubmitUsernameChannel.prototype.getName = function () {
        return 'CONFIRM_SAVE_NOTE';
    };
    SubmitUsernameChannel.prototype.handle = function (event, request) {
        var _this = this;
        var options = {
            type: 'warning',
            buttons: ['Save changes', 'Proceed without saving'],
            defaultId: 0,
            title: "You didn't save your note",
            message: 'Your note contains unsaved changes. Do you want to save them?',
        };
        var answer = electron_1.dialog.showMessageBox(options);
        answer.then(function (_a) {
            var response = _a.response;
            var res = response === 0 ? true : false;
            _this.window.webContents.send('SAVE_NOTE_RESPONSE', res);
        });
    };
    return SubmitUsernameChannel;
}());
exports.SubmitUsernameChannel = SubmitUsernameChannel;
