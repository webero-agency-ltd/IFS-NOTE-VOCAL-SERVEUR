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
var promise_1 = __importDefault(require("../libs/promise"));
var site = require('../config/site');
var request = require('request');
var querystring = require('querystring');
var basic = require('basic-authorization-header');
var fs = require('fs');
var moment = require('moment');
var path = require('path');
var execSync = require('child_process').execSync;
var forearch_1 = __importDefault(require("../libs/forearch"));
function index(req, res) {
    var lang = req.lang();
    res.render('index.ejs', { lang: JSON.stringify(res.locals.lang), urlapplication: site.urlapp, portapplication: site.port, chromeId: site.chromeId });
}
exports.index = index;
function vocalNote(req, res) {
    var lang = req.lang();
    res.render('noteVocal.ejs', { lang: JSON.stringify(res.locals.lang), urlapplication: site.urlapp, portapplication: site.port });
}
exports.vocalNote = vocalNote;
//actualisation de token infusionsoft 
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, Application, User, Team, err, data, i, application, findnotes;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = this.db, Application = _b.Application, User = _b.User, Team = _b.Team;
                    //récupération des utilisateur courant 
                    data;
                    return [4 /*yield*/, promise_1.default(Application.findAll({ where: { type: 'infusionsoft' } }))];
                case 1:
                    _a = _c.sent(), err = _a[0], data = _a[1];
                    if (err || !data) {
                        return [2 /*return*/, res.error('IXR0001')];
                    }
                    i = data;
                    application = [];
                    findnotes = forearch_1.default(i, function (data, next) {
                        var token;
                        try {
                            token = JSON.parse(data.accessToken);
                        }
                        catch (e) {
                            token = null;
                        }
                        if (!token || !token['access_token']) {
                            //@todo : en temps normale, on doivent ajouter ici un sytem qui va permètre de
                            //d'envoyer un email a l'amin route pour indiquer que la refresh token 
                            //a eu une erreur 
                            application = [{ id: data.id, status: 'error', code: 'IXD0001' }].concat(application);
                            return next();
                        }
                        //formatage de ces token infuionsoft 
                        var url = 'https://api.infusionsoft.com/token';
                        var form = {
                            grant_type: 'refresh_token',
                            refresh_token: token['refresh_token']
                        };
                        var formData = querystring.stringify(form);
                        var contentLength = formData.length;
                        var Authorization = basic(site.clientId, site.clientSecret);
                        request({
                            headers: {
                                'Content-Length': contentLength,
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Authorization': Authorization,
                            },
                            uri: url,
                            body: formData,
                            method: 'POST'
                        }, function (error, _res, body) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(body);
                                            if (!(!error && _res.statusCode == 200)) return [3 /*break*/, 2];
                                            application = [{ id: data.id, status: 'success' }].concat(application);
                                            return [4 /*yield*/, promise_1.default(data.update({ accessToken: body }))];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            application = [{ id: data.id, status: 'error', code: 'IXD0002', body: body }].concat(application);
                                            _a.label = 3;
                                        case 3:
                                            next();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    });
                    findnotes.end(function () {
                        //création du fichier log et qui serait visible seulement par l'adinistrateur 
                        fs.writeFile(path.join(__dirname, '../token/' + moment().format("MM_ddd_YYYY_hh_mm_ss_a") + '_log.json'), JSON.stringify(application), 'utf8', function (err) {
                            var cmd = "echo \"curl " + site.urlapp + "/refresh-token\" | at now + 180 minutes";
                            var options = {
                                encoding: 'utf8'
                            };
                            var command = execSync(cmd, options);
                            console.log('______________________________');
                            console.log(command);
                            res.success(i);
                        });
                    });
                    findnotes.run();
                    return [2 /*return*/];
            }
        });
    });
}
exports.refreshToken = refreshToken;
