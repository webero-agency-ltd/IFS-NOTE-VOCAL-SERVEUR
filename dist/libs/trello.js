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
                        return [4 /*yield*/, application.update(id, { accessToken: token })];
                    case 2:
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
    return trello;
}());
module.exports = new trello();
