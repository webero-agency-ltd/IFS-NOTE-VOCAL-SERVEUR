"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("../libs/api"));
var external = /** @class */ (function () {
    function external() {
        this.stade = {
            note: {},
        };
    }
    external.prototype.createNote = function (note) {
        var _a = yield api_1.default('/external/note', 'POST', note), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.external = Object.assign({}, __assign({}, data));
        return [null, this.stade.external];
    };
    /*
     * Récupération des informations des note en paramètre
    */
    external.prototype.findNote = function () {
    };
    return external;
}());
