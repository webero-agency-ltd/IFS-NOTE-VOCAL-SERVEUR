"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mustache_1 = __importDefault(require("mustache"));
var htmlentities_1 = require("./htmlentities");
var local = null;
var all = Object.assign({}, window.trans);
var search = function (id, data) {
    if (id && all[id]) {
        //compile si data existe
        if (data) {
            var output = mustache_1.default.render(all[id], data);
            return htmlentities_1.decode(output).replace(/&amp;/g, '&');
        }
        return all[id];
    }
    else if (id) {
        return htmlentities_1.decode(id).replace(/&amp;/g, '&');
    }
    else {
        return '';
    }
};
function lang(id, data) {
    if (data === void 0) { data = {}; }
    return search(id, data);
}
exports.default = lang;
