"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mustache_1 = __importDefault(require("mustache"));
var local = null;
var all = Object.assign({}, document.trans);
var search = function (object, id, data) {
    if (id && object[id]) {
        //compile si data existe
        if (data) {
            var output = mustache_1.default.render(object[id], data);
            return window.htmlentities.decode(output).replace(/&amp;/g, '&');
        }
        return object[id];
    }
    else if (id) {
        return window.htmlentities.decode(id).replace(/&amp;/g, '&');
    }
    else {
        return '';
    }
};
function lang(id, data) {
    if (data === void 0) { data = {}; }
    return search(all, id, data);
}
exports.default = lang;
