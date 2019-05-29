"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var application_1 = require("./modules/application");
var vuex_map_fields_1 = require("vuex-map-fields");
var actions = __assign({}, application_1.actionApplication);
var mutations = (_a = {},
    _a['ERROR'] = function (state, error) {
        state.error = error;
        state.success = false;
    },
    _a['SUCCESS'] = function (state) {
        state.error = false;
        state.success = true;
    },
    _a);
var state = function () { return ({
    error: false,
    success: false,
}); };
var modules = {
    application: application_1.application,
};
exports.mapApplicationFields = vuex_map_fields_1.createHelpers({
    getterType: "generale/application/getField",
    mutationType: "generale/application/updateField",
}).mapFields;
exports.generale = {
    namespaced: true,
    actions: actions,
    mutations: mutations,
    state: state,
    modules: modules,
};
