"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vue_router_1 = __importDefault(require("vue-router"));
vue_1.default.use(vue_router_1.default);
var home_1 = __importDefault(require("../page/home"));
var infusionsoft_1 = __importDefault(require("../page/infusionsoft"));
var notes_1 = __importDefault(require("../page/notes"));
var users_1 = __importDefault(require("../page/users"));
var router = new vue_router_1.default({
    routes: [
        { name: 'home', path: '/', component: home_1.default },
        { name: 'infusionsoft', path: '/:id', component: infusionsoft_1.default },
        { name: 'notes', path: '/:id/notes', component: notes_1.default },
        { name: 'users', path: '/:id/users', component: users_1.default },
        { path: '*', redirect: '/' },
    ]
});
exports.default = router;