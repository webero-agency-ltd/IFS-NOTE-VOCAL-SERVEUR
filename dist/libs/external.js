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
var request = require('../libs/request');
var json = require('../libs/json');
var application = require('../libs/application');
var AppError = require('../libs/AppError');
var user = require('../libs/user');
var promise_1 = __importDefault(require("../libs/promise"));
/*
 * Classe de manipulation des actions vers trello
*/
var ext = /** @class */ (function () {
    function ext() {
    }
    /*
     * récupération de la configuration de l'externale
    */
    ext.prototype.find = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var usr, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user.find(u)];
                    case 1:
                        usr = _b.sent();
                        if (!usr)
                            throw new AppError('EI0001');
                        return [4 /*yield*/, promise_1.default(usr.getExternal())];
                    case 2:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('EI0002');
                        if (!data) {
                            data = { infusionsoft: null, trello: null };
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /*
     * Création d'un configuration
    */
    ext.prototype.create = function (u, _a) {
        var infusionsoft = _a.infusionsoft, trello = _a.trello;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, usr, External, _d, err, data, external;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, user.find(u)];
                    case 1:
                        usr = _e.sent();
                        if (!usr)
                            throw new AppError('EC0001');
                        External = global['db'].External;
                        return [4 /*yield*/, promise_1.default(External.findOne({
                                where: { UserId: u }
                            }))];
                    case 2:
                        _d = _e.sent(), err = _d[0], data = _d[1];
                        if (err || !data)
                            throw new AppError('EI0003');
                        external = data;
                        if (external) {
                            //ici l'option external existe, donc on fait juste la mise a jour de celle ci 
                            return [2 /*return*/, external.update({ infusionsoft: infusionsoft, trello: trello })];
                        }
                        //Création de team de l'applications 
                        data;
                        return [4 /*yield*/, promise_1.default(External.create({ infusionsoft: infusionsoft, trello: trello }))];
                    case 3:
                        _b = _e.sent(), err = _b[0], data = _b[1];
                        if (err)
                            throw new AppError('EI0004');
                        external = data;
                        return [4 /*yield*/, promise_1.default(user.setExternal(external))];
                    case 4:
                        _c = _e.sent(), err = _c[0], data = _c[1];
                        if (err)
                            throw new AppError('EI0005');
                        return [2 /*return*/, external];
                }
            });
        });
    };
    return ext;
}());
module.exports = new ext();
