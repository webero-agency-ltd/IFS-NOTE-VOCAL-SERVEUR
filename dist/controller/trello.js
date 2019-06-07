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
var promise_1 = __importDefault(require("../libs/promise"));
var url = require('url');
var trello = require('../libs/trello');
var application = require('../libs/application');
function view(req, res) {
    res.render('trello.ejs');
}
exports.view = view;
function membre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, lang, _b, Application, User, Team, id, err, data, i, _c, success, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _b = this.db, Application = _b.Application, User = _b.User, Team = _b.Team;
                    id = req.params.id;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('TMBU001')];
                    }
                    i = data;
                    return [4 /*yield*/, trello.membres({ board: i.compteId, token: i.accessToken })];
                case 2:
                    _c = _d.sent(), success = _c.success, error = _c.error;
                    if (success) {
                        return [2 /*return*/, res.success(success)];
                    }
                    return [2 /*return*/, res.error('TMBU003')];
            }
        });
    });
}
exports.membre = membre;
function boardsUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, Application, User, lang, id, _d, compteId, url, err, data, i;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _c = this.db, Application = _c.Application, User = _c.User;
                    lang = req.lang();
                    id = req.params.id;
                    _d = req.body, compteId = _d.compteId, url = _d.url;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                case 1:
                    _a = _e.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('TMBU001')];
                    }
                    i = data;
                    return [4 /*yield*/, promise_1.default(i.update({ compteId: compteId, url: url }))];
                case 2:
                    _b = _e.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('TMBU002')];
                    }
                    return [2 /*return*/, res.success(i)];
            }
        });
    });
}
exports.boardsUpdate = boardsUpdate;
/*
 * Récupération des bord dans un application trello,
 * et qui correspond a l'utilisateur trello qui a crée le token
*/
function boards(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, Application, User, lang, id, err, data, i, _c, success, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = this.db, Application = _b.Application, User = _b.User;
                    lang = req.lang();
                    id = req.params.id;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('TMB001')];
                    }
                    i = data;
                    return [4 /*yield*/, trello.boards({ token: i.accessToken })];
                case 2:
                    _c = _d.sent(), success = _c.success, error = _c.error;
                    if (success) {
                        return [2 /*return*/, res.success(success)];
                    }
                    return [2 /*return*/, res.error('TMB002')];
            }
        });
    });
}
exports.boards = boards;
/*
 * Récupération des Listes dans un application trello
*/
function lists(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, Application, User, lang, id, err, data, i, _c, success, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = this.db, Application = _b.Application, User = _b.User;
                    lang = req.lang();
                    id = req.params.id;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('TML001')];
                    }
                    i = data;
                    return [4 /*yield*/, trello.lists({ board: i.compteId, token: i.accessToken })];
                case 2:
                    _c = _d.sent(), success = _c.success, error = _c.error;
                    if (success) {
                        return [2 /*return*/, res.success(success)];
                    }
                    console.log(error);
                    return [2 /*return*/, res.error('TML002')];
            }
        });
    });
}
exports.lists = lists;
/*
 * Récupération des label dans un application trello
*/
function label(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, Application, User, lang, id, err, data, i, _c, success, error;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = this.db, Application = _b.Application, User = _b.User;
                    lang = req.lang();
                    id = req.params.id;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('TML001')];
                    }
                    i = data;
                    return [4 /*yield*/, trello.labels({ board: i.compteId, token: i.accessToken })];
                case 2:
                    _c = _d.sent(), success = _c.success, error = _c.error;
                    if (success) {
                        return [2 /*return*/, res.success(success)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.label = label;
