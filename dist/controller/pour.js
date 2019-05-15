"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require('url');
var request = require('request');
var site = require('../config/site');
function index(req, res) {
    var lang = req.lang();
    var _a = this.db, Pour = _a.Pour, User = _a.User;
    var userid = req.user.id;
    var _b = req.body, name = _b.name, appId = _b.appId, cardId = _b.cardId;
    User.findOne({
        where: { id: userid }
    })
        .then(function (u) {
        u.getPours()
            .then(function (s) {
            return res.json(s);
        })
            .catch(function (e) {
            console.log(e);
            return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0017' });
        });
    })
        .catch(function (e) {
        return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0014' });
    });
}
exports.index = index;
function delet(req, res) {
    var lang = req.lang();
    var _a = this.db, Pour = _a.Pour, User = _a.User;
    var userid = req.user.id;
    var id = req.params.id;
    Pour.findOne({
        where: { id: id }
    })
        .then(function (p) {
        p.destroy()
            .then(function (s) {
            return res.json({ success: true });
        })
            .catch(function (e) {
            return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0017' });
        });
    })
        .catch(function (e) {
        return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0014' });
    });
}
exports.delet = delet;
function create(req, res) {
    var lang = req.lang();
    var _a = this.db, Pour = _a.Pour, User = _a.User;
    var userid = req.user.id;
    var _b = req.body, name = _b.name, appId = _b.appId, cardId = _b.cardId, type = _b.type;
    Pour.create({ name: name, appId: appId, cardId: cardId, type: type })
        .then(function (p) {
        User.findOne({
            where: { id: userid }
        })
            .then(function (u) {
            if (u) {
                p.setAuthor(u)
                    .then(function (u) {
                    return res.json({ success: true });
                })
                    .catch(function (e) {
                    return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0012' });
                });
            }
            else {
                return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0013' });
            }
        })
            .catch(function (e) {
            return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0011' });
        });
    })
        .catch(function (e) {
        return res.json({ error: lang['MessageAppGlobalErreur'], code: 'PU0010' });
    });
}
exports.create = create;
