"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res, next) {
    var local = 'fr';
    //récupération des la langue dans la page qui convienne 
    req.lang = function () {
        try {
            var lang = require('../resources/lang/' + local + '/lang');
            if (Object.keys(lang).length > 0)
                return res.locals.lang = Object.assign({}, lang, res.locals.lang);
        }
        catch (e) {
            return {};
        }
    };
    next();
};
