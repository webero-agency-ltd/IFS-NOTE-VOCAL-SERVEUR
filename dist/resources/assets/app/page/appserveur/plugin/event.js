"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var evs = [];
var on = {};
var MyPlugin = {};
var pause = [];
MyPlugin.install = function (Vue, options) {
    Vue.prototype.on = function (event, func) {
        if (on[event]) { }
        else {
            on[event] = [];
        }
        return on[event].push(func);
    };
    Vue.prototype.emit = function (event, option, tab) {
        if (on[event]) {
            if (typeof (on[event]) == 'function') {
                on[event](option);
            }
            else {
                for (var i = 0; i < on[event].length; i++) {
                    if (pause.indexOf(event) == -1) {
                        on[event][i](option);
                    }
                    else { }
                }
            }
        }
    };
    Vue.prototype.off = function (event, id) {
        if (on[event]) {
            on[event].splice(id - 1, 1);
        }
    };
    Vue.prototype.pause = function (event) {
        if (pause.indexOf(event) == -1) {
            pause.push(event);
        }
    };
    Vue.prototype.play = function (event) {
        if (pause.indexOf(event) != -1) {
            pause.splice(pause.indexOf(event) - 1, 1);
        }
    };
};
vue_1.default.use(MyPlugin);
exports.default = MyPlugin;
