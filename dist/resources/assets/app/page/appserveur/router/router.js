"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
vue_1.default.use(vue_router_1.default);
var home_1 = __importDefault(require("../page/home"));
var application_1 = __importDefault(require("../page/application"));
var notes_1 = __importDefault(require("../page/notes"));
var users_1 = __importDefault(require("../page/users"));
var option_1 = __importDefault(require("../page/option"));
var router = null;
if (window.location.pathname == '/' || window.location.pathname == '') {
    router = new vue_router_1.default({
        routes: [
            { name: 'home', path: '/', component: home_1.default },
            { name: 'application', path: '/:id', component: application_1.default },
            { name: 'notes', path: '/:id/notes', component: notes_1.default },
            { name: 'users', path: '/:id/users', component: users_1.default },
            { name: 'option', path: '/:id/option', component: option_1.default },
            { path: '*', redirect: '/' },
        ]
    });
}
else if (window.location.pathname == '/transferwise') {
    router = new vue_router_1.default({
        routes: [
            { name: 'transferwise', path: '/', component: function (h) { return h(require('../page/transferwise')); } },
            { path: '*', redirect: '/' },
        ]
    });
}
else {
    router = new vue_router_1.default({
        routes: [
            { name: 'external', path: '/', component: function (h) { return h(require('../page/external')); } },
            { name: 'option', path: '/option', component: function (h) { return h(require('../page/option-external')); } },
            { path: '*', redirect: '/' },
        ]
    });
}
exports.default = router;
