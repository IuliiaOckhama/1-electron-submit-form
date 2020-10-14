"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDeleteNoteChannel = void 0;
var electron_1 = require("electron");
var entities_1 = require("../src/shared/entities");
var ConfirmDeleteNoteChannel = /** @class */ (function () {
    function ConfirmDeleteNoteChannel(window) {
        this.window = window;
    }
    ConfirmDeleteNoteChannel.prototype.getName = function () {
        return entities_1.CONFIRM_DELETE_NOTE;
    };
    ConfirmDeleteNoteChannel.prototype.handle = function (event, request) {
        var _this = this;
        var options = {
            type: 'warning',
            buttons: ['Delete note', 'Do not delete'],
            defaultId: 0,
            title: "Delete note",
            message: 'Are you sure you want to delete your note?',
        };
        var answer = electron_1.dialog.showMessageBox(options);
        answer.then(function (_a) {
            var response = _a.response;
            var res = response === 0 ? true : false;
            _this.window.webContents.send(entities_1.DELETE_NOTE_RESPONSE, res);
        });
    };
    return ConfirmDeleteNoteChannel;
}());
exports.ConfirmDeleteNoteChannel = ConfirmDeleteNoteChannel;
