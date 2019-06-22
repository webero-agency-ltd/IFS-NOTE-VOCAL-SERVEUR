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
var AppError = require('../libs/AppError');
var application = require('../libs/application');
var team = require('../libs/team');
var user = require('../libs/user');
var json = require('../libs/json');
var paginate_1 = __importDefault(require("../libs/paginate"));
var promise_1 = __importDefault(require("../libs/promise"));
/*
 * Classe de manipulation des actions vers trello
*/
var transferwise = /** @class */ (function () {
    function transferwise() {
        this.api = 'https://api.sandbox.transferwise.tech/v1/';
    }
    /*
     * Récupération de tout les informations de transwise
    */
    transferwise.prototype.find = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var Transferwise, usr, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Transferwise = global['db'].Transferwise;
                        return [4 /*yield*/, user.find(u)];
                    case 1:
                        usr = _b.sent();
                        if (!usr)
                            throw new AppError('EI0001');
                        return [4 /*yield*/, promise_1.default(usr.getTransferwise())];
                    case 2:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('TWP0005');
                        data;
                        return [2 /*return*/, data ? data : { success: '' }];
                }
            });
        });
    };
    /*
     * Création de Token
    */
    transferwise.prototype.create = function (userid, name, token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, usr, Transferwise, _c, err, data, trasferwise;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, user.find(userid)];
                    case 1:
                        usr = _d.sent();
                        if (!usr)
                            throw new AppError('TWP0006');
                        Transferwise = global['db'].Transferwise;
                        return [4 /*yield*/, promise_1.default(Transferwise.findOne({
                                where: { UserId: userid }
                            }))];
                    case 2:
                        _c = _d.sent(), err = _c[0], data = _c[1];
                        if (err)
                            throw new AppError('TWP0007');
                        trasferwise = data;
                        if (trasferwise) {
                            //ici l'option external existe, donc on fait juste la mise a jour de celle ci 
                            return [2 /*return*/, trasferwise.update({ name: name, token: token })];
                        }
                        return [4 /*yield*/, promise_1.default(Transferwise.create({ name: name, token: token }))];
                    case 3:
                        _a = _d.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('TWP0008');
                        trasferwise = data;
                        return [4 /*yield*/, promise_1.default(usr.setTransferwise(trasferwise))];
                    case 4:
                        _b = _d.sent(), err = _b[0], data = _b[1];
                        if (err)
                            throw new AppError('TWP0009');
                        return [2 /*return*/, trasferwise];
                }
            });
        });
    };
    /*
     * Récupération des profiles transferwise
    */
    transferwise.prototype.profiles = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, _a, error, info, body, reponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {
                            'Authorization': 'Bearer ' + id
                        };
                        return [4 /*yield*/, request.get(this.api + 'profiles/', headers)];
                    case 1:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('TWP0001');
                        reponse = json(body, {});
                        return [2 /*return*/, reponse];
                }
            });
        });
    };
    /*
     * Récupération des transfers transferwise
    */
    transferwise.prototype.transfers = function (id, page) {
        if (page === void 0) { page = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var headers, _a, error, info, body, reponse, count, pageSize, transfers, _i, reponse_1, item, user_1, target, source;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {
                            'Authorization': 'Bearer ' + id
                        };
                        return [4 /*yield*/, request.get(this.api + 'transfers', headers)];
                    case 1:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('TWP0002');
                        reponse = json(body, []);
                        count = reponse.length;
                        pageSize = 1;
                        reponse = paginate_1.default(reponse, 1, page);
                        transfers = [];
                        _i = 0, reponse_1 = reponse;
                        _b.label = 2;
                    case 2:
                        if (!(_i < reponse_1.length)) return [3 /*break*/, 7];
                        item = reponse_1[_i];
                        return [4 /*yield*/, this.users(id, item.user)];
                    case 3:
                        user_1 = _b.sent();
                        return [4 /*yield*/, this.accounts(id, item.targetAccount)];
                    case 4:
                        target = _b.sent();
                        return [4 /*yield*/, this.accounts(id, item.sourceAccount)];
                    case 5:
                        source = _b.sent();
                        transfers = [__assign({}, item, { user: user_1, source: source, target: target })];
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: 
                    //console.log( transfers ) ; 
                    return [2 /*return*/, { listes: transfers, pagination: { total: count, current: page, pageSize: pageSize } }];
                }
            });
        });
    };
    transferwise.prototype.accounts = function (token, id) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, _a, error, info, body, reponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {
                            'Authorization': 'Bearer ' + token
                        };
                        return [4 /*yield*/, request.get(this.api + 'accounts/' + id, headers)];
                    case 1:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('TWP0004');
                        reponse = json(body, {});
                        return [2 /*return*/, reponse];
                }
            });
        });
    };
    transferwise.prototype.users = function (token, id) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, _a, error, info, body, reponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        headers = {
                            'Authorization': 'Bearer ' + token
                        };
                        return [4 /*yield*/, request.get(this.api + 'users/' + id, headers)];
                    case 1:
                        _a = _b.sent(), error = _a.error, info = _a.info, body = _a.body;
                        if (error && info.statusCode !== 200)
                            throw new AppError('TWP0003');
                        reponse = json(body, {});
                        return [2 /*return*/, reponse];
                }
            });
        });
    };
    return transferwise;
}());
module.exports = new transferwise();
