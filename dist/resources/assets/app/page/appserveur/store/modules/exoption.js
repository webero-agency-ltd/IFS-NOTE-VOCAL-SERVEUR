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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
var vuex_map_fields_1 = require("vuex-map-fields");
var api_1 = __importDefault(require("../../libs/api"));
var actions = (_a = {},
    _a['FIND_OPTION'] = function (_a, _b) {
        var commit = _a.commit, state = _a.state;
        var namespace = _b.namespace;
        return __awaiter(this, void 0, void 0, function () {
            var _c, err, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('GET OPTION', this);
                        return [4 /*yield*/, api_1.default('/external')];
                    case 1:
                        _c = _d.sent(), err = _c[0], data = _c[1].data;
                        console.log(data);
                        if (err) {
                            //@todo : voire quelle est le module code de celle ci
                            //pour faire appelle pour ajouter des erreus 
                            return [2 /*return*/, commit(namespace + '/ERROR', { message: err.message }, { root: true })];
                        }
                        commit('FIND_OPTION', data);
                        return [2 /*return*/];
                }
            });
        });
    },
    _a['SET_OPTION'] = function (_a, _b) {
        var commit = _a.commit, state = _a.state;
        var namespace = _b.namespace, op = _b.op;
        return __awaiter(this, void 0, void 0, function () {
            var _c, err, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('SET OPTION');
                        console.log(op);
                        return [4 /*yield*/, api_1.default('/external', 'POST', op)];
                    case 1:
                        _c = _d.sent(), err = _c[0], data = _c[1].data;
                        console.log(data);
                        if (err) {
                            return [2 /*return*/, commit(namespace + '/ERROR', { message: err.message }, { root: true })];
                        }
                        else {
                            this.dispatch(namespace + '/exoption/FIND_OPTION', { namespace: namespace }, { root: true });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    /*
     * Création de note par l'intermediaire des API
    */
    _a['CREATE'] = function (_a, _b) {
        var commit = _a.commit, state = _a.state;
        var namespace = _b.namespace, op = _b.op;
        return __awaiter(this, void 0, void 0, function () {
            var _c, err, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('CREATE NOTE');
                        console.log(op);
                        return [4 /*yield*/, api_1.default('/external/note', 'POST', op)];
                    case 1:
                        _c = _d.sent(), err = _c[0], data = _c[1].data;
                        console.log(data);
                        if (err) {
                            return [2 /*return*/, commit(namespace + '/ERROR', { message: err.message }, { root: true })];
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    },
    _a);
var mutations = (_b = {
        updateField: vuex_map_fields_1.updateField
    },
    _b['FIND_OPTION'] = function (state, data) {
        console.log(data);
        state.external = Object.assign({}, __assign({}, data));
    },
    _b);
var getters = {
    getField: vuex_map_fields_1.getField,
};
var state = function () { return ({
    external: { infusionsoft: null, trello: null },
}); };
exports.default = {
    namespaced: true,
    mutations: mutations,
    getters: getters,
    state: state,
    actions: actions,
};
