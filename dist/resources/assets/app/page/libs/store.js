"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.increment = function () {
        if (this.i === null) {
            this.i = 0;
        }
        return this.i++;
    };
    Store.prototype.onChange = function (cbl) {
        this.callback.push(cbl);
    };
    /*
     *    Alerté les composante qu'il y a des changements
    */
    Store.prototype.alert = function () {
        var _this = this;
        this.callback.forEach(function (cbl) { return cbl(_this); });
    };
    Store.prototype.request = function (url, type) {
        if (type === void 0) { type = 'GET'; }
        if (type === 'GET') {
            find = yield fetch(url);
        }
        else {
            find = yield fetch(url);
        }
        if (find.ok) {
            var data = yield find.json();
            this.application = data;
        }
    };
    return Store;
}());
exports.default = Store;
