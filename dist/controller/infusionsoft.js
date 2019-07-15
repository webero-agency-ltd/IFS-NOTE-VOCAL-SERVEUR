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
var request = require('request');
var querystring = require('querystring');
var moment = require('moment');
var site = require('../config/site');
var note_application = require('../libs/note');
var external = require('../libs/external');
var application = require('../libs/application');
var trello = require('../libs/trello');
var infusionsoft = require('../libs/infusionsoft');
var Pour = require('../libs/pour');
/*
 * Fonction a utiliser dans le DEV seulement
 * qui va nous permètre de générer des utilisateurs d'infusionsosft
*/
function makeFakerUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    _b = (_a = res).success;
                    return [4 /*yield*/, infusionsoft.createUser(id)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
exports.makeFakerUser = makeFakerUser;
function note(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, title, compteId, description, type, pour, prioriter, date, contactId, update, userid, i, p, body, _b, _c, _d, body, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    lang = req.lang();
                    _a = req.body, title = _a.title, compteId = _a.compteId, description = _a.description, type = _a.type, pour = _a.pour, prioriter = _a.prioriter, date = _a.date, contactId = _a.contactId, update = _a.update;
                    userid = req.user.id;
                    console.log('---------------------------');
                    console.log(title, description, type, pour, prioriter, date, contactId, compteId);
                    return [4 /*yield*/, application.item(compteId)];
                case 1:
                    i = _h.sent();
                    if (!i)
                        throw new AppError('EN0002');
                    if (!(pour !== 'default')) return [3 /*break*/, 7];
                    return [4 /*yield*/, Pour.item(pour)];
                case 2:
                    p = _h.sent();
                    body = { contact: { id: contactId }, description: description, due_date: date, title: title, priority: prioriter, user_id: parseInt(p.appId) };
                    console.log(body);
                    _c = (_b = res).success;
                    if (!update) return [3 /*break*/, 4];
                    return [4 /*yield*/, infusionsoft.updateTasks(body, i.accessToken)];
                case 3:
                    _d = _h.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, infusionsoft.createTasks(body, i.accessToken)];
                case 5:
                    _d = _h.sent();
                    _h.label = 6;
                case 6: return [2 /*return*/, _c.apply(_b, [_d])];
                case 7:
                    if (!(pour == 'default')) return [3 /*break*/, 12];
                    body = { contact_id: contactId, body: description, title: title };
                    _f = (_e = res).success;
                    if (!update) return [3 /*break*/, 9];
                    return [4 /*yield*/, infusionsoft.updateNotes(body, i.accessToken)];
                case 8:
                    _g = _h.sent();
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, infusionsoft.createNotes(body, i.accessToken)];
                case 10:
                    _g = _h.sent();
                    _h.label = 11;
                case 11: return [2 /*return*/, _f.apply(_e, [_g])];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.note = note;
function membre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    _b = (_a = res).success;
                    return [4 /*yield*/, infusionsoft.membre(id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.membre = membre;
function notes(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, token, appId, id, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _a = req.query, token = _a.token, appId = _a.appId;
                    id = req.params.id;
                    _c = (_b = res).success;
                    return [4 /*yield*/, infusionsoft.notes(appId, id)];
                case 1:
                    _c.apply(_b, [_d.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.notes = notes;
function tasks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, _a, token, appId, id, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _a = req.query, token = _a.token, appId = _a.appId;
                    id = req.params.id;
                    _c = (_b = res).success;
                    return [4 /*yield*/, infusionsoft.tasks(appId, id)];
                case 1:
                    _c.apply(_b, [_d.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.tasks = tasks;
function contacts(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, _a, text, page, size, def, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    _a = req.query, text = _a.text, page = _a.page, size = _a.size, def = _a.def;
                    _c = (_b = res).success;
                    return [4 /*yield*/, infusionsoft.contacts(id, text, size, page, def)];
                case 1:
                    _c.apply(_b, [_d.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.contacts = contacts;
function setnote(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, unique, nativeId, attache, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = req.params, unique = _a.unique, nativeId = _a.nativeId, attache = _a.attache;
                    console.log({ unique: unique, nativeId: nativeId, attache: attache });
                    _c = (_b = res).success;
                    return [4 /*yield*/, note_application.update({ unique: unique, attache: { $not: (attache == 'task' ? 'note' : 'task') } }, { nativeId: nativeId })];
                case 1: 
                //on selectionne d'abord que le note avec l'unique existe 
                //si oui, on fait la mise a jour, si non, on resourne juste un success sant ID 
                return [2 /*return*/, _c.apply(_b, [_d.sent()])];
            }
        });
    });
}
exports.setnote = setnote;
function event(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, n, app, note_1, body, repl, sdsd, s;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    if (!(req.body.event_key == 'note.add' && req.body.object_keys)) return [3 /*break*/, 3];
                    n = req.body.object_keys[0].id;
                    return [4 /*yield*/, application.item(id)];
                case 1:
                    app = _a.sent();
                    if (!app)
                        return [2 /*return*/, !1];
                    return [4 /*yield*/, infusionsoft.notes(id, n)];
                case 2:
                    note_1 = _a.sent();
                    //récupération des notes qui correspond a l'url qui a été enregistre dans le contenue si existe 
                    //si l'url existe, on fait le raprochement entre les deux et on fait l'update dans la base de donner 
                    //si c'est pas le cas , on laise tout simplement passer 
                    if (!note_1.id)
                        return [2 /*return*/, !1];
                    body = note_1.body;
                    console.log(note_1);
                    if (body.indexOf('https://therapiequantique.net/note/u/') >= 0) {
                        repl = body.replace(new RegExp('\r?\n', 'g'), '');
                        ;
                        sdsd = /https:\/\/therapiequantique.net\/note\/u\/(.*)/gi;
                        s = sdsd.exec(repl);
                        if (s[1]) {
                            console.log('update note ici');
                            note_application.update({ unique: s[1], type: 'note' }, { nativeId: note_1.id });
                        }
                    }
                    return [2 /*return*/, res.success(true)];
                case 3:
                    res.set('X-Hook-Secret', req.get('X-Hook-Secret'));
                    res.success(true);
                    return [2 /*return*/];
            }
        });
    });
}
exports.event = event;
/*
 * Supression de tout les hook qui existe
*/
function destroyHook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    _b = (_a = res).success;
                    return [4 /*yield*/, infusionsoft.destroyHook(id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.destroyHook = destroyHook;
