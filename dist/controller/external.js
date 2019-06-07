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
var url = require('url');
var request = require('request');
var site = require('../config/site');
var moment = require('moment');
var promise_1 = __importDefault(require("../libs/promise"));
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, lang, _c, Application, User, Team, Pour, err, data, user;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _c = this.db, Application = _c.Application, User = _c.User, Team = _c.Team, Pour = _c.Pour;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: req.user.id }
                        }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('EI0001')];
                    }
                    user = data;
                    return [4 /*yield*/, promise_1.default(user.getExternal())];
                case 2:
                    _b = _d.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('EI0002')];
                    }
                    if (!data) {
                        data = { infusionsoft: null, trello: null };
                    }
                    return [2 /*return*/, res.success(data)];
            }
        });
    });
}
exports.index = index;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, lang, _e, Application, User, Team, External, _f, infusionsoft, trello, err, data, user, externaleInstance;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    lang = req.lang();
                    _e = this.db, Application = _e.Application, User = _e.User, Team = _e.Team, External = _e.External;
                    _f = req.body, infusionsoft = _f.infusionsoft, trello = _f.trello;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: req.user.id }
                        }))];
                case 1:
                    _a = _g.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('EC0001')];
                    }
                    user = data;
                    //récupération externale si existe 
                    data;
                    return [4 /*yield*/, promise_1.default(External.findOne({
                            where: { UserId: req.user.id }
                        }))];
                case 2:
                    _b = _g.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('EI0003')];
                    }
                    externaleInstance = data;
                    if (externaleInstance) {
                        //ici l'option external existe, donc on fait juste la mise a jour de celle ci 
                        externaleInstance.update({ infusionsoft: infusionsoft, trello: trello });
                        return [2 /*return*/, res.success()];
                    }
                    //Création de team de l'applications 
                    data;
                    return [4 /*yield*/, promise_1.default(External.create({ infusionsoft: infusionsoft, trello: trello }))];
                case 3:
                    _c = _g.sent(), err = _c[0], data = _c[1];
                    if (err) {
                        return [2 /*return*/, res.error('EI0004')];
                    }
                    externaleInstance = data;
                    return [4 /*yield*/, promise_1.default(user.setExternal(externaleInstance))];
                case 4:
                    _d = _g.sent(), err = _d[0], data = _d[1];
                    if (err) {
                        return [2 /*return*/, res.error('EC0002')];
                    }
                    return [2 /*return*/, res.success(data)];
            }
        });
    });
}
exports.create = create;
function note(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, lang, _d, Application, User, Team, Pour, _e, title, compteId, description, type, pour, prioriter, date, contactId, userid, err, data, p, i, label, body, token, token;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    lang = req.lang();
                    _d = this.db, Application = _d.Application, User = _d.User, Team = _d.Team, Pour = _d.Pour;
                    _e = req.body, title = _e.title, compteId = _e.compteId, description = _e.description, type = _e.type, pour = _e.pour, prioriter = _e.prioriter, date = _e.date, contactId = _e.contactId;
                    userid = req.user.id;
                    console.log('---------------------------');
                    console.log(title, description, type, pour, prioriter, date, contactId, compteId);
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Pour.findOne({
                            where: { id: pour }
                        }))];
                case 1:
                    _a = _f.sent(), err = _a[0], data = _a[1];
                    if (err) {
                        return [2 /*return*/, res.error('EN0001')];
                    }
                    p = data;
                    data;
                    return [4 /*yield*/, promise_1.default(Application.findOne({
                            where: { id: compteId }
                        }))];
                case 2:
                    _b = _f.sent(), err = _b[0], data = _b[1];
                    if (err && !data) {
                        return [2 /*return*/, res.error('EN0002')];
                    }
                    i = data;
                    if (!(type == 'trello')) return [3 /*break*/, 4];
                    //récupération de l'id du label s'il existe 
                    data;
                    return [4 /*yield*/, promise_1.default(Pour.findOne({
                            where: { id: prioriter }
                        }))];
                case 3:
                    _c = _f.sent(), err = _c[0], data = _c[1];
                    label = '';
                    if (data) {
                        label = data.appId;
                    }
                    body = { idList: p.cardId, name: title, desc: description, due: moment(date, 'YYYY-MM-DDTHH:mm:ssZ').clone().format('YYYY-MM-DD') };
                    if (label) {
                        body['idLabels'] = label;
                    }
                    console.log(label);
                    if (p.appId !== 'generale') {
                        body['idMembers'] = p.appId;
                    }
                    request({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        uri: 'https://api.trello.com/1/cards?token=' + i.accessToken + '&key=' + site.trelloKey,
                        body: JSON.stringify(body),
                        method: 'POST'
                    }, function (error, _res, body) {
                        console.log(error, body);
                        if (!error && _res.statusCode == 200) {
                            var reponse = void 0;
                            try {
                                reponse = JSON.parse(body);
                            }
                            catch (e) {
                                reponse = {};
                            }
                            return res.success(reponse);
                        }
                        console.log(body);
                        return res.error('EN0003');
                    });
                    return [3 /*break*/, 5];
                case 4:
                    if (type == 'infusionsoft' && pour !== 'default') {
                        console.log('--- TASK CREATE');
                        token = void 0;
                        try {
                            token = JSON.parse(i.accessToken);
                        }
                        catch (e) {
                            return [2 /*return*/, res.error('EN0004')];
                        }
                        request({
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            uri: 'https://api.infusionsoft.com/crm/rest/v1/tasks/?access_token=' + token['access_token'],
                            body: JSON.stringify({ contact: { id: contactId }, description: description, due_date: date, title: title, priority: prioriter, user_id: p.appId }),
                            method: 'POST'
                        }, function (error, _res, body) {
                            if (!error && (_res.statusCode == 200 || _res.statusCode == 201)) {
                                var reponse = void 0;
                                try {
                                    reponse = JSON.parse(body);
                                }
                                catch (e) {
                                    reponse = {};
                                }
                                return res.json({ success: true, data: reponse });
                            }
                            else {
                                console.log(body);
                                console.log({ contact: { id: contactId }, description: description, due_date: date, title: title, priority: prioriter, user_id: p.appId });
                                return res.error('EN0005');
                            }
                        });
                    }
                    else if (type == 'infusionsoft' && pour == 'default') {
                        console.log('--- NOTE CREATE');
                        token = void 0;
                        try {
                            token = JSON.parse(i.accessToken);
                        }
                        catch (e) {
                            return [2 /*return*/, res.error('EN0006')];
                        }
                        request({
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            uri: 'https://api.infusionsoft.com/crm/rest/v1/notes/?access_token=' + token['access_token'],
                            body: JSON.stringify({ contact_id: contactId, body: description, title: title }),
                            method: 'POST'
                        }, function (error, _res, body) {
                            console.log('----------', body);
                            if (!error && (_res.statusCode == 200 || _res.statusCode == 201)) {
                                var reponse = void 0;
                                try {
                                    reponse = JSON.parse(body);
                                }
                                catch (e) {
                                    reponse = {};
                                }
                                return res.json({ success: true, data: reponse });
                            }
                            return res.error('EN0007');
                        });
                    }
                    _f.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.note = note;
