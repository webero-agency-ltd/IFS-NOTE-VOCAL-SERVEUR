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
var url = require('url');
var request = require('request');
var site = require('../config/site');
var promise_1 = __importDefault(require("../libs/promise"));
function index(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, lang, _d, Pour, User, Application, userid, application, err, data, user, i;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    lang = req.lang();
                    _d = this.db, Pour = _d.Pour, User = _d.User, Application = _d.Application;
                    userid = req.user.id;
                    application = req.params.application;
                    err = null;
                    data = null;
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: req.user.id }
                        }))];
                case 1:
                    _a = _e.sent(), err = _a[0], data = _a[1];
                    user = data;
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: application } }))];
                case 2:
                    _b = _e.sent(), err = _b[0], data = _b[1];
                    if (err || !data) {
                        return [2 /*return*/, res.error('PC0001')];
                    }
                    i = data;
                    if (err) {
                        return [2 /*return*/, res.error('PI001')];
                    }
                    return [4 /*yield*/, promise_1.default(user.getPours({
                            where: { ApplicationId: application }
                        }))];
                case 3:
                    _c = _e.sent(), err = _c[0], data = _c[1];
                    if (err) {
                        return [2 /*return*/, res.error('PI002')];
                    }
                    return [2 /*return*/, res.success(data)];
            }
        });
    });
}
exports.index = index;
function delet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, lang, _c, Pour, User, userid, id, err, data, p;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    lang = req.lang();
                    _c = this.db, Pour = _c.Pour, User = _c.User;
                    userid = req.user.id;
                    id = req.params.id;
                    err = null;
                    data = null;
                    data;
                    return [4 /*yield*/, promise_1.default(Pour.findOne({
                            where: { id: id }
                        }))];
                case 1:
                    _a = _d.sent(), err = _a[0], data = _a[1];
                    p = data;
                    if (err) {
                        return [2 /*return*/, res.error('PD001')];
                    }
                    if (!p) {
                        return [2 /*return*/, res.error('PD002')];
                    }
                    return [4 /*yield*/, promise_1.default(p.destroy())];
                case 2:
                    _b = _d.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('PD003')];
                    }
                    return [2 /*return*/, res.success()];
            }
        });
    });
}
exports.delet = delet;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, lang, _f, Pour, User, Application, userid, _g, name, appId, cardId, type, application, err, data, user, p, i;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    lang = req.lang();
                    _f = this.db, Pour = _f.Pour, User = _f.User, Application = _f.Application;
                    userid = req.user.id;
                    _g = req.body, name = _g.name, appId = _g.appId, cardId = _g.cardId, type = _g.type, application = _g.application;
                    data;
                    return [4 /*yield*/, promise_1.default(User.findOne({
                            where: { id: userid }
                        }))];
                case 1:
                    _a = _h.sent(), err = _a[0], data = _a[1];
                    user = data;
                    data;
                    return [4 /*yield*/, promise_1.default(Pour.create({ name: name, appId: appId, cardId: cardId, type: type }))];
                case 2:
                    _b = _h.sent(), err = _b[0], data = _b[1];
                    if (err) {
                        return [2 /*return*/, res.error('PC0002')];
                    }
                    p = data;
                    return [4 /*yield*/, promise_1.default(p.setAuthor(user))];
                case 3:
                    _c = _h.sent(), err = _c[0], data = _c[1];
                    if (err) {
                        return [2 /*return*/, res.error('PC0003')];
                    }
                    data;
                    return [4 /*yield*/, promise_1.default(Application.find({ where: { id: application } }))];
                case 4:
                    _d = _h.sent(), err = _d[0], data = _d[1];
                    if (err || !data) {
                        return [2 /*return*/, res.error('PC0001')];
                    }
                    i = data;
                    return [4 /*yield*/, promise_1.default(p.setApplication(i))];
                case 5:
                    _e = _h.sent(), err = _e[0], data = _e[1];
                    if (err) {
                        return [2 /*return*/, res.error('PC0004')];
                    }
                    console.log('--------------------------');
                    return [2 /*return*/, res.success()];
            }
        });
    });
}
exports.create = create;
