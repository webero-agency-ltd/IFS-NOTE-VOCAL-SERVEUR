"use strict";
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
        };
    }
    /*
     * Récupèration de tout les teams de l'application
    */
    user.prototype.allTeam = function (id) {
        var _a = yield api_1.default('/team/application/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.teams = data.map(function (_a) {
            var contactid = _a.contactid, fullname = _a.fullname, email = _a.email, role = _a.role;
            return { id: contactid, fullname: fullname, email: email, role: role };
        });
        return [null, this.stade.teams];
    };
    /*
     * si l'application est un trello alors Récupèration de tout les teams trello réel de l'application
    */
    user.prototype.membreTrello = function (id) {
        var _a = yield api_1.default('/trello/membre/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.membreTrello = data.map(function (_a) {
            var id = _a.id, fullName = _a.fullName;
            return { id: id, fullName: fullName, add: id };
        })
            .filter(function (_a) {
            var id = _a.id;
            return id ? true : false;
        });
        return [null, this.stade.membreTrello];
    };
    user.prototype.membreInfusionsoft = function (id) {
        var _a = yield api_1.default('/infusionsoft/membre/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.membreInfusionsoft = data.map(function (_a) {
            var id = _a.id, preferred_name = _a.preferred_name;
            return { id: id, fullName: preferred_name, add: id };
        })
            .filter(function (_a) {
            var id = _a.id;
            return id ? true : false;
        });
        return [null, this.stade.membreInfusionsoft];
    };
    return user;
}());
