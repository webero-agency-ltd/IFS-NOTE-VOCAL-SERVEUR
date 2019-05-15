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
    Vue.prototype._$on = function (event, func) {
        if (on[event]) {
        }
        else {
            on[event] = [];
        }
        return on[event].push(func);
    };
    Vue.prototype._$emit = function (event, option, tab) {
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
    Vue.prototype._$emitback = function (event, option) {
        chrome.runtime.sendMessage({
            name: event,
            data: option
        });
    };
    Vue.prototype._$off = function (event, id) {
        if (on[event]) {
            on[event].splice(id - 1, 1);
        }
    };
    Vue.prototype._$pause = function (event) {
        if (pause.indexOf(event) == -1) {
            pause.push(event);
        }
    };
    Vue.prototype._$play = function (event) {
        if (pause.indexOf(event) != -1) {
            pause.splice(pause.indexOf(event) - 1, 1);
        }
    };
};
vue_1.default.use(MyPlugin);
exports.default = MyPlugin;
