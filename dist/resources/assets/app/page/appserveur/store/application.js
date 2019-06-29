"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("../libs/api"));
var application = /** @class */ (function () {
    function application() {
        this.stade = {
            applications: [],
            application: {},
        };
    }
    application.prototype.addApplication = function (id, option) {
        var compteId = option.compteId, name = option.name, type = option.type;
        var body = {};
        if (name && compteId) {
            body = { name: name, compteId: compteId, type: type };
        }
        else if (name) {
            body = { name: name, type: type };
        }
        else {
            //@TODO: ajoute une erreur dans cette element 
            return [err, null];
        }
        var _a = yield api_1.default('/application', 'POST', body), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        var win = window.open(data, '_blank');
        return win.focus();
    };
    /*
     * Reresh token manuelement
    */
    application.prototype.reAuthorize = function (id) {
        var _a = yield api_1.default("/application/reauthorize/all/" + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        var win = window.open(data, '_blank');
        return win.focus();
    };
    /*
     * Récupération de tout les applications
    */
    application.prototype.allApplication = function () {
        var _a = yield api_1.default('/application'), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.applications = data.slice();
        return [null, this.stade.applications];
    };
    /*
     * Focus sur une application en particulier pour récupérer ces donners
    */
    application.prototype.itemApplication = function (id) {
        var _a = yield api_1.default('/application/item/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.application = Object.assign({}, __assign({}, data));
        return [null, this.stade.application];
    };
    return application;
}());
