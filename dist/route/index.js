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
var infusionsoft = require('../controller/infusionsoft');
var team = require('../controller/team');
var note = require('../controller/note');
var tansvase = require('../controller/tansvase');
module.exports = function (app, db, str) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //controlleur de base de l'application qui vous affiche votre application  
            app.get('/', ensureAuth_1.default, require('../controller/index').bind({ db: db }));
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
            app.get('/infusionsoft', ensureAuth_1.default, infusionsoft.index.bind({ db: db }));
            app.get('/infusionsoft/check/:id', infusionsoft.check.bind({ db: db }));
            app.get('/infusionsoft/item/:id', ensureAuth_1.default, infusionsoft.item.bind({ db: db }));
            app.get('/infusionsoft/redirect', ensureAuth_1.default, infusionsoft.redirect.bind({ db: db }));
            app.post('/infusionsoft', ensureAuth_1.default, infusionsoft.create.bind({ db: db }));
            app.get('/infusionsoft/findid', ensureAuth_1.default, infusionsoft.create.bind({ db: db }));
            app.get('/infusionsoft/info/:id', ensureAuth_1.default, infusionsoft.infos.bind({ db: db }));
            app.get('/team/infusionsoft/:id', ensureAuth_1.default, team.index.bind({ db: db }));
            app.get('/team/:id', ensureAuth_1.default, team.create.bind({ db: db }));
            //route des notes
            app.get('/note/:id', note.item.bind({ db: db, str: str }));
            app.get('/note/infusionsoft/:id', note.index.bind({ db: db, str: str }));
            app.get('/close/:id', ensureAuth_1.default, note.close.bind({ db: db, str: str }));
            app.get('/audio/:id', ensureAuth_1.default, note.listen.bind({ db: db, str: str }));
            app.get('/audio/delete/:id', ensureAuth_1.default, note.deleteNote.bind({ db: db, str: str }));
            app.post('/upload', ensureAuth_1.default, note.upload.bind({ db: db, str: str }));
            app.post('/save/:id', note.save.bind({ db: db, str: str }));
            //tansvase notes 
            //transvase task 
            app.get('/tansvase/notes/:id', tansvase.notes.bind({ db: db, str: str }));
            app.get('/tansvase/tasks/:id', tansvase.tasks.bind({ db: db, str: str }));
            return [2 /*return*/, new Promise(function (resolve) { return resolve(true); })];
        });
    });
};
