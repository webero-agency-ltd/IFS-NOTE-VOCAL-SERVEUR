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
Object.defineProperty(exports, "__esModule", { value: true });
function api(url, methode, data) {
    if (methode === void 0) { methode = 'GET'; }
    if (data === void 0) { data = null; }
    return __awaiter(this, void 0, void 0, function () {
        var uploadResponse, json, e_1, json, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = window.urlapplication + url;
                    uploadResponse = null;
                    if (!(methode == 'GET')) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    uploadResponse = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })];
                case 3:
                    uploadResponse = _a.sent();
                    _a.label = 4;
                case 4:
                    if (!uploadResponse.ok) return [3 /*break*/, 9];
                    json = null;
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, uploadResponse.json()];
                case 6:
                    json = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    return [2 /*return*/, [{ message: 'FORMAT ERROR' }, null]];
                case 8:
                    if (json && json.type == 'ERROR') {
                        return [2 /*return*/, [json, null]];
                    }
                    return [2 /*return*/, [null, json]];
                case 9:
                    json = null;
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 12, , 13]);
                    return [4 /*yield*/, uploadResponse.json()];
                case 11:
                    json = _a.sent();
                    return [3 /*break*/, 13];
                case 12:
                    e_2 = _a.sent();
                    return [2 /*return*/, [{ message: 'FORMAT ERROR' }, null]];
                case 13: return [2 /*return*/, [json, null]];
            }
        });
    });
}
exports.default = api;