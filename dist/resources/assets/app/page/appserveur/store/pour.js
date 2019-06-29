"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("../libs/api"));
var pour = /** @class */ (function () {
    function pour() {
        this.stade = {
            pours: [],
        };
    }
    pour.prototype.allPour = function (id) {
        var _a = yield api_1.default('/pour/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.pours = data.slice();
        return [null, this.stade.pours];
    };
    pour.prototype.deletePour = function (id) {
        var _a = yield api_1.default('/pour/' + id, 'DELETE'), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        return [null, this.stade.pours];
    };
    pour.prototype.createPour = function (id, body) {
        var _a = yield api_1.default('/pour/', 'POST', body), err = _a[0], data = _a[1].data;
        return this.allPour(id);
    };
    return pour;
}());
