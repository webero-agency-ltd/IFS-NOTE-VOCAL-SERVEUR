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
/* *traitement de l'enregistrement des micro  */
var timer_1 = __importDefault(require("./timer"));
var makeid_1 = __importDefault(require("./makeid"));
var tpl_1 = require("./tpl");
var readydom_1 = __importDefault(require("./readydom"));
var pauseall_1 = __importDefault(require("./pauseall"));
var DOM_1 = require("./DOM");
var context = null;
var recordClass = /** @class */ (function () {
    function recordClass(baseURL) {
        this.NOTEID = null;
        this.baseURL = baseURL;
        //si cette valeur est = true, on fait l'enregistrement automatique des flux audio au serveur  	
        this.recording = false;
        this.chrono = false;
        this.dom = {};
        this.urlListen = null;
        //fonction callback action 
        this.connexion = null;
        this.saveStream = null;
        this.stream = null;
        this.close = null;
    }
    //on demande au serveur de commencer une enregistrement 
    //si le reserveur répond OK, le backend lance une evenement 
    //connexion-soket-note-vocaux
    recordClass.prototype.start = function (NOTEID) {
        var _a = this.dom, audioUpload = _a.audioUpload, btnRun = _a.btnRun, btnDelete = _a.btnDelete, noteSave = _a.noteSave, logoRecorder = _a.logoRecorder, listenContent = _a.listenContent;
        //transformation des buttons du recorder 
        listenContent.html(' ');
        //supression de tout les audios controller qui existe X1, X2, avec l'élement audion en question 
        var el = listenContent.find('.audio-controller');
        if (el.length) {
            el.remove();
        }
        //changer le logos en active, pour le rendre de couleur rouge
        logoRecorder.addClass('active');
        //transformation du btn star en btn stop qui va stoper l'enregistrement de vocaux 
        btnRun.val('stop enregistrement');
        btnRun.removeAttr('disabled');
        //désactivé le button uploader 
        audioUpload.attr('desabled', 'desabled');
        //desactiver le buttin qui va permerter de suprmimer les notes 
        btnDelete.attr('disabled', 'disabled');
        //desactiver le button de création de note ( validation de note d'infusionsoft ), et de couleur vert
        noteSave.attr('disabled', 'disabled');
        //demande de connexion au serveur 
        this.connexion({ NOTEID: this.NOTEID, type: 'native', typeId: '', contactId: '' });
    };
    recordClass.prototype.stop = function () {
        //stop l'enregistrement 
        this.chrono.stop();
        var _a = this.dom, btnRun = _a.btnRun, btnDelete = _a.btnDelete, noteSave = _a.noteSave, logoRecorder = _a.logoRecorder, listenContent = _a.listenContent;
        logoRecorder.removeClass('active');
        btnDelete.removeAttr('disabled');
        btnRun.attr('disabled', 'disabled');
        btnRun.val('Enregistrer');
        //affichage du préécoute 
        //PROT+'://'+URL+PORT
        var url = this.baseURL + '/audio/' + this.NOTEID + '/?token=' + makeid_1.default(60);
        var tpl = tpl_1.lecteurTpl(url, 'audio-liste-note-recordin');
        listenContent.html(tpl);
        listenContent.show();
        noteSave.removeAttr('disabled');
        //demande au serveur de stoper l'enregistrement 
        this.recording = false;
        this.saveStream(null);
    };
    recordClass.prototype.showNote = function (url) {
        var _a = this.dom, btnRun = _a.btnRun, btnDelete = _a.btnDelete, noteSave = _a.noteSave, logoRecorder = _a.logoRecorder, listenContent = _a.listenContent;
        var tpl = tpl_1.lecteurTpl(url, 'audio-liste-note-recordin');
        listenContent.html(tpl);
        listenContent.show();
    };
    //supression du record enregistré actuelement 
    recordClass.prototype.delete = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, btnRun, btnDelete, noteSave, logoRecorder, listenContent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pauseall_1.default();
                        _a = this.dom, btnRun = _a.btnRun, btnDelete = _a.btnDelete, noteSave = _a.noteSave, logoRecorder = _a.logoRecorder, listenContent = _a.listenContent;
                        listenContent.hide();
                        btnDelete.attr('disabled', 'disabled');
                        btnRun.removeAttr('disabled');
                        //rendre de nouveaux inactive la button de création de notes 
                        noteSave.attr('disabled', 'disabled');
                        return [4 /*yield*/, fetch(url)];
                    case 1: 
                    //supression de ce fichier dans le serveur 
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    //création de ID 
    recordClass.prototype.makeid = function (ID) {
        if (ID) {
            return this.NOTEID = ID;
        }
        return this.NOTEID = makeid_1.default(8);
    };
    //ajout du template du recorder ICI
    recordClass.prototype.recorder = function () {
        var _this = this;
        //écouter ici si les elements du recorder sont tout bien enregistré au DOM 
        readydom_1.default('#recorder-template', function () {
            _this.dom = DOM_1.recorder();
            if (_this.urlListen) {
                _this.showNote(_this.urlListen);
            }
            //lancement des utiles par le recorder en question 
            _this.event();
        });
        return tpl_1.recoder();
    };
    //envoyer le flux de traitement a la backend de l'application  
    recordClass.prototype.recorderProcess = function (e) {
        if (!this.recording)
            return;
        var left = e.inputBuffer.getChannelData(0);
        this.stream(left.slice());
    };
    //capture le flux audio qui vient du micro
    //et faire quelque traitement 
    recordClass.prototype.initializeRecorder = function (stream) {
        var audioContext = window.AudioContext;
        context = new audioContext();
        var audioInput = context.createMediaStreamSource(stream);
        var bufferSize = 2048;
        var recorder = context.createScriptProcessor(bufferSize, 1, 1);
        recorder.onaudioprocess = this.recorderProcess.bind(this);
        audioInput.connect(recorder);
        recorder.connect(context.destination);
    };
    //initialisation du composante d'enregistrement 
    recordClass.prototype.init = function (ID, urlListen) {
        var _this = this;
        if (urlListen) {
            this.urlListen = urlListen;
        }
        //@todo : le button vert de création de note a ajouter un attribut desabled 
        //initialisation de micro recorder 
        navigator.getUserMedia({ audio: true }, function (stream) {
            _this.initializeRecorder(stream);
        }, function (e) {
            alert('une erreur est survenue');
        });
        //lancement de l'initialisation du timeur 
        this.chrono = timer_1.default();
        this.chrono.setcallback(function (time) {
            document.getElementById('counter-recorded').value = time;
        });
        return this.makeid(ID);
    };
    //écoute si le backend lance une evenement connexion-soket-note-vocaux
    //cette evenement veut dire que le serveur a répondu OK et on peut commencer 
    //l'enregistrement 
    recordClass.prototype.connexionSoketNoteVocaux = function () {
        console.log('--- START CHRONO ', this.chrono);
        //lancement du chrono
        if (this.chrono) {
            this.chrono.start();
        }
        this.recording = true;
    };
    recordClass.prototype.event = function () {
        var _this = this;
        var _a = this.dom, noteSave = _a.noteSave, btnRun = _a.btnRun, btnDelete = _a.btnDelete, audioUpload = _a.audioUpload, audioUploadBtn = _a.audioUploadBtn, listenContent = _a.listenContent;
        btnRun.on('click', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //écouter le clique de l'enregistrement des notes vocaux 
                if (this.recording)
                    this.stop();
                else
                    this.start();
                return [2 /*return*/];
            });
        }); });
        btnDelete.on('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                this.chrono.reset();
                url = this.baseURL + '/audio/delete/' + this.NOTEID;
                this.delete(url);
                return [2 /*return*/];
            });
        }); });
        audioUpload.on('change', function (ev) { return __awaiter(_this, void 0, void 0, function () {
            var formData, url, uploadResponse, data, url_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ev.target.files.length) return [3 /*break*/, 4];
                        listenContent.html('');
                        //désactivé la button 
                        audioUploadBtn.attr('disabled', 'disabled');
                        //désactivé le button delete 
                        btnDelete.attr('disabled', 'disabled');
                        //désactivé le boutton reocerd 
                        btnRun.attr('disabled', 'disabled');
                        //éfacer l'enregistrement précedement fait 
                        this.chrono.reset();
                        //désactivé le button de création de note
                        noteSave.attr('disabled', 'disabled');
                        formData = new FormData();
                        formData.append('file', ev.target.files[0]);
                        url = this.baseURL + '/upload?unique=' + this.NOTEID + '&type=infusionsoft&typeId=' + config.CONFIG_PAGE.typeId + '&contactId=' + config.CONFIG_PAGE.contactId;
                        this.close(this.baseURL + '/close/' + this.NOTEID);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: {
                                //'Content-Type': 'multipart/form-data'
                                },
                                body: formData
                            })];
                    case 1:
                        uploadResponse = _a.sent();
                        if (!uploadResponse.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, uploadResponse.json()];
                    case 2:
                        data = _a.sent();
                        url_1 = this.baseURL + '/audio/' + this.NOTEID + '/?token=' + makeid_1.default(60);
                        listenContent.html(tpl_1.lecteurTpl(url_1, 'audio-liste-note-upload'));
                        listenContent.show();
                        noteSave.removeAttr('disabled');
                        _a.label = 3;
                    case 3:
                        //Tout les button son de nouveaux clicable 
                        setTimeout(function () {
                            //désactivé la button 
                            audioUploadBtn.removeAttr('disabled');
                            //désactivé le button delete 
                            btnDelete.removeAttr('disabled');
                            //désactivé le boutton reocerd 
                            //btnRun.removeAttr('disabled') ;
                        }, 1000);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //ICI on veut faire l'upload de fichier 
        audioUploadBtn.on('click', function () {
            audioUpload.trigger('click');
        });
    };
    return recordClass;
}());
function recorderinstance(baseURL) {
    if (baseURL === void 0) { baseURL = ''; }
    return new recordClass(baseURL);
}
exports.default = recorderinstance;
