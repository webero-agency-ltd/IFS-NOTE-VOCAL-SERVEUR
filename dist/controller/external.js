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
var request = require('request');
var site = require('../config/site');
var moment = require('moment');
var external = require('../libs/external');
var application = require('../libs/application');
var trello = require('../libs/trello');
var infusionsoft = require('../libs/infusionsoft');
var Pour = require('../libs/pour');
/*
 *	Récupération de la configuration externat pour un utilisateur en particulier
*/
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    _b = (_a = res).success;
                    return [4 /*yield*/, external.find(req.user.id)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
exports.index = index;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, infusionsoft, trello, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _a = req.body, infusionsoft = _a.infusionsoft, trello = _a.trello;
                    _c = (_b = res).success;
                    return [4 /*yield*/, external.create(req.user.id, { infusionsoft: infusionsoft, trello: trello })];
                case 1: return [2 /*return*/, _c.apply(_b, [_d.sent()])];
            }
        });
    });
}
exports.create = create;
function note(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, title, compteId, description, type, pour, prioriter, date, contactId, userid, p, i, data, label, body, _b, _c, body, _d, _e, body, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    lang = req.lang();
                    _a = req.body, title = _a.title, compteId = _a.compteId, description = _a.description, type = _a.type, pour = _a.pour, prioriter = _a.prioriter, date = _a.date, contactId = _a.contactId;
                    userid = req.user.id;
                    console.log('---------------------------');
                    console.log(title, description, type, pour, prioriter, date, contactId, compteId);
                    return [4 /*yield*/, Pour.item(pour)];
                case 1:
                    p = _h.sent();
                    return [4 /*yield*/, application.item(compteId)];
                case 2:
                    i = _h.sent();
                    if (!i)
                        throw new AppError('EN0002');
                    if (!(type == 'trello')) return [3 /*break*/, 5];
                    return [4 /*yield*/, Pour.item(prioriter)];
                case 3:
                    data = _h.sent();
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
                    _c = (_b = res).success;
                    return [4 /*yield*/, trello.createCards(body, i.accessToken)];
                case 4: return [2 /*return*/, _c.apply(_b, [_h.sent()])];
                case 5:
                    if (!(type == 'infusionsoft' && pour !== 'default')) return [3 /*break*/, 7];
                    body = { contact: { id: contactId }, description: description, due_date: date, title: title, priority: prioriter, user_id: p.appId };
                    _e = (_d = res).success;
                    return [4 /*yield*/, infusionsoft.createTasks(body, i.accessToken)];
                case 6: return [2 /*return*/, _e.apply(_d, [_h.sent()])];
                case 7:
                    if (!(type == 'infusionsoft' && pour == 'default')) return [3 /*break*/, 9];
                    body = { contact_id: contactId, body: description, title: title };
                    _g = (_f = res).success;
                    return [4 /*yield*/, infusionsoft.createNotes(body, i.accessToken)];
                case 8: return [2 /*return*/, _g.apply(_f, [_h.sent()])];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.note = note;
