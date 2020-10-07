"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppManager = /** @class */ (function () {
    function AppManager() {
        this.windowManager = new Map();
    }
    AppManager.prototype.setMenu = function (menu) {
        this.menu = menu;
    };
    AppManager.prototype.getMenu = function () {
        return this.menu;
    };
    AppManager.prototype.setWindow = function (name, element) {
        this.windowManager.set(name, element);
    };
    AppManager.prototype.getWindow = function (name) {
        var element = this.windowManager.get(name);
        if (element) {
            return element;
        }
        throw new Error("[AppManager] - Element with name " + name + " doesn't exist!");
    };
    AppManager.prototype.deleteWindow = function (name) {
        this.windowManager.delete(name);
    };
    return AppManager;
}());
exports.default = new AppManager();
