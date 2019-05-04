"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var site = require('../config/site');
//etre bien sur que l'utilisateur est bien connecté a l'application 
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        //si l'utilisateur n'est pas connecté, on le redirege vers la page login 
        //@todo: s'il y a des redirection, on ajoute dans la redirection apres l'authentification 
        //la précedent URL a la quelle on voulaiz y aller avant 
        var port = site.port;
        var requested_url = req.protocol + '://' + req.host + (port == 80 || port == 443 ? '' : ':' + port) + req.originalUrl;
        res.redirect('/login?redirect=' + encodeURIComponent(requested_url));
    }
}
exports.default = ensureAuth;
