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
var api_1 = __importDefault(require("../libs/api"));
var trello = /** @class */ (function () {
    function trello() {
        this.stade = {
            boards: [],
            lists: [],
            labels: [],
        };
    }
    /*
     * Récupèration de tout les boards de trello
    */
    trello.prototype.allBoard = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/trello/boards/' + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        this.stade.boards = data.map(function (_a) {
                            var id = _a.id, name = _a.name, url = _a.url;
                            return { id: id, title: name, url: url };
                        });
                        return [2 /*return*/, [null, this.stade.boards]];
                }
            });
        });
    };
    /*
     * Récupération de tout les label de trello
    */
    trello.prototype.allList = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/trello/lists/' + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        this.stade.lists = data.map(function (_a) {
                            var id = _a.id, name = _a.name;
                            return { value: id, text: name };
                        });
                        return [2 /*return*/, [null, this.stade.lists]];
                }
            });
        });
    };
    /*
     * Récupération de label de trello
    */
    trello.prototype.allLabel = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/trello/label/' + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        this.stade.labels = data.map(function (_a) {
                            var id = _a.id, name = _a.name;
                            return { value: id, text: name };
                        });
                        return [2 /*return*/, [null, this.stade.labels]];
                }
            });
        });
    };
    /*
     * Ajoute de card dans trello
    */
    trello.prototype.card = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(body);
                        return [4 /*yield*/, api_1.default('/trello/card', 'POST', body)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        return [2 /*return*/, [null, data]];
                }
            });
        });
    };
    trello.prototype.cardUpdate = function (body, update) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('cardUpdate', body);
                        return [4 /*yield*/, api_1.default('/trello/card', 'PUT', body)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        return [2 /*return*/, [null, data]];
                }
            });
        });
    };
    trello.prototype.itemCard = function (id, appId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/trello/card/' + id + '/?appId=' + appId)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        return [2 /*return*/, [err, data]];
                }
            });
        });
    };
    return trello;
}());
exports.default = new trello();
