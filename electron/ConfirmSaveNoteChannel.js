"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmSaveNoteChannel = void 0;
var electron_1 = require("electron");
var entities_1 = require("../src/shared/entities");
var ConfirmSaveNoteChannel = /** @class */ (function () {
    function ConfirmSaveNoteChannel(window) {
        this.window = window;
    }
    ConfirmSaveNoteChannel.prototype.getName = function () {
        return entities_1.CONFIRM_SAVE_NOTE;
    };
    ConfirmSaveNoteChannel.prototype.handle = function (event, request) {
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
            _this.window.webContents.send(entities_1.SAVE_NOTE_RESPONSE, res);
        });
    };
    return ConfirmSaveNoteChannel;
}());
exports.ConfirmSaveNoteChannel = ConfirmSaveNoteChannel;
