"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var plugLoader = {};
var fun = null;
plugLoader.install = function (Vue, options) {
    Vue.prototype.$showLoader = function (data) {
        if (data === void 0) { data = null; }
        if (!data) {
            return fun(true, '', 'rgba(255, 255, 255, 0.1)');
        }
        fun(true, "<i>" + data.type + "</i><br>" + (data.fullname ? data.fullname : data.url) + " <em>" + ('(' + data.now + '/' + data.totale + ')') + "</em>", 'rgba(255, 255, 255, 0.9)');
    };
    Vue.prototype.$hideLoader = function () {
        fun(false);
    };
    Vue.prototype.$initLoader = function (_) {
        fun = _;
    };
};
vue_1.default.use(plugLoader);
exports.default = plugLoader;
