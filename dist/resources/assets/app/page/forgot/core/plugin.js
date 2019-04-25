"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var lang_1 = __importDefault(require("../plugin/lang"));
vue_1.default.use(lang_1.default);
exports.default = vue_1.default;
