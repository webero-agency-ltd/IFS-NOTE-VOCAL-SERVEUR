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
var ensureAuth_1 = __importDefault(require("../middleware/ensureAuth"));
var strategy_1 = __importDefault(require("../middleware/strategy"));
//const passport = require('passport');
//const validator = require("../request/");  
var signup = require('../controller/signup');
var login = require('../controller/login');
var application = require('../controller/application');
var team = require('../controller/team');
var note = require('../controller/note');
var tansvase = require('../controller/tansvase');
var trello = require('../controller/trello');
var home = require('../controller/index');
var infusionsoft = require('../controller/infusionsoft');
var external = require('../controller/external');
var pour = require('../controller/pour');
var form = require('../controller/form');
var hangel = require('../libs/hangel').hangel;
module.exports = function (app, db, str) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //controlleur de base de l'application qui vous affiche votre application  
            app.get('/', ensureAuth_1.default, home.index.bind({ db: db }));
            app.get('/vocal-note', ensureAuth_1.default, home.index.bind({ db: db }));
            app.get('/refresh-token', home.refreshToken.bind({ db: db }));
            //page d'authentification 
            app.get('/login', strategy_1.default, login.page.bind({ db: db }));
            app.post('/login', strategy_1.default, login.create.bind({ db: db }));
            app.get('/signup', signup.page.bind({ db: db }));
            app.post('/signup', signup.create.bind({ db: db }));
            app.get('/logout', function (req, res) {
                //destruction de cookie rememberToken  
                res.clearCookie("me_identity");
                res.clearCookie("remember_me");
                req.logout();
                res.redirect('/');
            });
            app.get('/user/authenticated', function (req, res) {
                if (req.user) {
                    return res.success(req.user);
                }
                return res.success(null);
            });
            app.get('/application', ensureAuth_1.default, hangel.bind({ func: application.index.bind({ db: db }) }));
            app.get('/application/item/:id', ensureAuth_1.default, hangel.bind({ func: application.item.bind({ db: db }) }));
            app.get('/application/check/:id/:type', hangel.bind({ func: application.check.bind({ db: db }) }));
            //app.get('/application/infusionsoft/findid',ensureAuth,application.create.bind({db})) ;
            app.get('/application/infusionsoft/redirect', ensureAuth_1.default, hangel.bind({ func: application.redirect.bind({ db: db }) }));
            //app.get('/application/infusionsoft/info/:id',ensureAuth,application.infos.bind({db})) ;
            app.get('/application/trello/redirect/:id', ensureAuth_1.default, hangel.bind({ func: application.redirectTrello.bind({ db: db }) }));
            app.post('/application', ensureAuth_1.default, hangel.bind({ func: application.create.bind({ db: db }) }));
            app.get('/application/reauthorize/:type/:id', ensureAuth_1.default, hangel.bind({ func: application.reauthorize.bind({ db: db, str: str }) }));
            app.get('/team/application/:id', ensureAuth_1.default, team.index.bind({ db: db }));
            app.get('/team/:id/:type/:contactid', ensureAuth_1.default, team.create.bind({ db: db }));
            //champ utiliser par infusionsoft membre
            app.get('/infusionsoft/membre/:id', ensureAuth_1.default, hangel.bind({ func: infusionsoft.membre.bind({ db: db }) }));
            app.get('/infusionsoft/contacts/:id', ensureAuth_1.default, hangel.bind({ func: infusionsoft.contacts.bind({ db: db }) }));
            app.get('/infusionsoft/note/:id', ensureAuth_1.default, hangel.bind({ func: infusionsoft.notes.bind({ db: db }) }));
            //route des notes
            app.get('/note/:id', hangel.bind({ func: note.item.bind({ db: db, str: str }) }));
            app.get('/note/check/:id', hangel.bind({ func: note.check.bind({ db: db, str: str }) }));
            app.post('/note/checks', hangel.bind({ func: note.checks.bind({ db: db, str: str }) }));
            app.get('/notes/:id', hangel.bind({ func: note.index.bind({ db: db, str: str }) }));
            //app.get('/close/:id',ensureAuth,note.close.bind({db,str})) ;
            app.get('/audio/:id', hangel.bind({ func: note.listen.bind({ db: db, str: str }) }));
            //app.get('/audio/delete/:id',ensureAuth,note.deleteNote.bind({db,str})) ;
            app.post('/upload', ensureAuth_1.default, hangel.bind({ func: note.upload.bind({ db: db, str: str }) }));
            //app.post('/save/:id',note.save.bind({db,str})) ;
            //tansvase notes 
            //transvase task 
            //app.get('/tansvase/notes/:id',tansvase.notes.bind({db,str})) ;
            //app.get('/tansvase/tasks/:id',tansvase.tasks.bind({db,str})) ;
            //trello ICI 
            app.get('/trello', trello.view);
            app.post('/trello/boards/:id', ensureAuth_1.default, hangel.bind({ func: trello.boardsUpdate.bind({ db: db, str: str }) }));
            app.get('/trello/boards/:id', ensureAuth_1.default, hangel.bind({ func: trello.boards.bind({ db: db, str: str }) }));
            app.get('/trello/lists/:id', ensureAuth_1.default, hangel.bind({ func: trello.lists.bind({ db: db, str: str }) }));
            app.get('/trello/label/:id', ensureAuth_1.default, hangel.bind({ func: trello.label.bind({ db: db, str: str }) }));
            app.get('/trello/membre/:id', ensureAuth_1.default, hangel.bind({ func: trello.membre.bind({ db: db, str: str }) }));
            app.get('/trello/on/:id', hangel.bind({ func: trello.event.bind({ db: db, str: str }) }));
            app.post('/trello/on/:id', hangel.bind({ func: trello.event.bind({ db: db, str: str }) }));
            app.get('/external', ensureAuth_1.default, hangel.bind({ func: external.index.bind({ db: db }) }));
            app.post('/external', ensureAuth_1.default, hangel.bind({ func: external.create.bind({ db: db }) }));
            app.post('/external/note', ensureAuth_1.default, hangel.bind({ func: external.note.bind({ db: db }) }));
            //application externale autre celle
            app.get('/pour/:application', ensureAuth_1.default, hangel.bind({ func: pour.index.bind({ db: db }) }));
            app.post('/pour', ensureAuth_1.default, hangel.bind({ func: pour.create.bind({ db: db }) }));
            app.delete('/pour/:id', ensureAuth_1.default, hangel.bind({ func: pour.delet.bind({ db: db }) }));
            //création de formulaire 
            app.get('/form/:id', ensureAuth_1.default, hangel.bind({ func: form.index.bind({ db: db }) }));
            app.post('/form/:id', ensureAuth_1.default, hangel.bind({ func: form.create.bind({ db: db }) }));
            return [2 /*return*/, new Promise(function (resolve) { return resolve(true); })];
        });
    });
};
