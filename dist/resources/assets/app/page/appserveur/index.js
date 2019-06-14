"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var plugin_1 = __importDefault(require("./core/plugin"));
var router_1 = __importDefault(require("./router/router"));
var components_1 = __importDefault(require("./core/components"));
var App_vue_1 = __importDefault(require("./App.vue"));
require("ant-design-vue/dist/antd.css");
vue_1.default.config.productionTip = false;
new vue_1.default({
    el: '#core',
    plugin: plugin_1.default,
    components: components_1.default,
    router: router_1.default,
    render: function (h) { return h(App_vue_1.default); }
});
