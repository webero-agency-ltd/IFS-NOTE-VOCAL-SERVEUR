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
var express_1 = __importDefault(require("express"));
var models_1 = require("./models");
var hash_1 = __importDefault(require("./libs/hash"));
var path = require('path');
var http = require('http');
var https = require('https');
var fs = require('fs');
var str = require('./libs/redis-stream');
var site = require('./config/site');
var app = express_1.default();
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view enginer', 'ejs');
var env = site.env;
var openfile = [];
var db = models_1.createModels(require('./config/sequelize'));
db.sequelize.sync({ force: false })
    //création d'utilisateur admin lors de l'instanciation de l'application 
    .then(function () {
    var User = db.User;
    //recherche d'abord si l'utilisateur admin n'existe pas 
    db.User.findOne({
        where: {
            role: 'admin'
        }
    }).then(function (dbUser) {
        return __awaiter(this, void 0, void 0, function () {
            var fullname, email, role, password;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!dbUser) return [3 /*break*/, 2];
                        fullname = 'admin';
                        email = 'admin@gmail.com';
                        role = 'admin';
                        return [4 /*yield*/, hash_1.default('-Paspgkksyh@shgsp.kjhsn')];
                    case 1:
                        password = _a.sent();
                        User.create({ fullname: fullname, email: email, password: password, role: role })
                            .then(function (user) {
                            console.log('ADMIN OK');
                        })
                            .catch(function (e) { return console.log('ADMIN PAS OK'); });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    });
});
var Serveur = /** @class */ (function () {
    function Serveur(port) {
        this.port = port;
    }
    Serveur.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //initialisation des middleware de l'applications 
                    return [4 /*yield*/, this.middleware()];
                    case 1:
                        //initialisation des middleware de l'applications 
                        _a.sent();
                        this.route();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Initialisation des tout les middleware de l'application 
    Serveur.prototype.middleware = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, require('./middleware/index')(app, db)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Serveur.prototype.route = function () {
        return __awaiter(this, void 0, void 0, function () {
            var route, server, options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, require('./route/index')(app, db, str)];
                    case 1:
                        route = _a.sent();
                        if (env !== 'prod') {
                            server = http.createServer(app).listen(this.port, function () {
                                console.log('le serveur dev sur le port', _this.port);
                            });
                        }
                        else {
                            //création du serveur en http et redirection a https si on essayer d'accer a cette url 
                            http.createServer(function (req, res) {
                                res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
                                res.end();
                            }).listen(80);
                            options = {
                                key: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/privkey1.pem"),
                                cert: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/fullchain1.pem"),
                                ca: fs.readFileSync("/etc/letsencrypt/archive/therapiequantique.net/chain1.pem"),
                            };
                            server = https.createServer(options, app).listen(443, function () {
                                console.log('----- le serveur prod sur le port', 443);
                            });
                        }
                        this.socket(server);
                        return [2 /*return*/];
                }
            });
        });
    };
    //lancement d'un serveur de websoket 
    Serveur.prototype.socket = function (server) {
        require('./controller/binsocket')(server, db, str);
    };
    return Serveur;
}());
exports.default = Serveur;
