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
var user = /** @class */ (function () {
    function user() {
        this.stade = {
            teams: [],
            membreTrello: [],
            membreInfusionsoft: [],
            //membre trello addable 
            membreTrelloNoteTeam: [],
            //membre infusionsoft addable
            membreIFSNoteTeam: [],
        };
    }
    /*
     * Récupèration de tout les teams de l'application
    */
    user.prototype.allTeam = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/team/application/' + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        this.stade.teams = data;
                        return [2 /*return*/, [null, this.stade.teams]];
                }
            });
        });
    };
    /*
     * si l'application est un trello alors Récupèration de tout les teams trello réel de l'application
    */
    user.prototype.membreTrello = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/trello/membre/' + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        console.log(data);
                        this.stade.membreTrello = data.map(function (_a) {
                            var id = _a.id, fullName = _a.fullName;
                            return { id: id, fullName: fullName, add: id };
                        })
                            .filter(function (_a) {
                            var id = _a.id;
                            return id ? true : false;
                        });
                        this.membreTrelloNoteTeamFind();
                        return [2 /*return*/, [null, this.stade.membreTrello]];
                }
            });
        });
    };
    user.prototype.membreInfusionsoft = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, api_1.default('/infusionsoft/membre/' + id)];
                    case 1:
                        _a = _b.sent(), err = _a[0], data = _a[1].data;
                        if (err)
                            return [2 /*return*/, [err, null]];
                        this.stade.membreInfusionsoft = data.map(function (_a) {
                            var id = _a.id, preferred_name = _a.preferred_name;
                            return { id: id, fullName: preferred_name, add: id };
                        })
                            .filter(function (_a) {
                            var id = _a.id;
                            return id ? true : false;
                        });
                        this.membreIFSNoteTeamFind();
                        return [2 /*return*/, [null, this.stade.membreInfusionsoft]];
                }
            });
        });
    };
    user.prototype.membreIFSNoteTeamFind = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.stade.membreIFSNoteTeam = this.stade.membreInfusionsoft.filter(function (_a) {
                    var id = _a.id;
                    if (_this.stade.teams.filter(function (un) {
                        var unique = un.contactid;
                        if (id == unique) {
                            return true;
                        }
                        return false;
                    }).length > 0) {
                        return false;
                    }
                    return true;
                });
                return [2 /*return*/];
            });
        });
    };
    user.prototype.membreTrelloNoteTeamFind = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.stade.membreTrelloNoteTeam = this.stade.membreTrello.filter(function (tr) {
                    if (_this.stade.teams.filter(function (un) {
                        var unique = un.contactid;
                        if (tr.id == unique) {
                            return true;
                        }
                        return false;
                    }).length > 0) {
                        return false;
                    }
                    return true;
                });
                return [2 /*return*/];
            });
        });
    };
    return user;
}());
exports.default = new user();
