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
Object.defineProperty(exports, "__esModule", { value: true });
var site = require('../config/site');
var request = require('request');
var querystring = require('querystring');
var urlAPI = 'https://api.infusionsoft.com/crm/rest/v1';
function membre(req, res) {
    var lang = req.lang();
    var _a = this.db, Application = _a.Application, User = _a.User, Team = _a.Team;
    var id = req.params.id;
    Application.find({ where: { id: id } })
        .then(function (i) {
        if (i) {
            var token = void 0;
            try {
                token = JSON.parse(i.accessToken);
            }
            catch (e) {
                token = null;
            }
            if (!token || !token['access_token']) {
                return res.json({ error: lang['InfusionsoftTokenError'], code: 'MI0003' });
            }
            var url = urlAPI + '/users/?access_token=' + token['access_token'];
            return request({
                headers: {
                    'Content-Type': 'application/json'
                },
                uri: url,
                method: 'GET'
            }, function (error, _res, body) {
                if (!error && _res.statusCode == 200) {
                    var reponse = void 0;
                    try {
                        reponse = JSON.parse(body);
                    }
                    catch (e) {
                        reponse = [];
                    }
                    if (reponse['users']) {
                        res.json(reponse['users']);
                    }
                    else {
                        res.json([]);
                    }
                }
                else {
                    res.json({ error: lang['MessageAppGlobalErreur'], code: 'MI0002' });
                }
            });
        }
        res.json([]);
    })
        .catch(function (e) { return res.json({ error: lang['MessageAppGlobalErreur'], code: 'MI0001' }); });
}
exports.membre = membre;
function contacts(req, res) {
    var lang = req.lang();
    var _a = this.db, Application = _a.Application, User = _a.User, Team = _a.Team;
    var id = req.params.id;
    Application.find({ where: { id: id } })
        .then(function (i) {
        if (i) {
            var token = void 0;
            try {
                token = JSON.parse(i.accessToken);
            }
            catch (e) {
                token = null;
            }
            if (!token || !token['access_token']) {
                return res.json({ error: lang['InfusionsoftTokenError'], code: 'MI0003' });
            }
            var url = urlAPI + '/contacts/?access_token=' + token['access_token'];
            return request({
                headers: {
                    'Content-Type': 'application/json'
                },
                uri: url,
                method: 'GET'
            }, function (error, _res, body) {
                if (!error && _res.statusCode == 200) {
                    var reponse = void 0;
                    try {
                        reponse = JSON.parse(body);
                    }
                    catch (e) {
                        reponse = [];
                    }
                    if (reponse['contacts']) {
                        res.json(reponse['contacts'].map(function (e) {
                            return __assign({ text: e.family_name + ' ' + e.given_name, value: e.id }, e);
                        }));
                    }
                    else {
                        res.json([]);
                    }
                }
                else {
                    res.json({ error: lang['MessageAppGlobalErreur'], code: 'MI0002' });
                }
            });
        }
        res.json([]);
    })
        .catch(function (e) { return res.json({ error: lang['MessageAppGlobalErreur'], code: 'MI0001' }); });
}
exports.contacts = contacts;
