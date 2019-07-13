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
var user = require('../libs/user');
var team = require('../libs/team');
var promise_1 = __importDefault(require("../libs/promise"));
var AppError = require('../libs/AppError');
var note = require('../libs/note');
var forearch = require('../libs/forearch');
/*
 * Classe de manipulation des actions vers trello
*/
var app = /** @class */ (function () {
    function app() {
    }
    /*
     * Création et attachement d'un formulaire a une notes
    */
    app.prototype.create = function (n, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, Form, itemNote, traits, _i, traits_1, i, type, name_1, value, _c, err, data_1, f;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        Form = global['db'].Form;
                        return [4 /*yield*/, note.find(n)];
                    case 1:
                        itemNote = _d.sent();
                        if (!itemNote)
                            throw new AppError('F0001');
                        console.log(data);
                        traits = data.filter(function (e) { return e.type !== undefined && e.name !== undefined && e.value !== undefined; });
                        console.log('------ create ');
                        console.log('------ noteId :  ', n);
                        console.log(traits);
                        _i = 0, traits_1 = traits;
                        _d.label = 2;
                    case 2:
                        if (!(_i < traits_1.length)) return [3 /*break*/, 8];
                        i = traits_1[_i];
                        type = i.type, name_1 = i.name, value = i.value;
                        return [4 /*yield*/, promise_1.default(Form.findOne({
                                where: { name: name_1, NoteId: n }
                            }))];
                    case 3:
                        _c = _d.sent(), err = _c[0], data_1 = _c[1];
                        f = data_1;
                        console.log('____OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
                        console.log('-name : ', name_1);
                        console.log('-NoteId : ', n);
                        if (!f) return [3 /*break*/, 5];
                        return [4 /*yield*/, promise_1.default(f.update({ type: type, name: name_1, value: value }))];
                    case 4:
                        //ici on fait la mise a jour de la valeur car la formulaire existe déja
                        _a = _d.sent(), err = _a[0], f = _a[1];
                        if (err)
                            throw new AppError('F0004');
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, promise_1.default(Form.create({ type: type, name: name_1, value: value, NoteId: itemNote.id }))];
                    case 6:
                        //ici on crée le formulaire car il n'existe pas encore 
                        _b = _d.sent(), err = _b[0], f = _b[1];
                        console.log(err);
                        if (err)
                            throw new AppError('F0002');
                        _d.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, data];
                }
            });
        });
    };
    /*
     * 	Récupération d'une formulaire d'une note en question
    */
    app.prototype.find = function (n) {
        return __awaiter(this, void 0, void 0, function () {
            var Form, itemNote, _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Form = global['db'].Form;
                        return [4 /*yield*/, note.find(n)];
                    case 1:
                        itemNote = _b.sent();
                        if (!itemNote)
                            throw new AppError('F0001');
                        return [4 /*yield*/, promise_1.default(itemNote.getForms())];
                    case 2:
                        _a = _b.sent(), err = _a[0], data = _a[1];
                        if (err)
                            throw new AppError('F0003');
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return app;
}());
module.exports = new app();
