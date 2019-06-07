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
var BinaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');
var path = require('path');
var note = require('../libs/note');
module.exports = function (server, db, str) {
    var _a = db, Note = _a.Note, Vocaux = _a.Vocaux;
    var binsocket = BinaryServer({ server: server });
    //lors du connexion au socket pour de transfère de fichier binaire 
    binsocket.on('connection', function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, unique, type, typeId, contactId, appId, pathFile, fileWriter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = require('url').parse("http://bin.fr/so/" + client._socket.upgradeReq.url, true).query, unique = _a.unique, type = _a.type, typeId = _a.typeId, contactId = _a.contactId, appId = _a.appId;
                        if (!unique)
                            return [2 /*return*/];
                        //ici si le stream est déja crée, on le supprime car si non impossible d'écrasé le fichier 
                        str.closeIsStream(unique);
                        //on recrée le fichier 
                        //let nameFile = unique+ '.wav' ; 
                        console.log(appId);
                        return [4 /*yield*/, note.pathstream(appId ? { id: appId } : { typeId: typeId }, unique)];
                    case 1:
                        pathFile = _b.sent();
                        console.log('_______________________________________________', pathFile);
                        if (!pathFile)
                            return [2 /*return*/];
                        fileWriter = new wav.FileWriter(pathFile, {
                            channels: 1,
                            sampleRate: 48000,
                            bitDepth: 16
                        });
                        //si l'utilisateur recoive un stream audio cette évenement est lancer  
                        client.on('stream', function (stream, meta) {
                            stream.pipe(fileWriter);
                            stream.on('end', function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        fileWriter.end();
                                        str.openFile(unique, pathFile);
                                        fileWriter = null;
                                        return [2 /*return*/];
                                    });
                                });
                            });
                        });
                        client.on('close', function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (fileWriter && fileWriter.end) {
                                        //on stope le stream de trashpère de biniare 
                                        fileWriter.end();
                                        fileWriter = null;
                                    }
                                    str.closeIsFile(unique);
                                    return [2 /*return*/];
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    });
};
