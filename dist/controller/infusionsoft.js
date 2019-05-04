"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var makeid_1 = __importDefault(require("../libs/makeid"));
var site = require('../config/site');
var request = require('request');
var querystring = require('querystring');
var urlAPI = 'https://api.infusionsoft.com/crm/rest/v1';
function check(req, res) {
    var lang = req.lang();
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User;
    //récupération 
    var id = req.params.id;
    var token = req.query.token;
    User.findOne({
        where: { rememberToken: token }
    })
        .then(function (u) {
        if (u) {
            Infusionsoft.find({ where: { urlid: id } })
                .then(function (i) {
                if (i) {
                    u.getTeams({ where: { InfusionsoftId: i.id } })
                        .then(function (t) {
                        if (t.length > 0) {
                            return res.json({ success: true });
                        }
                        res.json({ error: true, code: '0001' });
                    })
                        .catch(function (e) { return res.json({ error: true, code: '0002' }); });
                }
                else {
                    res.json({ error: true, code: 'E0001' });
                }
            })
                .catch(function (e) { return res.json({ error: true, code: 'E0002' }); });
        }
        else {
            res.json({ error: true, code: '0003' });
        }
    })
        .catch(function (e) {
        (function (e) { return res.json({ error: true, code: '0004' }); });
    });
}
exports.check = check;
//récupération d'un infusionsoft en particuler avec tout ces statistique 
function item(req, res) {
    var lang = req.lang();
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User;
    //récupération 
    var id = req.params.id;
    //@TODO : récupération de tout les autres informations de la statistique qui son utile 
    Infusionsoft.find({ where: { id: id } })
        .then(function (i) {
        res.json(i);
    })
        .catch(function (e) { return res.json({}); });
}
exports.item = item;
//récupération de tout les compte infusionsoft d'un utilisateur en question 
function index(req, res) {
    var lang = req.lang();
    var _a = this.db, Infusionsoft = _a.Infusionsoft, Team = _a.Team, User = _a.User;
    //récupération 
    var id = req.user.id;
    User.findOne({
        where: { id: id }
    })
        .then(function (u) {
        u.getTeams()
            .then(function (ts) {
            //on a maintenant la liste des
            var ifs = [];
            ts.forEach(function (e, i) {
                e.getInfusionsoft().then(function (r) {
                    var re = r.toJSON();
                    re['user_role'] = e.role;
                    ifs.push(re);
                    if (i == ts.length - 1) {
                        return res.json(ifs);
                    }
                }).catch(function (e) {
                    if (i == ts.length - 1) {
                        return res.json(ifs);
                    }
                });
            });
        })
            .catch(function (e) { return res.json([]); });
    })
        .catch(function (e) {
        (function (e) { return res.json([]); });
    });
}
exports.index = index;
//Récupération des différent information d'Infusionsoft 
function infos(req, res) {
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User;
    var lang = req.lang();
    var id = req.params.id;
    //récupération des info en utilisant l'API infusionsoft et l'accessToken 
    Infusionsoft.find({ where: { id: id } })
        .then(function (i) {
        var token;
        try {
            token = JSON.parse(i.accessToken);
        }
        catch (e) {
            token = [];
        }
        if (i && token && token['access_token']) {
            var url = urlAPI + '/merchants/?access_token=' + token['access_token'];
            request({
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
                    res.json(reponse);
                }
                else {
                    res.json({ error: lang['InfusionsoftAPINull'], code: '0011' });
                }
            });
        }
        else {
            res.json({ error: lang['MessageAppGlobalErreur'], code: '0012' });
        }
    })
        .catch(function (e) { return res.json({ error: lang['MessageAppGlobalErreur'], code: '0013' }); });
}
exports.infos = infos;
//ici on a un redirection qui vien d'infusionsoft
function redirect(req, res) {
    //@todo: utilisation des sessions ici, vérifier que l'utilisateur a bien un session InfusionsoftNull
    //on enregistre l'accessToken du compte infusionsoft en question 
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User;
    var lang = req.lang();
    var _b = req.query, id = _b.id, code = _b.code;
    var redirect_uri = site.urlapp + '/infusionsoft/redirect?id=' + id;
    var url = 'https://api.infusionsoft.com/token';
    var form = {
        client_id: site.clientId,
        client_secret: site.clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri
    };
    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    request({
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: url,
        body: formData,
        method: 'POST'
    }, function (error, _res, body) {
        //ici on enregistre ce token dans la base de donner infusionsoft en particulier  
        if (!error && _res.statusCode == 200) {
            Infusionsoft.find({ where: { id: id } })
                .then(function (i) {
                if (i) {
                    return i.update({ accessToken: body })
                        .then(function (t) {
                        //redirection a la page home de l'application 
                        //@todo : ici, on ferme juste l'application et actualisé automatiquement tout les 
                        //soket ouvert de l'application 
                        //s'il ny a pas de soket ouvert, alors, on redirge a la base home de l'application 
                        res.redirect('/');
                    })
                        .catch(function (e) { return res.send(lang['InfusionsoftNull']); });
                }
            })
                .catch(function (e) { return res.send(lang['InfusionsoftNull']); });
        }
        else {
            //ici on a une erreur d'infusionsoft
            return res.send(lang['MessageAppGlobalErreur']);
        }
    });
}
exports.redirect = redirect;
//tache chrone de mise a joure de accessToken
function update(req, res) {
}
exports.update = update;
//création d'URL d'authentification dans fusedesk 
function create(req, res) {
    var lang = req.lang();
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User, Team = _a.Team;
    //récupération 
    var _b = req.body, name = _b.name, urlid = _b.urlid;
    var userid = req.user.id;
    //@todo: ICI, on change le méthode de création de ID 
    //on ne sais jamain si on tombe dans deux foix sur un id unique 
    var unique = makeid_1.default(7) + '-' + makeid_1.default(7);
    Infusionsoft.create({ name: name, unique: unique, urlid: urlid })
        .then(function (I) {
        //puis on récupère l'utilisateur actuel et attacher l'utilisateur a cette instance d'infusionsoft 
        //dans la table pivot 
        User.findOne({
            where: { id: userid }
        })
            .then(function (user) {
            //attacher cette utilisateur a la table pivo de cette compte infusionsoft 
            I.setAuthor(user)
                .then(function () {
                Team.create({ role: 'admin' })
                    .then(function (newteam) {
                    //attache le team a l'utilisateur en question 
                    newteam.setInfusionsoft(I)
                        .then(function (x) {
                        //attache le team a infusionsoft
                        newteam.setUser(user)
                            .then(function (x) {
                            var redirect_uri = site.urlapp + '/infusionsoft/redirect?id=' + I.id;
                            var url = 'https://signin.infusionsoft.com/app/oauth/authorize';
                            url += '?client_id=' + site.clientId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=full';
                            return res.json({ success: url });
                        })
                            .catch(function (e) {
                            return res.json({ error: lang['MessageAppGlobalErreur'], code: '0005' });
                        });
                    })
                        .catch(function (e) {
                        return res.json({ error: lang['MessageAppGlobalErreur'], code: '0006' });
                    });
                })
                    .catch(function (e) {
                    return res.json({ error: lang['MessageAppGlobalErreur'], code: '0007' });
                });
            })
                .catch(function (e) {
                return res.json({ error: lang['MessageAppGlobalErreur'], code: '0008' });
            });
        })
            .catch(function (e) {
            return res.json({ error: lang['MessageAppGlobalErreur'], code: '0009' });
        });
    })
        .catch(function (e) {
        return res.json({ error: lang['MessageAppGlobalErreur'], code: '0010' });
    });
}
exports.create = create;
