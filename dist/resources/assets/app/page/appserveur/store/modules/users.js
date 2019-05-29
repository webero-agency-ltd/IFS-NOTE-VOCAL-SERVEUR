"use strict";
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
    //Récupération de tout les team de cette applications 
    _a['ALL_TEAM'] = function (_a, _b) {
        var commit = _a.commit, state = _a.state;
        var namespace = _b.namespace, id = _b.id;
        return __awaiter(this, void 0, void 0, function () {
            var _c, err, data, items;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, api_1.default('/team/application/' + id)];
                    case 1:
                        _c = _d.sent(), err = _c[0], data = _c[1].data;
                        if (err) {
                            commit(namespace + '/ERROR', { message: err.message }, { root: true });
                        }
                        items = data.map(function (_a) {
                            var contactid = _a.contactid, fullname = _a.fullname, email = _a.email, role = _a.role;
                            return { id: contactid, fullname: fullname, email: email, role: role };
                        });
                        commit('ALL_TEAM', items);
                        return [2 /*return*/];
                }
            });
        });
    },
    _a['MEMBRE_TRELLO'] = function (_a, _b) {
        var commit = _a.commit, state = _a.state;
        var namespace = _b.namespace, id = _b.id;
        return __awaiter(this, void 0, void 0, function () {
            var _c, err, data, items;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, api_1.default('/trello/membre/' + id)];
                    case 1:
                        _c = _d.sent(), err = _c[0], data = _c[1].data;
                        if (err) {
                            commit(namespace + '/ERROR', { message: err.message }, { root: true });
                        }
                        console.log(data);
                        items = data.map(function (_a) {
                            var id = _a.id, fullName = _a.fullName;
                            return { id: id, fullName: fullName, add: id };
                        }).filter(function (e) {
                            if (e.id) {
                                return true;
                            }
                            return false;
                        });
                        commit('MEMBRE_TRELLO', items);
                        return [2 /*return*/];
                }
            });
        });
    },
    _a['MEMBRE_INFUSIONSOFT'] = function (_a, _b) {
        var commit = _a.commit, state = _a.state;
        var namespace = _b.namespace, id = _b.id;
        return __awaiter(this, void 0, void 0, function () {
            var _c, err, data, items;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, api_1.default('/infusionsoft/membre/' + id)];
                    case 1:
                        _c = _d.sent(), err = _c[0], data = _c[1].data;
                        if (err) {
                            commit(namespace + '/ERROR', { message: err.message }, { root: true });
                        }
                        console.log(data);
                        items = data.map(function (_a) {
                            var id = _a.id, preferred_name = _a.preferred_name;
                            return { id: id, fullName: preferred_name, add: id };
                        }).filter(function (e) {
                            if (e.id) {
                                return true;
                            }
                            return false;
                        });
                        console.log(items);
                        commit('MEMBRE_INFUSIONSOFT', items);
                        return [2 /*return*/];
                }
            });
        });
    },
    _a);
var mutations = (_b = {
        updateField: vuex_map_fields_1.updateField
    },
    _b['ALL_TEAM'] = function (state, data) {
        state.teams = data.slice();
    },
    _b['MEMBRE_TRELLO'] = function (state, data) {
        state.membreTrello = data.slice();
    },
    _b['MEMBRE_INFUSIONSOFT'] = function (state, data) {
        state.membreInfusionsoft = data.slice();
    },
    _b);
var getters = {
    getField: vuex_map_fields_1.getField,
};
var state = function () { return ({
    teams: [],
    membreTrello: [],
    membreInfusionsoft: [],
}); };
exports.default = {
    namespaced: true,
    mutations: mutations,
    getters: getters,
    state: state,
    actions: actions,
};
