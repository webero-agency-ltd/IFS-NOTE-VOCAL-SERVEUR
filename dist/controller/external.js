"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require('url');
var request = require('request');
var site = require('../config/site');
function index(req, res) {
    var lang = req.lang();
    var _a = this.db, Application = _a.Application, User = _a.User;
    var id = req.user.id;
    User.findOne({
        where: { id: id }
    })
        .then(function (u) {
        if (u) {
        }
        else {
            res.json({ error: true });
        }
    })
        .catch(function (e) { return res.json({ error: true }); });
}
exports.index = index;
function create(req, res) {
    var lang = req.lang();
    var _a = this.db, Application = _a.Application, User = _a.User, Team = _a.Team, Pour = _a.Pour;
    //récupération 
    var _b = req.body, title = _b.title, compteId = _b.compteId, description = _b.description, type = _b.type, pour = _b.pour, prioriter = _b.prioriter, date = _b.date, contactId = _b.contactId;
    var userid = req.user.id;
    console.log(title, description, type, pour, prioriter, date, contactId, compteId);
    if (type == 'trello') {
        //création de note trello
        Pour.findOne({
            where: { id: pour }
        })
            .then(function (e) {
            if (e) {
                //selection de l'application a la quelle on veut ajouter la notes 
                Application.findOne({
                    where: { compteId: compteId }
                })
                    .then(function (i) {
                    if (!i) {
                        return res.json({ error: true, code: 'EC0004' });
                    }
                    request({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        uri: 'https://api.trello.com/1/cards?token=' + i.accessToken + '&key=' + site.trelloKey,
                        body: JSON.stringify({ idList: e.cardId, name: title, desc: description, due: date, idMembers: e.appId }),
                        method: 'POST'
                    }, function (error, _res, body) {
                        if (!error && _res.statusCode == 200) {
                            var reponse = void 0;
                            try {
                                reponse = JSON.parse(body);
                            }
                            catch (e) {
                                reponse = {};
                            }
                            return res.json({ success: true, data: reponse });
                        }
                        else {
                            return res.json({ error: true, code: 'EC0004' });
                        }
                    });
                })
                    .catch(function (e) { return res.json({ error: true, code: 'EC0005' }); });
            }
            else {
                res.json({ error: true, code: 'EC0003' });
            }
        })
            .catch(function (e) { return res.json({ error: true, code: 'EC0001' }); });
    }
    else if (type == 'infusionsoft') {
        res.json({ error: true, code: 'EC0003' });
    }
    else if (type == 'infusionsoft') {
        res.json({ error: true, code: 'EC0003' });
    }
}
exports.create = create;
