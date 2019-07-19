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
var json = require('../libs/json');
var application = require('../libs/application');
var team = require('../libs/team');
var AppError = require('../libs/AppError');
/*
 * Classe de manipulation des actions vers trello
*/
var trello = /** @class */ (function () {
    function trello() {
        this.api = 'https://api.trello.com/1/';
    }
    /*
     * Récupération des borads de trello
    */
    trello.prototype.boards = function (_a) {
        var token = _a.token, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + 'members/' + (id ? id : 'me') + '/boards?key=' + site.trelloKey + '&token=' + token;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (!error && info.statusCode == 200) {
                            data = json(body, []);
                            return [2 /*return*/, { success: data }];
                        }
                        return [2 /*return*/, { error: error }];
                }
            });
        });
    };
    trello.prototype.board = function (_a) {
        var token = _a.token, id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + 'boards/' + id + '?key=' + site.trelloKey + '&token=' + token;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (!error && info.statusCode == 200) {
                            data = json(body, []);
                            return [2 /*return*/, { success: data }];
                        }
                        return [2 /*return*/, { error: error }];
                }
            });
        });
    };
    /*
     * Récupération des listes de trello
    */
    trello.prototype.lists = function (_a) {
        var board = _a.board, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, reponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + 'boards/' + board + '/lists?key=' + site.trelloKey + '&token=' + token;
                        console.log(url);
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (!error && info.statusCode == 200) {
                            reponse = json(body, []);
                            return [2 /*return*/, { success: reponse }];
                        }
                        return [2 /*return*/, { error: error }];
                }
            });
        });
    };
    /*
     * Récupération des card de trello
    */
    trello.prototype.card = function (_a) {
        var card = _a.card, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, reponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + 'cards/' + card + '?key=' + site.trelloKey + '&token=' + token;
                        console.log(url);
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (!error && info.statusCode == 200) {
                            reponse = json(body, []);
                            return [2 /*return*/, { success: reponse }];
                        }
                        return [2 /*return*/, { error: error }];
                }
            });
        });
    };
    /*
     * Membre des board de trello
    */
    trello.prototype.membres = function (_a) {
        var board = _a.board, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, reponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + '/boards/' + board + '/members/?token=' + token + '&key=' + site.trelloKey;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (!error && info.statusCode == 200) {
                            reponse = json(body, []);
                            return [2 /*return*/, { success: reponse }];
                        }
                        return [2 /*return*/, { error: error }];
                }
            });
        });
    };
    /*
     * Liste des label de trello
    */
    trello.prototype.labels = function (_a) {
        var board = _a.board, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, reponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + 'boards/' + board + '/labels?fields=all&key=' + site.trelloKey + '&token=' + token;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (!error && info.statusCode == 200) {
                            reponse = json(body, []);
                            return [2 /*return*/, { success: reponse }];
                        }
                        return [2 /*return*/, { error: error }];
                }
            });
        });
    };
    /*
     * Récupération de tout les cards de trello
    */
    trello.prototype.cards = function (_a) {
        var board = _a.board, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, reponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + 'boards/' + board + '/cards?fields=all&key=' + site.trelloKey + '&token=' + token;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (!error && info.statusCode == 200) {
                            reponse = json(body, []);
                            return [2 /*return*/, { success: reponse }];
                        }
                        return [2 /*return*/, { error: error }];
                }
            });
        });
    };
    /*
     * Récupération de tout les token trello
    */
    trello.prototype.findtoken = function (_a) {
        var id = _a.id, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var app, url, _b, error, info, body, jsonp;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, application.item(id)];
                    case 1:
                        app = _c.sent();
                        if (!app)
                            throw new AppError('ART001');
                        //récupération de tout les card ce cette application
                        return [4 /*yield*/, application.update(id, { accessToken: token })];
                    case 2:
                        //récupération de tout les card ce cette application
                        _c.sent();
                        url = this.api + 'members/me?key=' + site.trelloKey + '&token=' + token;
                        return [4 /*yield*/, request.get(url)];
                    case 3:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (error && info.statusCode != 200)
                            throw new AppError('ART003');
                        jsonp = json(body, []);
                        //mise a jour de l'id utilisateur dans trello team
                        return [4 /*yield*/, team.update({ ApplicationId: id }, { contactid: jsonp.id })];
                    case 4:
                        //mise a jour de l'id utilisateur dans trello team
                        _c.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /*
     * Supression de vos webhook
    */
    trello.prototype.deleteWebhook = function (_a) {
        var board = _a.board, token = _a.token;
        return __awaiter(this, void 0, void 0, function () {
            var url, _b, error, info, body, jsonp, url_1, _c, error_1, info_1, body_1, jsonp;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        url = this.api + ("tokens/" + token + "/webhooks/?key=" + site.trelloKey);
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _b = _d.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (error && info.statusCode != 200)
                            throw new AppError('ART004');
                        jsonp = json(body, []);
                        if (!(jsonp.length > 0)) return [3 /*break*/, 4];
                        url_1 = this.api + ("webhooks/" + jsonp[0].id + "/?key=" + site.trelloKey + "&token=" + token);
                        return [4 /*yield*/, request.destroy(url_1)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, request.get(this.api + ("tokens/" + token + "/webhooks/?key=" + site.trelloKey))];
                    case 3:
                        _c = _d.sent(), error_1 = _c.error, info_1 = _c.info, body_1 = _c.body;
                        if (error_1 && info_1.statusCode != 200)
                            throw new AppError('ART004');
                        jsonp = json(body_1, []);
                        if (jsonp.length > 0) {
                            throw new AppError('ART005');
                        }
                        _d.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /*
     * Ajout de webhook
    */
    trello.prototype.webhook = function (_a) {
        var board = _a.board, token = _a.token, app = _a.app;
        return __awaiter(this, void 0, void 0, function () {
            var url, form, _b, error, info, body;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = this.api + ("tokens/" + token + "/webhooks/?key=" + site.trelloKey);
                        form = {
                            idModel: board,
                            description: 'Event Board Vocal Note',
                            callbackURL: 'https://therapiequantique.net/trello/on/' + app,
                        };
                        return [4 /*yield*/, request.post(url, form)];
                    case 1:
                        _b = _c.sent(), error = _b.error, info = _b.info, body = _b.body;
                        if (error && info.statusCode != 200)
                            throw new AppError('ART006');
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
     * API trello création de note
    */
    trello.prototype.createCards = function (body, token) {
        var error, info, body;
        return __awaiter(this, void 0, void 0, function () {
            var _a, url;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = this.api + 'cards?fields=all&key=' + site.trelloKey + '&token=' + token;
                        return [4 /*yield*/, request.post(url, body)];
                    case 1:
                        (_a = _b.sent(), error = _a.error, info = _a.info, body = _a.body);
                        if (error && info.statusCode != 200)
                            throw new AppError('ART008');
                        return [2 /*return*/, json(body, [])];
                }
            });
        });
    };
    /*
     * Récupération de l'ID de card trello a partire d'un short URL
    */
    trello.prototype.findCardIdByUrl = function (urlSearch, board, token) {
        return __awaiter(this, void 0, void 0, function () {
            var noteID, url, _a, error, info, body, reponse, _i, reponse_1, _b, url_2, id;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        noteID = 'https://trello.com' + decodeURIComponent(urlSearch).split('_').join('/').replace('_', '/').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                        url = this.api + 'boards/' + board + '/cards?fields=id,url&key=' + site.trelloKey + '&token=' + token;
                        return [4 /*yield*/, request.get(url)];
                    case 1:
                        _a = _c.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (!error && info.statusCode == 200) {
                            reponse = json(body, []);
                            for (_i = 0, reponse_1 = reponse; _i < reponse_1.length; _i++) {
                                _b = reponse_1[_i], url_2 = _b.url, id = _b.id;
                                if (url_2 == noteID) {
                                    return [2 /*return*/, id];
                                }
                            }
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return trello;
}());
module.exports = new trello();
