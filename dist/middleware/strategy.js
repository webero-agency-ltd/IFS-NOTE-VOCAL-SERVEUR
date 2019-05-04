"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
//etre bien sur que l'utilisateur est bien connecté a l'application 
function strategy(req, res, next) {
    //si un utilisateur a un remember token lors de la connexion 
    if (req.method == "POST") {
        passport.authenticate('local', { failureRedirect: '/login', failureFlash: true })(req, res, next);
    }
    else {
        next();
    }
}
exports.default = strategy;
