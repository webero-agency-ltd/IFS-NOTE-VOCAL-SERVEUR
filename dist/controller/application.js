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
var makeid_1 = __importDefault(require("../libs/makeid"));
var promise_1 = __importDefault(require("../libs/promise"));
/////////////////
var site = require('../config/site');
var request = require('request');
var querystring = require('querystring');
var urlAPI = 'https://api.infusionsoft.com/crm/rest/v1';
function check(req, res) {
    var lang = req.lang();
    var _a = this.db, Application = _a.Application, User = _a.User;
    //récupération 
    var _b = req.params, id = _b.id, type = _b.type;
    var token = req.query.token;
    User.findOne({
        where: { rememberToken: token }
    })
        .then(function (u) {
        if (u) {
            if (type == 'infusionsoft') {
                Application.find({ where: { compteId: id } })
                    .then(function (i) {
                    if (i) {
                        u.getTeams({ where: { ApplicationId: i.id } })
                            .then(function (t) {
                            if (t.length > 0) {
                                return res.json({ success: true });
                            }
                            res.json({ error: true, code: 'CA0001' });
                        })
                            .catch(function (e) { return res.json({ error: true, code: 'CA0002' }); });
                    }
                    else {
                        res.json({ error: true, code: 'CA0001' });
                    }
                })
                    .catch(function (e) { return res.json({ error: true, code: 'CA0002' }); });
            }
            else if (type == 'trello') {
                //@todo : méthode de validation a cherche encore 
                return res.json({ success: true });
            }
        }
        else {
            res.json({ error: true, code: 'CA0003' });
        }
    })
        .catch(function (e) {
        (function (e) { return res.json({ error: true, code: 'CA0004' }); });
    });
}
exports.check = check;
//récupération d'un infusionsoft en particuler avec tout ces statistique 
function item(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, lang, _b, Application, User, id, err, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    _b = this.db, Application = _b.Application, User = _b.User;
                    id = req.params.id;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                case 1:
                    _a = _c.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('AIT001')];
                    }
                    return [2 /*return*/, res.success(data)];
            }
        });
    });
}
exports.item = item;
//récupération de tout les compte infusionsoft d'un utilisateur en question 
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, lang, _d, Application, Team, User, err, data, apps, _i, data_1, e, app;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    lang = req.lang();
                    _d = this.db, Application = _d.Application, Team = _d.Team, User = _d.User;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: req.user.id }
                        }))];
                case 1:
                    _a = _e.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('AID001')];
                    }
                    //récupération de tout les teams que l'utilisateur est connecter 
                    data;
                    return [4 /*yield*/, promise_1.default(data.getTeams())];
                case 2:
                    _b = _e.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('AID002')];
                    }
                    apps = [];
                    _i = 0, data_1 = data;
                    _e.label = 3;
                case 3:
                    if (!(_i < data_1.length)) return [3 /*break*/, 6];
                    e = data_1[_i];
                    return [4 /*yield*/, promise_1.default(e.getApplication())];
                case 4:
                    _c = _e.sent(), err = _c[0], data = _c[1];
                    if (!err) {
                        app = data.toJSON();
                        app = __assign({ user_role: e.role }, app);
                        apps = [app].concat(apps);
                    }
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, res.success(apps)];
            }
        });
    });
}
exports.index = index;
//ici on a un redirection qui vien d'infusionsoft
function redirect(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, Application, User, Team, err, data, user, lang, _c, id, code, redirect_uri, url, form, formData, contentLength;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = this.db, Application = _b.Application, User = _b.User, Team = _b.Team;
                    err = null;
                    data = null;
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: req.user.id }
                        }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    user = data;
                    if (err) {
                        return [2 /*return*/, res.error('AID000')];
                    }
                    lang = req.lang();
                    _c = req.query, id = _c.id, code = _c.code;
                    redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id=' + id;
                    url = 'https://api.infusionsoft.com/token';
                    form = {
                        client_id: site.clientId,
                        client_secret: site.clientSecret,
                        code: code,
                        grant_type: 'authorization_code',
                        redirect_uri: redirect_uri
                    };
                    formData = querystring.stringify(form);
                    contentLength = formData.length;
                    request({
                        headers: {
                            'Content-Length': contentLength,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        uri: url,
                        body: formData,
                        method: 'POST'
                    }, function (error, _res, body) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a, _b, err_1, data_2, i_1, jsont, url_1;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!(!error && _res.statusCode == 200)) return [3 /*break*/, 3];
                                        err_1 = null;
                                        return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                                    case 1:
                                        _a = _c.sent(), err_1 = _a[0], data_2 = _a[1];
                                        if (err_1) {
                                            return [2 /*return*/, res.error('ARE001')];
                                        }
                                        i_1 = data_2;
                                        return [4 /*yield*/, promise_1.default(i_1.update({ accessToken: body }))];
                                    case 2:
                                        //update de l'access token dans le compte de l'application 
                                        //redirection a la page home de l'application 
                                        //@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
                                        //soket ouvert de l'application 
                                        //s'il ny a pas de soket ouvert, alors, on redirge a la base home de l'application
                                        _b = _c.sent(), err_1 = _b[0], data_2 = _b[1];
                                        if (err_1) {
                                            return [2 /*return*/, res.error('ARE003')];
                                        }
                                        jsont = void 0;
                                        try {
                                            jsont = JSON.parse(body);
                                        }
                                        catch (e) {
                                            jsont = {};
                                        }
                                        url_1 = urlAPI + '/users/?access_token=' + jsont['access_token'];
                                        return [2 /*return*/, request({
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                uri: url_1,
                                                method: 'GET'
                                            }, function (error, _res, body) {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var _a, _b, reponse, id_1, data_3, T;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                if (!(!error && _res.statusCode == 200)) return [3 /*break*/, 4];
                                                                reponse = void 0;
                                                                try {
                                                                    reponse = JSON.parse(body);
                                                                }
                                                                catch (e) {
                                                                    reponse = [];
                                                                }
                                                                if (!reponse['users']) return [3 /*break*/, 3];
                                                                id_1 = reponse['users'][0].id;
                                                                data_3 = null;
                                                                data_3;
                                                                return [4 /*yield*/, promise_1.default(Team.findOne({
                                                                        where: { ApplicationId: i_1.id }
                                                                    }))];
                                                            case 1:
                                                                _a = _c.sent(), err_1 = _a[0], data_3 = _a[1];
                                                                T = data_3;
                                                                return [4 /*yield*/, promise_1.default(T.update({ contactid: id_1 }))];
                                                            case 2:
                                                                _b = _c.sent(), err_1 = _b[0], data_3 = _b[1];
                                                                _c.label = 3;
                                                            case 3: return [2 /*return*/, res.redirect('/')];
                                                            case 4: return [2 /*return*/, res.error('ARE004')];
                                                        }
                                                    });
                                                });
                                            })];
                                    case 3: return [2 /*return*/, res.error('ARE002')];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.redirect = redirect;
