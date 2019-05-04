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
var forearch_1 = __importDefault(require("../libs/forearch"));
var site = require('../config/site');
var request = require('request');
var querystring = require('querystring');
var urlAPI = 'https://api.infusionsoft.com/crm/rest/v1';
var limite = 6;
function allContact(url) {
    var _this = this;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                uri: url,
                method: 'GET'
            }, function (error, _res, body) {
                if (!error && _res.statusCode == 200) {
                    var reponse = void 0;
                    try {
                        reponse = JSON.parse(body);
                        reponse = reponse['contacts'].map(function (e) { return e.id; });
                    }
                    catch (e) {
                        reponse = [];
                    }
                    resolve(reponse);
                }
                else {
                    resolve([]);
                }
            });
            return [2 /*return*/];
        });
    }); });
}
//récupération des notes 
function allNotes(url, contacts) {
    var _this = this;
    var allcontacts = [];
    var i = 0;
    return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
        var findnotes;
        return __generator(this, function (_a) {
            findnotes = forearch_1.default(contacts, function (data, next) {
                request({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    uri: url + '&contact_id=' + data,
                    method: 'GET'
                }, function (error, _res, body) {
                    console.log('----- CHARGEMENT DE : ' + (i + 1) + ' SUR ' + contacts.length, ' ... ID USER : ' + data);
                    var reponse;
                    if (!error && _res.statusCode == 200) {
                        try {
                            reponse = JSON.parse(body);
                        }
                        catch (e) {
                            reponse = [];
                        }
                    }
                    if (reponse && reponse['notes'] && reponse['notes'].length) {
                        allcontacts = reponse['notes'].slice();
                    }
                    if (reponse && reponse['tasks'] && reponse['tasks'].length) {
                        allcontacts = reponse['tasks'].slice();
                    }
                    i++;
                    next();
                });
            });
            findnotes.end(function (argument) {
                resolve(allcontacts);
            });
            findnotes.run();
            return [2 /*return*/];
        });
    }); });
}
//Récupération de tout les taches vocal
function vocal_all(notes) {
    notes = notes.filter(function (e, i) {
        if (e.body && e.body.indexOf('NOTEID::') >= 0) {
            return true;
        }
        if (e.description && e.description.indexOf('NOTEID::') >= 0) {
            return true;
        }
        return false;
    });
    notes = notes.map(function (e) {
        var repl = e.body.replace(new RegExp('\r?\n', 'g'), '<br />');
        ;
        var sdsd = /NOTEID::(.*)::NOTEID(.*)/gi;
        var s = sdsd.exec(repl);
        var ID = '';
        var html = '';
        if (s[1]) {
            ID = s[1];
        }
        return { ID: ID, contact_id: e.contact_id, title: e.title, body: e.body };
    });
    return notes;
}
//transvase note
function notes(req, res) {
    var _this = this;
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User;
    var lang = req.lang();
    var id = req.params.id;
    //récupération des info en utilisant l'API infusionsoft et l'accessToken 
    Infusionsoft.find({ where: { id: id } })
        .then(function (i) { return __awaiter(_this, void 0, void 0, function () {
        var token, contacts, notes_1, wat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        token = JSON.parse(i.accessToken);
                    }
                    catch (e) {
                        token = [];
                    }
                    if (!(i && token && token['access_token'])) return [3 /*break*/, 4];
                    return [4 /*yield*/, allContact(urlAPI + '/contacts/?limit=' + limite + '&access_token=' + token['access_token'])];
                case 1:
                    contacts = _a.sent();
                    return [4 /*yield*/, allNotes(urlAPI + '/notes/?limit=100000&access_token=' + token['access_token'], contacts)];
                case 2:
                    notes_1 = _a.sent();
                    return [4 /*yield*/, vocal_all(notes_1)];
                case 3:
                    wat = _a.sent();
                    console.log(' ------------------------------------ ', wat);
                    return [2 /*return*/, res.json(wat)];
                case 4:
                    res.json({ error: lang['MessageAppGlobalErreur'] });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); })
        .catch(function (e) { return res.json({ error: lang['MessageAppGlobalErreur'] }); });
}
exports.notes = notes;
//transvase tache 
function tasks(req, res) {
    var _this = this;
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User;
    var lang = req.lang();
    var id = req.params.id;
    //récupération des info en utilisant l'API infusionsoft et l'accessToken 
    Infusionsoft.find({ where: { id: id } })
        .then(function (i) { return __awaiter(_this, void 0, void 0, function () {
        var token, contacts, notes_2, wat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    try {
                        token = JSON.parse(i.accessToken);
                    }
                    catch (e) {
                        token = [];
                    }
                    if (!(i && token && token['access_token'])) return [3 /*break*/, 4];
                    return [4 /*yield*/, allContact(urlAPI + '/contacts/?limit=' + limite + '&access_token=' + token['access_token'])];
                case 1:
                    contacts = _a.sent();
                    return [4 /*yield*/, allNotes(urlAPI + '/tasks/?limit=100000&access_token=' + token['access_token'], contacts)];
                case 2:
                    notes_2 = _a.sent();
                    return [4 /*yield*/, vocal_all(notes_2)];
                case 3:
                    wat = _a.sent();
                    console.log(' ------------------------------------ ', wat);
                    return [2 /*return*/, res.json(wat)];
                case 4:
                    res.json({ error: lang['MessageAppGlobalErreur'] });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); })
        .catch(function (e) { return res.json({ error: lang['MessageAppGlobalErreur'] }); });
}
exports.tasks = tasks;
