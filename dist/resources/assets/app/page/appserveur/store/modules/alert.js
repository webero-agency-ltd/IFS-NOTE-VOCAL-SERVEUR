"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var vuex_map_fields_1 = require("vuex-map-fields");
var actions = {};
var mutations = (_a = {
        updateField: vuex_map_fields_1.updateField
    },
    _a['SET_ERRORS'] = function (state, data) {
        state.errors = data.slice();
    },
    _a['SET_SUCCESS'] = function (state, data) {
        state.success = data.slice();
    },
    _a);
var getters = {
    getField: vuex_map_fields_1.getField,
};
var state = function () { return ({
    errors: [],
    success: [],
}); };
exports.default = {
    namespaced: true,
    mutations: mutations,
    getters: getters,
    state: state,
    actions: actions,
};
