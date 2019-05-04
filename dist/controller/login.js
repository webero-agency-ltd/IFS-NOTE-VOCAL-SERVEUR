"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//afficher la page login
function page(req, res) {
    var lang = req.lang();
    var redirect = req.query.redirect;
    if (!redirect) {
        redirect = '';
    }
    res.render('login.ejs', { redirect: encodeURIComponent(redirect) });
}
exports.page = page;
//création de nouvelle utilisateur 
function create(req, res) {
    var User = this.db.User;
    //ici on veut se souvenire de l'utilisateur lors de la prochaine connexion  
    var token = Math.random().toString();
    token = token.substring(2, token.length);
    //mise a jours de l'utilisateur et enregistrement du remember token dans ca table de base de donner 
    //ce remember token est utilises dans l'extenssion chrome pour faire l'authentification entre 
    //un utilisateur et le serveur de vocal note 
    var redirect = req.query.redirect;
    User.find({ where: { id: req.user.id } })
        .then(function (u) {
        if (u) {
            return u.update({
                rememberToken: token
            })
                .then(function (t) {
                res.cookie('me_identity', token); //, { expires : new Date(new Date().getTime()+2073816000) }
                res.cookie('remember_me', token); //, { expires : new Date(new Date().getTime()+2073816000) }
                if (redirect) {
                    res.redirect(decodeURIComponent(redirect));
                }
                else {
                    res.redirect('/');
                }
            })
                .catch(function (e) { return res.redirect('/'); });
        }
    })
        .catch(function (e) { return res.redirect('/'); });
}
exports.create = create;
