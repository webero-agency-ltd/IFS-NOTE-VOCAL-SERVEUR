"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var lang_1 = __importDefault(require("../../lib/lang"));
var plugLang = {};
plugLang.install = function (Vue, options) {
    Vue.prototype.$lang = lang_1.default;
};
vue_1.default.use(plugLang);
exports.default = plugLang;
