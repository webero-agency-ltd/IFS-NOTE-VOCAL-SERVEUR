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
var forearch_1 = __importDefault(require("../libs/forearch"));
var path = require('path');
var fs = require('fs');
var Busboy = require('busboy');
var note = require('../libs/note');
var application = require('../libs/application');
var AppError = require('../libs/AppError');
//liste de tout les notes d'un utilisateur en particulier 
//@todo : il faut bien avoire une session pour faire la recherche pour ne pas afficher tout les notes 
//d'un utilisateur qui n'est pas la votre
function index(req, res) {
    var lang = req.lang();
    var id = req.params.id;
    var _a = this.db, Application = _a.Application, User = _a.User;
    Application.findOne({
        where: { id: id }
    })
        .then(function (i) {
        i.getNotes()
            .then(function (notes) {
            res.success(notes);
        })
            .catch(function (e) {
            console.log(e);
            res.json({ error: true });
        });
    })
        .catch(function (e) { return res.json({ error: true }); });
}
exports.index = index;
//Récupération de informations d'un note en particuler 
function item(req, res) {
    var lang = req.lang();
    var _a = this.db, Note = _a.Note, User = _a.User;
    var id = req.params.id;
    var apiKey = req.query.apiKey;
    console.log(apiKey);
    User.findOne({
        where: { rememberToken: apiKey }
    })
        .then(function (u) {
        if (u) {
            Note.findOne({
                where: { unique: id }
            })
                .then(function (n) {
                res.json(n);
            })
                .catch(function (e) { return res.json({ error: true }); });
        }
        else {
            res.json({ error: true });
        }
    })
        .catch(function (e) { return res.json({ error: true }); });
}
exports.item = item;
//écouter un note en particuler 
function listen(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var lang, id, n, filePath, stat, fileSize, range, parts, start, end, chunksize, readStream, head, head, stream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lang = req.lang();
                    id = req.params.id;
                    if (!id) return [3 /*break*/, 3];
                    return [4 /*yield*/, note.find({ unique: id })];
                case 1:
                    n = _a.sent();
                    if (!n)
                        throw new AppError('EN0008');
                    return [4 /*yield*/, note.path({ id: n.ApplicationId }, id)];
                case 2:
                    filePath = _a.sent();
                    if (!fs.existsSync(filePath)) {
                        return [2 /*return*/, res.send(lang['filesnoteimpty'])];
                    }
                    stat = fs.statSync(filePath);
                    fileSize = stat.size;
                    range = req.headers.range;
                    if (range) {
                        parts = range.replace(/bytes=/, "").split("-");
                        start = parseInt(parts[0], 10);
                        end = parts[1]
                            ? parseInt(parts[1], 10)
                            : fileSize - 1;
                        chunksize = (end - start) + 1;
                        readStream = fs.createReadStream(filePath, { start: start, end: end });
                        head = {
                            'Content-Range': "bytes " + start + "-" + end + "/" + fileSize,
                            'Accept-Ranges': 'bytes',
                            'Content-Length': chunksize,
                            'Content-Type': 'video/mp4',
                        };
                        res.writeHead(206, head);
                        this.str.openStream(id, readStream);
                        readStream.pipe(res);
                    }
                    else {
                        head = {
                            'Content-Length': fileSize,
                            'Content-Type': 'video/mp4',
                        };
                        res.writeHead(200, head);
                        stream = fs.createReadStream(filePath);
                        this.str.openStream(id, stream);
                        stream.pipe(res);
                    }
                    ////////////////////////////////////////////////////
                    return [2 /*return*/, true];
                case 3: 
                // ici le fichier n'est pas trouver 
                return [2 /*return*/, res.send(lang['filesnoteimpty'])];
            }
        });
    });
}
exports.listen = listen;
/*
 * Chercher si les notes ici ce sont des notes trello
*/
function checks(req, res) {
    var id = req.params.id;
    var _a = this.db, User = _a.User, Note = _a.Note, Application = _a.Application;
    var urls = req.body.urls;
    var datas = urls.split(',,,');
    var response = [];
    var findnotes = forearch_1.default(datas, function (data, next) {
        var urlDecode = decodeURIComponent(data.replace('https://trello.com', ''));
        var unique = urlDecode.split('/').join('_').replace('/', '_');
        Note.findOne({ where: { unique: unique } })
            .then(function (n) {
            if (n) {
                response.push(data);
            }
            next();
        })
            .catch(function (e) { return next(); });
    });
    findnotes.end(function (argument) {
        return res.json(response);
    });
    findnotes.run();
}
exports.checks = checks;
function check(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, where, n;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    where = { $like: '%' + decodeURIComponent(id) + '%' };
                    return [4 /*yield*/, note.find({ where: where })];
                case 1:
                    n = _a.sent();
                    if (n) {
                        return [2 /*return*/, res.success(n)];
                    }
                    return [2 /*return*/, res.status(400).error('check')];
            }
        });
    });
}
exports.check = check;
//uploade d'un audion pour l'enregistré dans vos notes  
function upload(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, file, NOTEID, type, appId, newId, title, text, apiKey, attache, nativeId, busboy, filePath, userwhere, id, newPath, rename;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.query, file = _a.file, NOTEID = _a.NOTEID, type = _a.type, appId = _a.appId, newId = _a.newId, title = _a.title, text = _a.text, apiKey = _a.apiKey, attache = _a.attache, nativeId = _a.nativeId;
                    busboy = new Busboy({ headers: req.headers });
                    console.log('---------------------------------');
                    console.log(NOTEID, type, appId);
                    return [4 /*yield*/, note.path({ id: appId }, NOTEID)];
                case 1:
                    filePath = _b.sent();
                    userwhere = {};
                    if (apiKey) {
                        userwhere = { rememberToken: apiKey };
                    }
                    else if (req.user.id) {
                        id = req.user.id;
                        userwhere = { id: id };
                    }
                    else {
                        return [2 /*return*/, res.error('N0002')];
                    }
                    if (!(newId && newId !== '' && newId !== null && newId !== 'null')) return [3 /*break*/, 4];
                    return [4 /*yield*/, note.path({ id: appId }, newId)];
                case 2:
                    newPath = _b.sent();
                    return [4 /*yield*/, this.str.renameFile(filePath, newPath)];
                case 3:
                    rename = _b.sent();
                    if (!rename)
                        return [2 /*return*/, res.error('N0003')];
                    NOTEID = newId;
                    _b.label = 4;
                case 4:
                    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                        file.pipe(fs.createWriteStream(filePath));
                    });
                    busboy.on('finish', function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    //upload terminer, on fait maintenant la 
                                    _b = (_a = res).success;
                                    return [4 /*yield*/, note.create(NOTEID, title, text, appId, type, userwhere, attache, nativeId)];
                                case 1:
                                    //upload terminer, on fait maintenant la 
                                    _b.apply(_a, [_c.sent()]);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, req.pipe(busboy)];
            }
        });
    });
}
exports.upload = upload;
