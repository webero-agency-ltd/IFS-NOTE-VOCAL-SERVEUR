"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
function get(url) {
    return axios_1.default.get(url);
}
exports.get = get;
function post(url, data, option) {
    if (option === void 0) { option = {}; }
    return axios_1.default.post(url, data, option);
}
exports.post = post;
function byMethode(method, url, data, option) {
    if (option === void 0) { option = {}; }
    return axios_1.default({
        method: method,
        url: url,
        data: data,
        option: option
    });
}
exports.byMethode = byMethode;
