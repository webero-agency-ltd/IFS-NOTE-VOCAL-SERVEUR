"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeid(length) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
exports.default = makeid;
