"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require('url');
var request = require('request');
var site = require('../config/site');
var urlAPI = 'https://api.trello.com/1/';
function view(req, res) {
    res.render('trello.ejs');
}
exports.view = view;
function membre(req, res) {
    var lang = req.lang();
    var _a = this.db, Application = _a.Application, User = _a.User, Team = _a.Team;
    var id = req.params.id;
    Application.find({ where: { id: id } })
        .then(function (i) {
        if (i) {
            if (!i.accessToken) {
                return res.json({ error: lang['TrelloTokenError'], code: 'MT0003' });
            }
            var url_1 = urlAPI + '/boards/' + i.compteId + '/members/?token=' + i.accessToken + '&key=' + site.trelloKey;
            console.log(url_1);
            return request({
                headers: {
                    'Content-Type': 'application/json'
                },
                uri: url_1,
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
                    res.json(reponse);
                }
                else {
                    res.json({ error: lang['MessageAppGlobalErreur'], code: 'MT0002' });
                }
            });
        }
        res.json([]);
    })
        .catch(function (e) { return res.json({ error: lang['MessageAppGlobalErreur'], code: 'MT0001' }); });
}
exports.membre = membre;
function boardsUpdate(req, res) {
    var _a = this.db, Application = _a.Application, User = _a.User;
    var lang = req.lang();
    var id = req.params.id;
    var compteId = req.body.compteId;
    Application.find({ where: { id: id } })
        .then(function (i) {
        if (i) {
            return i.update({ compteId: compteId })
                .then(function (t) {
                res.json({ success: true });
            })
                .catch(function (e) { return res.send(lang['TrelloNull']); });
        }
        res.json({ error: lang['TrelloNull'], code: '0003' });
    })
        .catch(function (e) { return res.json({ error: lang['TrelloNull'], code: '0001' }); });
}
exports.boardsUpdate = boardsUpdate;
//récupération de tout les cards de trello
function boards(req, res) {
    var _a = this.db, Application = _a.Application, User = _a.User;
    var lang = req.lang();
    var id = req.params.id;
    Application.find({ where: { id: id } })
        .then(function (i) {
        var url = urlAPI + 'members/me/boards?key=' + site.trelloKey + '&token=' + i.accessToken;
        console.log(url);
        request({
            uri: url,
            method: 'GET'
        }, function (error, _res, body) {
            var data;
            try {
                data = JSON.parse(body);
            }
            catch (e) {
                data = [];
            }
            res.json(data);
        });
    })
        .catch(function (e) { return res.json({ error: lang['InfusionsoftNull'], code: '0001' }); });
}
exports.boards = boards;
function lists(req, res) {
    var _a = this.db, Application = _a.Application, User = _a.User;
    var lang = req.lang();
    var id = req.params.id;
    Application.find({ where: { id: id } })
        .then(function (i) {
        var url = urlAPI + 'boards/' + i.compteId + '/lists?key=' + site.trelloKey + '&token=' + i.accessToken;
        console.log(url);
        request({
            uri: url,
            method: 'GET'
        }, function (error, _res, body) {
            var data;
            try {
                data = JSON.parse(body);
            }
            catch (e) {
                data = [];
            }
            res.json(data);
        });
    })
        .catch(function (e) { return res.json([]); });
}
exports.lists = lists;
