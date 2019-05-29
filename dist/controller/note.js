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
            res.json(notes);
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
    var token = req.query.token;
    User.findOne({
        where: { rememberToken: token }
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
/*
* 	si le fichier dans l'URL n'est pas enregistré, on le suprime
*/
function close(req, res) {
    var id = req.params.id;
    if (id && this.str.closeIsFile(id)) {
        return res.json({ success: true });
    }
    res.json({ error: true });
}
exports.close = close;
//supression d'un note dque l'on vient juste d'enregistré 
function deleteNote(req, res) {
    var lang = req.lang();
    var id = req.params.id;
    if (id && this.str.closeIsStream(id)) {
        var nameFile = id + '.wav';
        var filePath = path.join(__dirname, '../', '/notes/') + nameFile;
        if (fs.existsSync(filePath) && fs.unlinkSync(filePath)) {
            return res.json({ success: true });
        }
    }
    res.json({ error: true });
}
exports.deleteNote = deleteNote;
//écouter un note en particuler 
function listen(req, res) {
    //@todo : bien entendue, il faut faire la vérification si vous avez le droit 
    //d'écouter ou non le contenu de cette notes 
    //écouter une note en particulier 
    var lang = req.lang();
    var id = req.params.id;
    if (id) {
        //Le filename représente l'ID du fichier 
        var nameFile = id + '.wav';
        var filePath = path.join(__dirname, '../', '/notes/') + nameFile;
        if (!fs.existsSync(filePath)) {
            return res.send(lang['filesnoteimpty']);
        }
        ////////////////////////////////////////////////////
        var stat = fs.statSync(filePath);
        var fileSize = stat.size;
        var range = req.headers.range;
        if (range) {
            var parts = range.replace(/bytes=/, "").split("-");
            var start = parseInt(parts[0], 10);
            var end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            var chunksize = (end - start) + 1;
            var readStream = fs.createReadStream(filePath, { start: start, end: end });
            var head = {
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
            var head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            var stream = fs.createReadStream(filePath);
            this.str.openStream(id, stream);
            stream.pipe(res);
        }
        ////////////////////////////////////////////////////
        return true;
    }
    // ici le fichier n'est pas trouver 
    return res.send(lang['filesnoteimpty']);
}
exports.listen = listen;
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
    var id = req.params.id;
    var _a = this.db, User = _a.User, Note = _a.Note, Application = _a.Application;
    Note.findOne({ where: { unique: id } })
        .then(function (n) {
        if (n) {
            return res.json({ success: true });
        }
        res.status(400).json({ error: true });
    })
        .catch(function (e) { return res.status(400).json({ error: true }); });
}
exports.check = check;
//enregistrement d'un note en particuler 
function save(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, User, Note, Application, id, _b, token, typeId, _c, title, text, type, newId, where, id_1, nameFile, pathFile, rename;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = this.db, User = _a.User, Note = _a.Note, Application = _a.Application;
                    id = req.params.id;
                    _b = req.query, token = _b.token, typeId = _b.typeId;
                    _c = req.body, title = _c.title, text = _c.text, type = _c.type, newId = _c.newId;
                    where = {};
                    if (token) {
                        where = { rememberToken: token };
                    }
                    else if (req.user.id) {
                        id_1 = req.user.id;
                        where = { id: id_1 };
                    }
                    else {
                        return [2 /*return*/, res.json({ error: true, code: 'NS0001' })];
                    }
                    console.log('-------------SAVE NOTE');
                    console.log(id, '---', typeId, '---', type);
                    this.str.deleteFile(id);
                    nameFile = id + '.wav';
                    pathFile = path.join(__dirname, '../', '/notes/') + nameFile;
                    if (!newId) return [3 /*break*/, 2];
                    return [4 /*yield*/, this.str.renameFile(pathFile, path.join(__dirname, '../', '/notes/') + newId + '.wav')];
                case 1:
                    rename = _d.sent();
                    if (!rename) {
                        return [2 /*return*/, res.json({ error: true, code: 'NS0000' })];
                    }
                    id = newId;
                    _d.label = 2;
                case 2:
                    this.str.deleteFile(id);
                    //check if note existe	
                    //si c'est le cas, on selectionne la note, et on met a jour tout simplement les informations
                    //comme la durée et la nouvelle format 
                    Note.findOne({ where: { unique: id } })
                        .then(function (n) {
                        if (!n) {
                            if (type == 'trello') {
                                var url = decodeURIComponent(typeId);
                                Application.find({ where: { url: url } })
                                    .then(function (i) {
                                    if (i) {
                                        User.find({
                                            where: where,
                                        })
                                            .then(function (user) {
                                            Note.create({ title: title, text: text, unique: id, type: type })
                                                .then(function (n) {
                                                n.setAuthor(user);
                                                n.setApplication(i);
                                                res.json({ success: true });
                                            })
                                                .catch(function (e) { return res.json({ error: true, code: 'NS0003' }); });
                                        })
                                            .catch(function (e) { return res.json({ error: true, code: 'NS0004' }); });
                                    }
                                    else {
                                        res.json({ error: true, code: 'NS0005' });
                                    }
                                })
                                    .catch(function (e) {
                                    console.log(e);
                                    res.json({ error: true, code: 'NS0006' });
                                });
                            }
                            else {
                                Application.find({ where: { compteId: typeId } })
                                    .then(function (i) {
                                    if (i) {
                                        User.find({
                                            where: { rememberToken: token },
                                        })
                                            .then(function (user) {
                                            Note.create({ title: title, text: text, unique: id, type: type })
                                                .then(function (n) {
                                                n.setAuthor(user);
                                                n.setApplication(i);
                                                res.json({ success: true });
                                            })
                                                .catch(function (e) { return res.json({ error: true, code: 'NS0003' }); });
                                        })
                                            .catch(function (e) { return res.json({ error: true, code: 'NS0004' }); });
                                    }
                                    else {
                                        res.json({ error: true, code: 'NS0005' });
                                    }
                                })
                                    .catch(function (e) {
                                    console.log(e);
                                    res.json({ error: true, code: 'NS0006' });
                                });
                            }
                        }
                        else {
                            n.update({ text: text })
                                .then(function (n) {
                                res.json({ success: true, code: 'NS0007' });
                            })
                                .catch(function (e) { return res.json({ error: true }); });
                        }
                    })
                        .catch(function (e) { return res.json({ error: true }); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.save = save;
//uploade d'un audion pour l'enregistré dans vos notes  
function upload(req, res) {
    var _this = this;
    var _a = req.query, unique = _a.unique, type = _a.type, typeId = _a.typeId, contactId = _a.contactId;
    if (unique) {
        this.str.closeIsStream(unique);
    }
    var busboy = new Busboy({ headers: req.headers });
    var filePath = path.join(__dirname, '../', '/notes/') + unique + '.wav';
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        file.pipe(fs.createWriteStream(filePath));
    });
    busboy.on('finish', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.str.openFile(unique, filePath);
            res.status(200).json({ 'message': "File uploaded successfully." });
            return [2 /*return*/];
        });
    }); });
    return req.pipe(busboy);
}
exports.upload = upload;
