"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
vue_1.default.use(vue_router_1.default);
var profile_1 = __importDefault(require("../page/profile"));
var manager_1 = __importDefault(require("../page/manager"));
var History_1 = __importDefault(require("../page/History"));
var router = new vue_router_1.default({
    routes: [
        { name: 'profile', path: '/', component: profile_1.default },
        { name: 'manager', path: '/manager', component: manager_1.default },
        { name: 'history', path: '/history', component: History_1.default },
        { path: '*', redirect: '/' },
    ]
});
exports.default = router;
