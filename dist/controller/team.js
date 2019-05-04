"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ajouter l'utilisateur actuelle a cette infusionsoft 
function create(req, res) {
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User, Team = _a.Team;
    var lang = req.lang();
    var id = req.params.id;
    var userid = req.user.id;
    Infusionsoft.find({ where: { unique: id } })
        .then(function (I) {
        //ici on a l'infusionsoft qui correspond 
        //on récupére maintenant l'utilisateur 
        User.findOne({
            where: { id: userid }
        })
            .then(function (user) {
            //récupération du team, qui a la relation entre infusionsoft 
            //et l'utilisateur actuel, s'il n'existe pas, on le crée 
            Team.findOne({
                where: { UserId: userid, InfusionsoftId: I.id }
            })
                .then(function (T) {
                if (!T) {
                    //création du teams et attacher le team a l'infusionsoft, et a l'id utilisateur
                    Team.create({ role: 'membre', active: true })
                        .then(function (newteam) {
                        //attache le team a l'utilisateur en question 
                        newteam.setInfusionsoft(I)
                            .then(function (x) {
                            //attache le team a infusionsoft
                            newteam.setUser(user)
                                .then(function (x) {
                                res.json({ success: true });
                            })
                                .catch(function (e) {
                                return res.json({ error: lang['MessageAppGlobalErreur'] });
                            });
                        })
                            .catch(function (e) {
                            return res.json({ error: lang['MessageAppGlobalErreur'] });
                        });
                    })
                        .catch(function (e) {
                        return res.json({ error: lang['MessageAppGlobalErreur'] });
                    });
                }
                else {
                    res.json({ success: true });
                }
            })
                .catch(function (e) {
                return res.json({ error: lang['MessageAppGlobalErreur'] });
            });
        })
            .catch(function (e) {
            return res.json({ error: lang['MessageAppGlobalErreur'] });
        });
    })
        .catch(function (e) {
        return res.json({ error: lang['MessageAppGlobalErreur'] });
    });
}
exports.create = create;
//liste de tout les teams d'un infusionsoft qui est passé en paramètre 
function index(req, res) {
    var _a = this.db, Infusionsoft = _a.Infusionsoft, User = _a.User, Team = _a.Team;
    var lang = req.lang();
    var id = req.params.id;
    Team.findAll({
        where: { InfusionsoftId: id }
    })
        .then(function (T) {
        var resp = [];
        T.forEach(function (e, i) {
            e.getUser().then(function (r) {
                resp.push(r);
                if (i == T.length - 1) {
                    return res.json(resp);
                }
            }).catch(function (e) {
                if (i == T.length - 1) {
                    return res.json(resp);
                }
            });
        });
    })
        .catch(function (e) {
        console.log(e);
        return res.json({ error: lang['MessageAppGlobalErreur'] });
    });
}
exports.index = index;
