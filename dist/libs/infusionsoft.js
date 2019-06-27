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
var site = require('../config/site');
var request = require('../libs/request');
var querystring = require('querystring');
var AppError = require('../libs/AppError');
var application = require('../libs/application');
var team = require('../libs/team');
var json = require('../libs/json');
/*
 * Classe de manipulation des actions vers trello
*/
var infusionsoft = /** @class */ (function () {
    function infusionsoft() {
        this.api = 'https://api.infusionsoft.com/crm/rest/v1';
    }
    /*
     * Récupération des membres d'infusionsoft
    */
    infusionsoft.prototype.membre = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var app, jsont, _a, error, info, body, reponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, application.item(id)];
                    case 1:
                        app = _b.sent();
                        jsont = json(app.accessToken, {});
                        return [4 /*yield*/, request.get(this.api + '/users/?access_token=' + jsont['access_token'])];
                    case 2:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('IM0003');
                        reponse = json(body, {});
                        return [2 /*return*/, reponse['users'] ? reponse['users'] : []];
                }
            });
        });
    };
    /*
     * Récupération des listes des contacts d'infusionsoft
    */
    infusionsoft.prototype.contacts = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var app, token, _a, error, info, body, reponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, application.item(id)];
                    case 1:
                        app = _b.sent();
                        token = json(app.accessToken, {});
                        return [4 /*yield*/, request.get(this.api + '/contacts/?access_token=' + token['access_token'])];
                    case 2:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('IC0003');
                        reponse = json(body, {});
                        return [2 /*return*/, reponse['contacts'] ? reponse['contacts'].map(function (e) {
                                return __assign({ text: e.family_name + ' ' + e.given_name, value: e.id }, e);
                            }) : []];
                }
            });
        });
    };
    /*
     * Récupération des listes des contacts d'infusionsoft
    */
    infusionsoft.prototype.notes = function (id, note) {
        return __awaiter(this, void 0, void 0, function () {
            var app, token, _a, error, info, body, reponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, application.item(id)];
                    case 1:
                        app = _b.sent();
                        token = json(app.accessToken, {});
                        return [4 /*yield*/, request.get(this.api + '/notes/' + note + '/?access_token=' + token['access_token'])];
                    case 2:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('IC0007');
                        reponse = json(body, {});
                        return [2 /*return*/, reponse.id ? reponse : {}];
                }
            });
        });
    };
    infusionsoft.prototype.tasks = function (id, note) {
        return __awaiter(this, void 0, void 0, function () {
            var app, token, _a, error, info, body, reponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, application.item(id)];
                    case 1:
                        app = _b.sent();
                        token = json(app.accessToken, {});
                        return [4 /*yield*/, request.get(this.api + '/tasks/' + note + '/?access_token=' + token['access_token'])];
                    case 2:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('IC0007');
                        reponse = json(body, {});
                        return [2 /*return*/, reponse.id ? reponse : {}];
                }
            });
        });
    };
    /*
     * Récupération de l'access toke
    */
    infusionsoft.prototype.findtoken = function (_a) {
        var id = _a.id, code = _a.code;
        return __awaiter(this, void 0, void 0, function () {
            var redirect_uri, url, form, _b, error, info, body, jsont, _c, error, info, body, reponse, _d, error, info, body, hooks, reverified, existed, _i, hooks_1, _e, hookUrl, eventKey, key, status_1, _f, reverified_1, _g, hookUrl, eventKey, key, status_2, form_1, headers, _h, error, info, body, events, _j, events_1, e, form_2, headers, _k, error, info, body;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        redirect_uri = site.urlapp + '/application/infusionsoft/redirect?id=' + id;
                        url = 'https://api.infusionsoft.com/token';
                        form = {
                            client_id: site.clientId,
                            client_secret: site.clientSecret,
                            code: code,
                            grant_type: 'authorization_code',
                            redirect_uri: redirect_uri
                        };
                        return [4 /*yield*/, request.post(url, form)];
                    case 1:
                        _b = _l.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('ARE002');
                        return [4 /*yield*/, application.update(id, { accessToken: body })
                            //récupération de l'id de l'utilisateur qui a crée le token, pour l'enregistrer 
                            //dans la base de donner des contact
                        ];
                    case 2:
                        _l.sent();
                        jsont = json(body, {});
                        return [4 /*yield*/, request.get(this.api + '/users/?access_token=' + jsont['access_token'])];
                    case 3:
                        _c = _l.sent(), error = _c.error, info = _c.info, body = _c.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('ARE004');
                        reponse = json(body, {});
                        if (!reponse['users']) return [3 /*break*/, 14];
                        return [4 /*yield*/, team.update({ ApplicationId: id }, { contactid: reponse['users'][0].id })];
                    case 4:
                        _l.sent();
                        //apres on selectionne si cette application a un hook, si pas, on le crée
                        console.log('_____________________________________');
                        console.log(this.api + '/hooks/?access_token=' + jsont['access_token']);
                        return [4 /*yield*/, request.get(this.api + '/hooks/?access_token=' + jsont['access_token'])];
                    case 5:
                        _d = _l.sent(), error = _d.error, info = _d.info, body = _d.body;
                        hooks = json(body, {});
                        reverified = [];
                        existed = [];
                        for (_i = 0, hooks_1 = hooks; _i < hooks_1.length; _i++) {
                            _e = hooks_1[_i], hookUrl = _e.hookUrl, eventKey = _e.eventKey, key = _e.key, status_1 = _e.status;
                            if (hookUrl == "https://therapiequantique.net/infusionsoft/on/" + id && status_1 == 'Verified') {
                                existed = existed.concat([{ hookUrl: hookUrl, eventKey: eventKey, key: key, status: status_1 }]);
                            }
                            else if (hookUrl == "https://therapiequantique.net/infusionsoft/on/" + id) {
                                reverified = reverified.concat([{ hookUrl: hookUrl, eventKey: eventKey, key: key, status: status_1 }]);
                            }
                        }
                        if (!reverified.length) return [3 /*break*/, 9];
                        console.log('-----VERIFICATION DE STATUS EN COURS------');
                        _f = 0, reverified_1 = reverified;
                        _l.label = 6;
                    case 6:
                        if (!(_f < reverified_1.length)) return [3 /*break*/, 9];
                        _g = reverified_1[_f], hookUrl = _g.hookUrl, eventKey = _g.eventKey, key = _g.key, status_2 = _g.status;
                        form_1 = {};
                        headers = { 'Content-Type': 'application/json' };
                        return [4 /*yield*/, request.post(this.api + ("/hooks/" + key + "/verify/?access_token=") + jsont['access_token'], form_1, headers)];
                    case 7:
                        _h = _l.sent(), error = _h.error, info = _h.info, body = _h.body;
                        console.log('--', hookUrl);
                        _l.label = 8;
                    case 8:
                        _f++;
                        return [3 /*break*/, 6];
                    case 9:
                        console.log(existed.length, reverified.length);
                        console.log('===========================================');
                        if (existed.length || reverified.length) {
                            console.log('-----HOOK EXISTE------');
                            return [2 /*return*/, true];
                        }
                        events = [
                            //"appointment.add",
                            //"appointment.delete",
                            //"appointment.edit",
                            //"company.add",
                            //"company.delete",
                            //"company.edit",
                            "contact.add",
                            "contact.delete",
                            "contact.edit",
                            "contact.redact",
                            //"contactGroup.add",
                            //"contactGroup.applied",
                            //"contactGroup.delete",
                            //"contactGroup.edit",
                            //"contactGroup.removed",
                            //"invoice.add",
                            //"invoice.delete",
                            //"invoice.edit",
                            //"invoice.payment.add",
                            //"invoice.payment.delete",
                            //"invoice.payment.edit",
                            //"leadsource.add",
                            //"leadsource.delete",
                            //"leadsource.edit",
                            "note.add",
                            "note.delete",
                            "note.edit",
                            //"opportunity.add",
                            //"opportunity.delete",
                            //"opportunity.edit",
                            //"opportunity.stage_move",
                            //"order.add",
                            //"order.delete",
                            //"order.edit",
                            //"product.add",
                            //"product.delete",
                            //"product.edit",
                            //"subscription.add",
                            //"subscription.delete",
                            //"subscription.edit",
                            "task.add",
                            "task.delete",
                            "task.edit",
                        ];
                        _j = 0, events_1 = events;
                        _l.label = 10;
                    case 10:
                        if (!(_j < events_1.length)) return [3 /*break*/, 13];
                        e = events_1[_j];
                        form_2 = {
                            hookUrl: "https://therapiequantique.net/infusionsoft/on/" + id,
                            eventKey: e,
                        };
                        console.log(e);
                        headers = { 'Content-Type': 'application/json' };
                        return [4 /*yield*/, request.post(this.api + '/hooks/?access_token=' + jsont['access_token'], form_2, headers, true)];
                    case 11:
                        _k = _l.sent(), error = _k.error, info = _k.info, body = _k.body;
                        _l.label = 12;
                    case 12:
                        _j++;
                        return [3 /*break*/, 10];
                    case 13:
                        //var { error, info , body } = await request.destroy( this.api + '/hooks/8/?access_token='+jsont['access_token'] , form , headers , true ) ;
                        console.log(body);
                        console.log(json(body, {}));
                        console.log('_____________________________________');
                        return [2 /*return*/, true];
                    case 14: throw new AppError('ARE005');
                }
            });
        });
    };
    /*
     *	Création de tache infusionsoft
    */
    infusionsoft.prototype.createTasks = function (body, t) {
        var error, info, body;
        return __awaiter(this, void 0, void 0, function () {
            var _a, header, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        header = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        };
                        token = json(t, {});
                        return [4 /*yield*/, request.post(this.api + '/tasks/?access_token=' + token['access_token'], body, header, true)];
                    case 1:
                        (_a = _b.sent(), error = _a.error, info = _a.info, body = _a.body);
                        if (error && (info.statusCode !== 200 || info.statusCode !== 201))
                            throw new AppError('EN0005');
                        return [2 /*return*/, json(body, {})];
                }
            });
        });
    };
    /*
     *	Création de notes infusionsoft
    */
    infusionsoft.prototype.createNotes = function (body, t) {
        var error, info, body;
        return __awaiter(this, void 0, void 0, function () {
            var _a, header, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        header = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        };
                        token = json(t, {});
                        return [4 /*yield*/, request.post(this.api + '/notes/?access_token=' + token['access_token'], body, header, true)];
                    case 1:
                        (_a = _b.sent(), error = _a.error, info = _a.info, body = _a.body);
                        if (error && (info.statusCode !== 200 || info.statusCode !== 201))
                            throw new AppError('EN0007');
                        return [2 /*return*/, json(body, {})];
                }
            });
        });
    };
    infusionsoft.prototype.destroyHook = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var app, token, _a, error, info, body, reponse, _i, reponse_1, _b, hookUrl, eventKey, key, status_3, _c, error, info, body;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, application.item(id)];
                    case 1:
                        app = _d.sent();
                        token = json(app.accessToken, {});
                        return [4 /*yield*/, request.get(this.api + '/hooks/?access_token=' + token['access_token'])];
                    case 2:
                        _a = _d.sent(), error = _a.error, info = _a.info, body = _a.body;
                        reponse = json(body, {});
                        _i = 0, reponse_1 = reponse;
                        _d.label = 3;
                    case 3:
                        if (!(_i < reponse_1.length)) return [3 /*break*/, 6];
                        _b = reponse_1[_i], hookUrl = _b.hookUrl, eventKey = _b.eventKey, key = _b.key, status_3 = _b.status;
                        return [4 /*yield*/, request.destroy(this.api + '/hooks/' + key + '/?access_token=' + token['access_token'])];
                    case 4:
                        _c = _d.sent(), error = _c.error, info = _c.info, body = _c.body;
                        _d.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, true];
                }
            });
        });
    };
    return infusionsoft;
}());
module.exports = new infusionsoft();
