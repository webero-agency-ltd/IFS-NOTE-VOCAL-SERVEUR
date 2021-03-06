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
/////////////////
var site = require('../config/site');
var request = require('request');
var note = require('../libs/note');
var application = require('../libs/application');
var infusionsoft = require('../libs/infusionsoft');
var trello = require('../libs/trello');
var trello = require('../libs/trello');
var team = require('../libs/team');
function check(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, id, type, apiKey, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _a = req.params, id = _a.id, type = _a.type;
                    apiKey = req.query.apiKey;
                    _c = (_b = res).success;
                    return [4 /*yield*/, application.chackuser(apiKey, id, type)];
                case 1: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
            }
        });
    });
}
exports.check = check;
//récupération d'un infusionsoft en particuler avec tout ces statistique 
function item(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    _b = (_a = res).success;
                    return [4 /*yield*/, application.item(id)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
exports.item = item;
//récupération de tout les compte infusionsoft d'un utilisateur en question 
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    _b = (_a = res).success;
                    return [4 /*yield*/, application.all(req.user.id)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
exports.index = index;
function destroy(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, i, _a, err, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    i = _b.sent();
                    if (!i)
                        throw new AppError('AD0002');
                    //@todo : voire si on surpimme les notes dans infusionsoft ou pas 
                    return [4 /*yield*/, note.delete({ ApplicationId: id })];
                case 2:
                    //@todo : voire si on surpimme les notes dans infusionsoft ou pas 
                    _b.sent();
                    return [4 /*yield*/, team.delete({ ApplicationId: id })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, promise_1.default(i.destroy())];
                case 4:
                    _a = _b.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        throw new AppError('AD0003');
                    }
                    //@ lancer une évenement pour le suprimer plus tard
                    return [2 /*return*/, res.success(true)];
            }
        });
    });
}
exports.destroy = destroy;
//ici on a un redirection qui vien d'infusionsoft
function redirect(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, id, code;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lang = req.lang();
                    _a = req.query, id = _a.id, code = _a.code;
                    return [4 /*yield*/, infusionsoft.findtoken({ id: id, code: code })];
                case 1:
                    //@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
                    //soket ouvert de l'application 
                    if (_b.sent()) {
                        res.redirect('/');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.redirect = redirect;
//re-Récupération des url pour l'obtention des token API infusionsoft et API trello 
function reauthorize(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, type, id, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _a = req.params, type = _a.type, id = _a.id;
                    _c = (_b = res).success;
                    return [4 /*yield*/, application.reauthorize(id)];
                case 1: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
            }
        });
    });
}
exports.reauthorize = reauthorize;
//création d'URL d'authentification dans fusedesk 
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, name, compteId, type, userid, app;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lang = req.lang();
                    _a = req.body, name = _a.name, compteId = _a.compteId, type = _a.type;
                    userid = req.user.id;
                    return [4 /*yield*/, application.create({ name: name, compteId: compteId, type: type, url: '' }, req.user.id)];
                case 1:
                    app = _b.sent();
                    if (app) {
                        return [2 /*return*/, res.success(app)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function redirectTrello(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, Application, User, Team, lang, id, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = this.db, Application = _a.Application, User = _a.User, Team = _a.Team;
                    lang = req.lang();
                    id = req.params.id;
                    token = req.query.token;
                    if (!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, trello.findtoken({ id: id, token: token })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, res.redirect('/')];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    res.render('trello_r.ejs');
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.redirectTrello = redirectTrello;
function redirectTransferwise(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, Application, User, Team, lang, id, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = this.db, Application = _a.Application, User = _a.User, Team = _a.Team;
                    lang = req.lang();
                    id = req.params.id;
                    token = req.query.token;
                    if (!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, trello.findtoken({ id: id, token: token })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, res.redirect('/')];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    res.render('trello_r.ejs');
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.redirectTransferwise = redirectTransferwise;
