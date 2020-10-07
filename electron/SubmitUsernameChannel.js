"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitUsernameChannel = void 0;
var electron_1 = require("electron");
var SubmitUsernameChannel = /** @class */ (function () {
    function SubmitUsernameChannel() {
    }
    SubmitUsernameChannel.prototype.getName = function () {
        return 'submit-username';
    };
    SubmitUsernameChannel.prototype.handle = function (event, request) {
        var options = {
            type: 'info',
            buttons: ['Okay'],
            defaultId: 1,
            title: 'Your username',
            message: "Your username is " + request
        };
        electron_1.dialog.showMessageBox(options);
    };
    return SubmitUsernameChannel;
}());
exports.SubmitUsernameChannel = SubmitUsernameChannel;
