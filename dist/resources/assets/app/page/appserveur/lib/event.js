"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
*	Evenement de google chrome qui nous permet de communiqué entre backend, popup, injectscript
*/
var on = {};
function $on(event, func) {
    if (on[event]) { }
    else {
        on[event] = [];
    }
    return on[event].push(func);
}
exports.$on = $on;
function $emit(event, option) {
    chrome.runtime.sendMessage({
        name: event,
        data: option,
    });
}
exports.$emit = $emit;
chrome.runtime.onMessage.addListener(function (msg, sender) {
    var event = msg.name;
    if (on[event]) {
        for (var i = 0; i < on[event].length; i++) {
            on[event][i](msg.data);
        }
    }
});
