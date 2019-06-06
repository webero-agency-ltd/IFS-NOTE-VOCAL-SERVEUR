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
var site = require('../config/site');
var request = require('../libs/request');
var user = require('../libs/user');
var team = require('../libs/team');
var promise_1 = __importDefault(require("../libs/promise"));
var makeid_1 = __importDefault(require("../libs/makeid"));
var AppError = require('../libs/AppError');
/*
 * Classe de manipulation des actions vers trello
*/
var application = /** @class */ (function () {
    function application() {
    }
    /*
     * Récupération de tout les information d'un application en particulier
     * et ce avec tout les statistique qui va avec
    */
    application.prototype.item = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var Application, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Application = global['db'].Application;
                        return [4 /*yield*/, promise_1.default(Application.findOne({
                                where: { id: id }
                            }))];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        data;
                        if (err)
                            throw new AppError('A0001');
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /*
     * Récupération de tout les applications d'un user, celle qu'il a crée
     * et aussi tout celle dans ma quelle il est membres
     * ou si la fonction na pas d'utilisateur passer en paramètre
     * on cherche tout les applications de cette platforme
    */
    application.prototype.all = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var teams, apps, _i, teams_1, e, _a, err, data, app;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, team.all(id)];
                    case 1:
                        teams = _b.sent();
                        if (!teams) {
                            return [2 /*return*/, []];
                        }
                        apps = [];
                        _i = 0, teams_1 = teams;
                        _b.label = 2;
                    case 2:
                        if (!(_i < teams_1.length)) return [3 /*break*/, 5];
                        e = teams_1[_i];
                        return [4 /*yield*/, promise_1.default(e.getApplication())];
                    case 3:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        if (!err) {
                            app = data.toJSON();
                            //ajout de role dans l'objectapplication qui est récupére 
                            app = __assign({ user_role: e.role }, app);
                            apps = [app].concat(apps);
                        }
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, apps];
                }
            });
        });
    };
    /*
     * Mise a jour d'un information d'un application en question
    */
    application.prototype.update = function (id, objs) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, where, Application, _b, err, data, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        where = {};
                        typeof (id) == "object" ? where = id : where['id'] = id;
                        Application = global['db'].Application;
                        return [4 /*yield*/, promise_1.default(Application.find({ where: where }))];
                    case 1:
                        _b = _c.sent(), err = _b[0], data = _b[1];
                        data;
                        if (err)
                            throw new AppError('ARE001');
                        i = data;
                        return [4 /*yield*/, promise_1.default(i.update(objs))];
                    case 2:
                        _a = _c.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('ARE003');
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /*
     * Création d'application
    */
    application.prototype.create = function (obj, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, unique, Application, _d, err, data, app, u, newteam, url, redirect_uri, redirect_uri;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        unique = makeid_1.default(26) + makeid_1.default(3);
                        Application = global['db'].Application;
                        return [4 /*yield*/, promise_1.default(Application.create(__assign({}, obj, { unique: unique })))];
                    case 1:
                        _d = _e.sent(), err = _d[0], data = _d[1];
                        if (err)
                            throw new AppError('AC001');
                        app = data;
                        return [4 /*yield*/, user.findById(user_id)];
                    case 2:
                        u = _e.sent();
                        if (!u)
                            throw new AppError('AC002');
                        //ajoute de l'utilisateur courant a l'application crée que ce soire un infusionsoft ou un trello 
                        data;
                        return [4 /*yield*/, promise_1.default(app.setAuthor(u))];
                    case 3:
                        _a = _e.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('AC003');
                        return [4 /*yield*/, team.create({ type: obj.type })];
                    case 4:
                        newteam = _e.sent();
                        if (!newteam)
                            throw new AppError('AC004');
                        return [4 /*yield*/, promise_1.default(newteam.setApplication(app))];
                    case 5:
                        //ratacher la team aux compte infusionsoft courant 
                        _b = _e.sent(), err = _b[0], data = _b[1];
                        data;
                        if (err)
                            throw new AppError('AC005');
                        return [4 /*yield*/, promise_1.default(newteam.setUser(u))];
                    case 6:
                        //ratacher la team a l'utilisateur courant 
                        _c = _e.sent(), err = _c[0], data = _c[1];
                        data;
                        if (err)
                            throw new AppError('AC006');
                        url = null;
                        if (obj.type == 'infusionsoft') {
                            redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id=' + app.id;
                            url = 'https://signin.infusionsoft.com/app/oauth/authorize';
                            url += '?client_id=' + site.clientId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=full';
                        }
                        else {
                            redirect_uri = site.urlapp + '/application/trello/redirect/' + app.id;
                            url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key=' + site.trelloKey + '&return_url=' + encodeURIComponent(redirect_uri);
                        }
                        return [2 /*return*/, url];
                }
            });
        });
    };
    /*
     * Création de l'URL de réauthorisation de token
    */
    application.prototype.reauthorize = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, app, redirect_uri, redirect_uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = null;
                        return [4 /*yield*/, this.item(id)];
                    case 1:
                        app = _a.sent();
                        if (!app)
                            throw new AppError('ARA001');
                        if (app.type == 'infusionsoft') {
                            redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id=' + app.id;
                            url = 'https://signin.infusionsoft.com/app/oauth/authorize';
                            url += '?client_id=' + site.clientId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=full';
                        }
                        else {
                            redirect_uri = site.urlapp + '/application/trello/redirect/' + app.id;
                            url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key=' + site.trelloKey + '&return_url=' + encodeURIComponent(redirect_uri);
                        }
                        return [2 /*return*/, url];
                }
            });
        });
    };
    return application;
}());
module.exports = new application();
