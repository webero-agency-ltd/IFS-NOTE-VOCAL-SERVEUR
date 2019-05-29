"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vuex_1 = __importDefault(require("vuex"));
var vue_1 = __importDefault(require("vue"));
vue_1.default.use(vuex_1.default);
exports.default = new vuex_1.default.Store({
    strict: process.env.NODE_ENV !== 'production',
});
