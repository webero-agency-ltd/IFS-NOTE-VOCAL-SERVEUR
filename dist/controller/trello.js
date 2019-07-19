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
Object.defineProperty(exports, "__esModule", { value: true });
var url = require('url');
var site = require('../config/site');
var note_application = require('../libs/note');
var external = require('../libs/external');
var application = require('../libs/application');
var trello = require('../libs/trello');
var infusionsoft = require('../libs/infusionsoft');
var Pour = require('../libs/pour');
var moment = require('moment');
function view(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.render('trello.ejs');
            return [2 /*return*/];
        });
    });
}
exports.view = view;
function cardUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, title, compteId, description, type, pour, prioriter, date, contactId, userid, p, i, data, label, body, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _a = req.body, title = _a.title, compteId = _a.compteId, description = _a.description, type = _a.type, pour = _a.pour, prioriter = _a.prioriter, date = _a.date, contactId = _a.contactId;
                    userid = req.user.id;
                    console.log('---------------------------');
                    console.log('cardUpdate');
                    console.log('---------------------------');
                    console.log(title, description, type, pour, prioriter, date, contactId, compteId);
                    return [4 /*yield*/, Pour.item(pour)];
                case 1:
                    p = _d.sent();
                    return [4 /*yield*/, application.item(compteId)];
                case 2:
                    i = _d.sent();
                    if (!i)
                        throw new AppError('EN0002');
                    return [4 /*yield*/, Pour.item(prioriter)];
                case 3:
                    data = _d.sent();
                    label = '';
                    if (data) {
                        label = data.appId;
                    }
                    body = { idList: p.cardId, name: title, desc: description, due: moment(date, 'YYYY-MM-DDTHH:mm:ssZ').clone().format('YYYY-MM-DD') };
                    if (label) {
                        body['idLabels'] = label;
                    }
                    if (p.appId !== 'generale') {
                        body['idMembers'] = p.appId;
                    }
                    console.log(body);
                    _c = (_b = res).success;
                    return [4 /*yield*/, trello.createCards(body, i.accessToken)];
                case 4: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
            }
        });
    });
}
exports.cardUpdate = cardUpdate;
function cardAdd(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, title, compteId, description, type, pour, prioriter, date, contactId, userid, p, i, data, label, body, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _a = req.body, title = _a.title, compteId = _a.compteId, description = _a.description, type = _a.type, pour = _a.pour, prioriter = _a.prioriter, date = _a.date, contactId = _a.contactId;
                    userid = req.user.id;
                    console.log('---------------------------');
                    console.log(title, description, type, pour, prioriter, date, contactId, compteId);
                    return [4 /*yield*/, Pour.item(pour)];
                case 1:
                    p = _d.sent();
                    return [4 /*yield*/, application.item(compteId)];
                case 2:
                    i = _d.sent();
                    if (!i)
                        throw new AppError('EN0002');
                    return [4 /*yield*/, Pour.item(prioriter)];
                case 3:
                    data = _d.sent();
                    label = '';
                    if (data) {
                        label = data.appId;
                    }
                    body = { idList: p.cardId, name: title, desc: description, due: moment(date, 'YYYY-MM-DDTHH:mm:ssZ').clone().format('YYYY-MM-DD') };
                    if (label) {
                        body['idLabels'] = label;
                    }
                    if (p.appId !== 'generale') {
                        body['idMembers'] = p.appId;
                    }
                    console.log(body);
                    _c = (_b = res).success;
                    return [4 /*yield*/, trello.createCards(body, i.accessToken)];
                case 4: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
            }
        });
    });
}
exports.cardAdd = cardAdd;
function membre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, Application, User, Team, id, i, _b, success, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    _a = this.db, Application = _a.Application, User = _a.User, Team = _a.Team;
                    id = req.params.id;
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    i = _c.sent();
                    if (!i)
                        return [2 /*return*/, res.error('TMBU001')];
                    if (!i.compteId)
                        return [2 /*return*/, res.error('TMBU004')];
                    return [4 /*yield*/, trello.membres({ board: i.compteId, token: i.accessToken })];
                case 2:
                    _b = _c.sent(), success = _b.success, error = _b.error;
                    if (success)
                        return [2 /*return*/, res.success(success)];
                    return [2 /*return*/, res.error('TMBU003')];
            }
        });
    });
}
exports.membre = membre;
function event(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, app, cards, boards, url, cardstring, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    if (req.body.action.type !== 'createCard')
                        return [2 /*return*/, res.success()];
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    app = _c.sent();
                    if (!app)
                        return [2 /*return*/, res.success()];
                    return [4 /*yield*/, trello.cards({ board: app.compteId, token: app.accessToken })];
                case 2:
                    cards = _c.sent();
                    return [4 /*yield*/, trello.board({ token: app.accessToken, id: app.compteId })];
                case 3:
                    boards = _c.sent();
                    if (!boards.success || !boards.success.url)
                        return [2 /*return*/, res.success()];
                    url = boards.success.url;
                    cards.success.push({ url: url });
                    cardstring = cards.success.map(function (_a) {
                        var url = _a.url;
                        return decodeURIComponent(url.replace('https://trello.com', ''));
                    }).join();
                    console.log(cardstring);
                    _b = (_a = res).success;
                    return [4 /*yield*/, application.update(id, { url: cardstring })];
                case 4: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
exports.event = event;
function boardsUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, _a, compteId, url, app, cards, cardstring, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    _a = req.body, compteId = _a.compteId, url = _a.url;
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    app = _d.sent();
                    return [4 /*yield*/, trello.cards({ board: compteId, token: app.accessToken })];
                case 2:
                    cards = _d.sent();
                    cards.success.push({ url: url });
                    cardstring = cards.success.map(function (_a) {
                        var url = _a.url;
                        return decodeURIComponent(url.replace('https://trello.com', ''));
                    }).join();
                    //suppression de l'ancien webhook 
                    return [4 /*yield*/, trello.deleteWebhook({ board: app.compteId, token: app.accessToken })
                        //ajout de webhook 
                    ];
                case 3:
                    //suppression de l'ancien webhook 
                    _d.sent();
                    //ajout de webhook 
                    return [4 /*yield*/, trello.webhook({ board: compteId, token: app.accessToken, app: app.id })];
                case 4:
                    //ajout de webhook 
                    _d.sent();
                    _c = (_b = res).success;
                    return [4 /*yield*/, application.update(id, { compteId: compteId, url: cardstring })];
                case 5: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
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
        var _a, Application, User, lang, id, i, _b, success, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = this.db, Application = _a.Application, User = _a.User;
                    lang = req.lang();
                    id = req.params.id;
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    i = _c.sent();
                    if (!i) {
                        return [2 /*return*/, res.error('TMB001')];
                    }
                    return [4 /*yield*/, trello.boards({ token: i.accessToken })];
                case 2:
                    _b = _c.sent(), success = _b.success, error = _b.error;
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
 * Récupèration des cards de trello
*/
function cards(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, appId, i, _a, success, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    appId = req.query.appId;
                    return [4 /*yield*/, application.item(appId)];
                case 1:
                    i = _b.sent();
                    if (!i) {
                        return [2 /*return*/, res.error('TML001')];
                    }
                    return [4 /*yield*/, trello.card({ card: id, token: i.accessToken })];
                case 2:
                    _a = _b.sent(), success = _a.success, error = _a.error;
                    if (success) {
                        console.log(success);
                        return [2 /*return*/, res.success(success)];
                    }
                    console.log(error);
                    return [2 /*return*/, res.error('TML002')];
            }
        });
    });
}
exports.cards = cards;
/*
 * Récupération des Listes dans un application trello
*/
function lists(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, Application, User, lang, id, i, _b, success, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = this.db, Application = _a.Application, User = _a.User;
                    lang = req.lang();
                    id = req.params.id;
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    i = _c.sent();
                    if (!i) {
                        return [2 /*return*/, res.error('TML001')];
                    }
                    return [4 /*yield*/, trello.lists({ board: i.compteId, token: i.accessToken })];
                case 2:
                    _b = _c.sent(), success = _b.success, error = _b.error;
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
        var lang, id, i, _a, success, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    i = _b.sent();
                    if (!i) {
                        return [2 /*return*/, res.error('TML001')];
                    }
                    return [4 /*yield*/, trello.labels({ board: i.compteId, token: i.accessToken })];
                case 2:
                    _a = _b.sent(), success = _a.success, error = _a.error;
                    if (success) {
                        return [2 /*return*/, res.success(success)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.label = label;
