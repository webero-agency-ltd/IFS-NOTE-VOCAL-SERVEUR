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
var api_1 = __importDefault(require("../libs/api"));
var application = /** @class */ (function () {
    function application() {
        this.stade = {
            applications: [],
            trellos: [],
            infusionsofts: [],
            item: {},
        };
    }
    /*
     * Add borad a l'application trello
    */
    application.prototype.addBoard = function (op) {
        return __awaiter(this, void 0, void 0, function () {
            var id, compte, url, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = op.id, compte = op.compte, url = op.url;
                        console.log(id, compte, url);
                        return [4 /*yield*/, api_1.default('/trello/boards/' + id, 'POST', { compteId: compte, url: url })];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        return [2 /*return*/, [null, true]];
                }
            });
        });
    };
    application.prototype.destroyApplication = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/application/delete/' + id, 'DELETE')];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        return [2 /*return*/, [null, true]];
                }
            });
        });
    };
    application.prototype.addApplication = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var compteId, name, type, body, _a, err, data, win;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        compteId = option.compteId, name = option.name, type = option.type;
                        body = {};
                        if (name && compteId) {
                            body = { name: name, compteId: compteId, type: type };
                        }
                        else if (name) {
                            body = { name: name, type: type };
                        }
                        else {
                            //@TODO: ajoute une erreur dans cette element 
                            return [2 /*return*/, [err, null]];
                        }
                        return [4 /*yield*/, api_1.default('/application', 'POST', body)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        win = window.open(data, '_blank');
                        return [2 /*return*/, win.focus()];
                }
            });
        });
    };
    /*
     * Reresh token manuelement
    */
    application.prototype.reAuthorize = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data, win;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default("/application/reauthorize/all/" + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        win = window.open(data, '_blank');
                        return [2 /*return*/, win.focus()];
                }
            });
        });
    };
    /*
     * Récupération de tout les applications
    */
    application.prototype.allApplication = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/application')];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        this.stade.applications = data.slice();
                        this.trellos();
                        this.infusionsofts();
                        return [2 /*return*/, [null, this.stade.applications]];
                }
            });
        });
    };
    /*
     * Focus sur une application en particulier pour récupérer ces donners
    */
    application.prototype.itemApplication = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/application/item/' + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        this.stade.item = Object.assign({}, __assign({}, data));
                        return [2 /*return*/, [null, this.stade.item]];
                }
            });
        });
    };
    /*
     * Liste de tout les applications trellos
    */
    application.prototype.trellos = function () {
        if (this.stade.applications.length) {
            return this.stade.trellos = this.stade.applications.filter(function (e) { return e.type == 'trello'; });
        }
        return [];
    };
    /*
     * Liste de tout les applications infusionsoft
    */
    application.prototype.infusionsofts = function () {
        if (this.stade.applications.length) {
            return this.stade.infusionsofts = this.stade.applications.filter(function (e) { return e.type == 'infusionsoft'; });
        }
        return [];
    };
    return application;
}());
exports.default = new application();
