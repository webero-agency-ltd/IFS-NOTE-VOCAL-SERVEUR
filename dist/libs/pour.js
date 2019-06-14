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
var site = require('../config/site');
var request = require('../libs/request');
var AppError = require('../libs/AppError');
var application = require('../libs/application');
var team = require('../libs/team');
var json = require('../libs/json');
var user = require('../libs/user');
var promise_1 = __importDefault(require("../libs/promise"));
var pour = /** @class */ (function () {
    function pour() {
    }
    pour.prototype.item = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var Pour, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Pour = global['db'].Pour;
                        return [4 /*yield*/, promise_1.default(Pour.findOne({
                                where: { id: id }
                            }))];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('EN0001');
                        data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /*
     * Récupération de tout les pours de l'utilisateur
    */
    pour.prototype.find = function (u, app) {
        return __awaiter(this, void 0, void 0, function () {
            var usr, i, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user.find(u)];
                    case 1:
                        usr = _b.sent();
                        if (!usr)
                            throw new AppError('EI0001');
                        return [4 /*yield*/, application.item(app)];
                    case 2:
                        i = _b.sent();
                        if (!i)
                            throw new AppError('PC0001');
                        return [4 /*yield*/, promise_1.default(usr.getPours({
                                where: { ApplicationId: app }
                            }))];
                    case 3:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('PI002');
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /*
     * Création de pour
    */
    pour.prototype.create = function (u, body) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, name, appId, cardId, type, usr, Pour, _c, err, data, p, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        name = body.name, appId = body.appId, cardId = body.cardId, type = body.type;
                        return [4 /*yield*/, user.find(u)];
                    case 1:
                        usr = _d.sent();
                        if (!usr)
                            throw new AppError('PC0001');
                        Pour = global['db'].Pour;
                        return [4 /*yield*/, promise_1.default(Pour.create({ name: name, appId: appId, cardId: cardId, type: type }))];
                    case 2:
                        _c = _d.sent(), err = _c[0], data = _c[1];
                        if (err)
                            throw new AppError('PC0002');
                        p = data;
                        return [4 /*yield*/, promise_1.default(p.setAuthor(usr))];
                    case 3:
                        //attacher le pour a l'utilisateur courant 
                        _a = _d.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('PC0003');
                        return [4 /*yield*/, application.item(body.application)];
                    case 4:
                        i = _d.sent();
                        if (!usr)
                            throw new AppError('PC0001');
                        return [4 /*yield*/, promise_1.default(p.setApplication(i))];
                    case 5:
                        _b = _d.sent(), err = _b[0], data = _b[1];
                        if (err)
                            throw new AppError('PC0004');
                        console.log('--------------------------');
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /*
     * Supression d'un pour
    */
    pour.prototype.destroy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Pour, _b, err, data, p;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        Pour = global['db'].Pour;
                        return [4 /*yield*/, promise_1.default(Pour.findOne({
                                where: { id: id }
                            }))];
                    case 1:
                        _b = _c.sent(), err = _b[0], data = _b[1];
                        p = data;
                        if (err || !p)
                            throw new AppError('PD001');
                        return [4 /*yield*/, promise_1.default(p.destroy())];
                    case 2:
                        _a = _c.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('PD003');
                        return [2 /*return*/];
                }
            });
        });
    };
    return pour;
}());
module.exports = new pour();
