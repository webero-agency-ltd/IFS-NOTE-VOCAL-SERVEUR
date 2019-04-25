"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var bdd_1 = require("../../lib/bdd");
var plugModel = {};
plugModel.install = function (Vue, options) {
    Vue.prototype.$groupe = bdd_1.groupe();
    Vue.prototype.$config = bdd_1.config();
    Vue.prototype.$friends = bdd_1.friends();
    Vue.prototype.$users = bdd_1.users();
    Vue.prototype.$category = bdd_1.category();
    Vue.prototype.$session = bdd_1.session();
    Vue.prototype.$message = bdd_1.message();
};
vue_1.default.use(plugModel);
exports.default = plugModel;
