"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function to(promise) {
    return promise.then(function (data) {
        return [null, data];
    })
        .catch(function (err) { return [err]; });
}
exports.default = to;
