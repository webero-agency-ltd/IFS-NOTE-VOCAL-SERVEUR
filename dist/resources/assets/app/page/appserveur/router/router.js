"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
var baseurl_1 = __importDefault(require("../libs/baseurl"));
vue_1.default.use(vue_router_1.default);
console.log(window.location);
var router = null;
var baseU = baseurl_1.default(window.location);
if (window.location.pathname == '/' || window.location.pathname == '') {
    router = new vue_router_1.default({
        routes: [
            { name: 'home', path: '/', component: function (h) { return h(require('../page/home')); } },
            { name: 'application', path: '/:id', component: function (h) { return h(require('../page/application')); } },
            //{ name: 'notes', path : '/:id/notes', component : h => h(require('../page/notes')) },
            { name: 'users', path: '/:id/users', component: function (h) { return h(require('../page/users')); } },
            { name: 'option', path: '/:id/option', component: function (h) { return h(require('../page/option')); } },
            { path: '*', redirect: '/' },
        ]
    });
}
else if (window.location.pathname == '/transferwise' || window.location.pathname == '/transferwise/') {
    router = new vue_router_1.default({
        routes: [
            { name: 'transferwise', path: '/', component: function (h) { return h(require('../page/transferwise')); } },
            { path: '*', redirect: '/' },
        ]
    });
}
else if (baseU[0] == "read") {
    router = new vue_router_1.default({
        routes: [
            { name: 'read', path: '/', component: function (h) { return h(require('../page/read')); } },
            { path: '*', redirect: '/read' },
        ]
    });
}
else {
    router = new vue_router_1.default({
        routes: [
            { name: 'external', path: '/', component: function (h) { return h(require('../page/external')); } },
            { name: 'update', path: '/update/:id', component: function (h) { return h(require('../page/external')); } },
            { name: 'option', path: '/option', component: function (h) { return h(require('../page/option-external')); } },
            { name: 'read', path: '/read/:unique', component: function (h) { return h(require('../page/read')); } },
            { path: '*', redirect: '/' },
        ]
    });
}
exports.default = router;