//re-Récupération des url pour l'obtention des token API infusionsoft et API trello 
function reauthorize(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, lang, _b, Application, User, Team, _c, type, id, err, data, I, redirect_uri, url, redirect_uri, url;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _b = this.db, Application = _b.Application, User = _b.User, Team = _b.Team;
                    _c = req.params, type = _c.type, id = _c.id;
                    err = null;
                    return [4 /*yield*/, promise_1.default(Application.findOne({
                            where: { id: id }
                        }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('ARA001')];
                    }
                    I = data;
                    if (I.type == 'infusionsoft') {
                        redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id=' + I.id;
                        url = 'https://signin.infusionsoft.com/app/oauth/authorize';
                        url += '?client_id=' + site.clientId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=full';
                        return [2 /*return*/, res.success(url)];
                    }
                    else {
                        redirect_uri = site.urlapp + '/application/trello/redirect/' + I.id;
                        url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key=' + site.trelloKey + '&return_url=' + encodeURIComponent(redirect_uri);
                        return [2 /*return*/, res.success(url)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.reauthorize = reauthorize;
//tache chrone de mise a joure de accessToken
function update(req, res) {
}
exports.update = update;
//création d'URL d'authentification dans fusedesk 
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, lang, _g, Application, User, Team, _h, name, compteId, type, userid, unique, err, data, I, user, newteam, redirect_uri, url, redirect_uri, url;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    lang = req.lang();
                    _g = this.db, Application = _g.Application, User = _g.User, Team = _g.Team;
                    _h = req.body, name = _h.name, compteId = _h.compteId, type = _h.type;
                    userid = req.user.id;
                    unique = makeid_1.default(7) + '-' + makeid_1.default(7) + '-' + makeid_1.default(7);
                    //création de compte infusionsoft 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.create({ name: name, unique: unique, compteId: compteId, type: type, url: '' }))];
                case 1:
                    _a = _j.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('AC001')];
                    }
                    I = data;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: req.user.id }
                        }))];
                case 2:
                    _b = _j.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('AC002')];
                    }
                    user = data;
                    //ajoute de l'utilisateur courant a l'application crée que ce soire un infusionsoft ou un trello 
                    data;
                    return [4 /*yield*/, promise_1.default(I.setAuthor(user))];
                case 3:
                    _c = _j.sent(), err = _c[0], data = _c[1];
                    if (err) {
                        return [2 /*return*/, res.error('AC003')];
                    }
                    //Création de team de l'applications 
                    data;
                    return [4 /*yield*/, promise_1.default(Team.create({ role: 'admin', type: type }))];
                case 4:
                    _d = _j.sent(), err = _d[0], data = _d[1];
                    if (err) {
                        return [2 /*return*/, res.error('AC004')];
                    }
                    newteam = data;
                    //ratacher la team aux compte infusionsoft courant 
                    data;
                    return [4 /*yield*/, promise_1.default(newteam.setApplication(I))];
                case 5:
                    _e = _j.sent(), err = _e[0], data = _e[1];
                    if (err) {
                        return [2 /*return*/, res.error('AC005')];
                    }
                    //ratacher la team a l'utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(newteam.setUser(user))];
                case 6:
                    _f = _j.sent(), err = _f[0], data = _f[1];
                    if (err) {
                        return [2 /*return*/, res.error('AC006')];
                    }
                    if (type == 'infusionsoft') {
                        redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id=' + I.id;
                        url = 'https://signin.infusionsoft.com/app/oauth/authorize';
                        url += '?client_id=' + site.clientId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=full';
                        return [2 /*return*/, res.success(url)];
                    }
                    else {
                        redirect_uri = site.urlapp + '/application/trello/redirect/' + I.id;
                        url = 'https://trello.com/1/authorize?expiration=30days&name=NoteVocal&scope=read,write&response_type=token&key=' + site.trelloKey + '&return_url=' + encodeURIComponent(redirect_uri);
                        return [2 /*return*/, res.success(url)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function redirectTrello(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, Application, User, Team, lang, id, token, err, data, i, user, urlAPI_1, url;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _d = this.db, Application = _d.Application, User = _d.User, Team = _d.Team;
                    lang = req.lang();
                    id = req.params.id;
                    token = req.query.token;
                    //création de compte infusionsoft 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: id } }))];
                case 1:
                    _a = _e.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('ART001')];
                    }
                    i = data;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: req.user.id }
                        }))];
                case 2:
                    _b = _e.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('ART002')];
                    }
                    user = data;
                    if (!token) return [3 /*break*/, 4];
                    return [4 /*yield*/, promise_1.default(i.update({ accessToken: token }))];
                case 3:
                    _c = _e.sent(), err = _c[0], data = _c[1];
                    if (err) {
                        return [2 /*return*/, res.error('ART004')];
                    }
                    urlAPI_1 = 'https://api.trello.com/1/';
                    url = urlAPI_1 + 'members/me?key=' + site.trelloKey + '&token=' + token;
                    request({
                        uri: url,
                        method: 'GET'
                    }, function (error, _res, body) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a, _b, jsonp, id, T;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        try {
                                            jsonp = JSON.parse(body);
                                        }
                                        catch (e) {
                                            jsonp = [];
                                        }
                                        id = jsonp.id;
                                        return [4 /*yield*/, promise_1.default(Team.findOne({
                                                where: { ApplicationId: i.id }
                                            }))];
                                    case 1:
                                        //ajoute de l'id de l'user qui est connecté aux compte trello team 
                                        _a = _c.sent(), err = _a[0], data = _a[1];
                                        T = data;
                                        return [4 /*yield*/, promise_1.default(T.update({ contactid: id }))];
                                    case 2:
                                        _b = _c.sent(), err = _b[0], data = _b[1];
                                        //redirection a la page home de l'application 
                                        //@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
                                        //soket ouvert de l'application 
                                        //s'il ny a pas de soket ouvert, alors, on redirge a la base home de l'application 
                                        res.redirect('/');
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [3 /*break*/, 5];
                case 4:
                    res.render('trello_r.ejs');
                    _e.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.redirectTrello = redirectTrello;
