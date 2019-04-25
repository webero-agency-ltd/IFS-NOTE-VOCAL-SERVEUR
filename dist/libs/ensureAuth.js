"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//etre bien sur que l'utilisateur est bien connecté a l'application 
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        //si l'utilisateur n'est pas connecté, on le redirege vers la page login 
        res.redirect('/login');
    }
}
exports.default = ensureAuth;
