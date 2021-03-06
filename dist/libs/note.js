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
var application = require('../libs/application');
var path = require('path');
var fs = require('fs');
var AppError = require('../libs/AppError');
var promise_1 = __importDefault(require("../libs/promise"));
var user = require('../libs/user');
var note = /** @class */ (function () {
    function note() {
    }
    /*
     * Création de ID de note
    */
    note.prototype.path = function (where, unique) {
        return __awaiter(this, void 0, void 0, function () {
            var app, dir;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(where);
                        return [4 /*yield*/, application.item(where)];
                    case 1:
                        app = _a.sent();
                        if (!app)
                            throw new AppError('N0001');
                        dir = path.join(__dirname, '../', '/notes/app_' + app.id + '/');
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir);
                        }
                        return [2 /*return*/, dir + unique + '.wav'];
                }
            });
        });
    };
    note.prototype.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var where, Note, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        where = {};
                        typeof (id) == "object" ? where = id : where['id'] = id;
                        Note = global['db'].Note;
                        return [4 /*yield*/, promise_1.default(Note.findOne({
                                where: where
                            }))];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    note.prototype.update = function (id, object) {
        return __awaiter(this, void 0, void 0, function () {
            var where, Note, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        where = {};
                        typeof (id) == "object" ? where = id : where['id'] = id;
                        Note = global['db'].Note;
                        return [4 /*yield*/, promise_1.default(Note.findOne({
                                where: where
                            }))];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        console.log('__________________');
                        console.log(where);
                        console.log(err);
                        console.log(data);
                        data;
                        if (data) {
                            console.log('update note ici avec les donner suivant : ', object);
                            data.update(object);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    note.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var where, Note, _a, err, data, _i, data_1, item, _b, err_1, data_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        where = {};
                        typeof (id) == "object" ? where = id : where['id'] = id;
                        Note = global['db'].Note;
                        return [4 /*yield*/, promise_1.default(Note.findAll({
                                where: where
                            }))];
                    case 1:
                        _a = _c.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('ND0001');
                        _i = 0, data_1 = data;
                        _c.label = 2;
                    case 2:
                        if (!(_i < data_1.length)) return [3 /*break*/, 5];
                        item = data_1[_i];
                        return [4 /*yield*/, promise_1.default(item.destroy())];
                    case 3:
                        _b = _c.sent(), err_1 = _b[0], data_2 = _b[1];
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, true];
                }
            });
        });
    };
    /*
     * Création de note ICI
    */
    note.prototype.create = function (id, title, text, appId, type, userwhere, attache, nativeId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, Note, note, where, app, u, _c, err, data, _d, err, data;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log('--CREATE NOTE IN WHERE', id);
                        Note = global['db'].Note;
                        return [4 /*yield*/, this.find(id)];
                    case 1:
                        note = _e.sent();
                        if (!!note) return [3 /*break*/, 7];
                        where = null;
                        return [4 /*yield*/, application.item(appId)];
                    case 2:
                        app = _e.sent();
                        if (!app)
                            throw new AppError('N0005');
                        return [4 /*yield*/, user.find(userwhere)];
                    case 3:
                        u = _e.sent();
                        if (!u)
                            throw new AppError('N0006');
                        return [4 /*yield*/, promise_1.default(Note.create({ title: title, text: text, unique: id.unique, type: type, attache: attache, nativeId: nativeId }))];
                    case 4:
                        _c = _e.sent(), err = _c[0], data = _c[1];
                        console.log('______________');
                        console.log(err);
                        if (err || !data)
                            throw new AppError('N0007');
                        note = data;
                        return [4 /*yield*/, promise_1.default(note.setAuthor(u))];
                    case 5:
                        _a = _e.sent(), err = _a[0], data = _a[1];
                        return [4 /*yield*/, promise_1.default(note.setApplication(app))];
                    case 6:
                        _b = _e.sent(), err = _b[0], data = _b[1];
                        return [3 /*break*/, 9];
                    case 7:
                        console.log('Update de note');
                        return [4 /*yield*/, promise_1.default(note.update({ text: text }))];
                    case 8:
                        _d = _e.sent(), err = _d[0], data = _d[1];
                        if (err)
                            throw new AppError('N0004');
                        note = data;
                        console.log('End Update de note');
                        _e.label = 9;
                    case 9: return [2 /*return*/, note];
                }
            });
        });
    };
    return note;
}());
module.exports = new note();
