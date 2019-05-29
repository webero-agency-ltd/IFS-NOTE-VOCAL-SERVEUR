"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function readydom(select, callback) {
    var sel = document.querySelector(select);
    if (sel) {
        callback();
    }
    else {
        setTimeout(function () {
            readydom(select, callback);
        }, 500);
    }
}
exports.default = readydom;
