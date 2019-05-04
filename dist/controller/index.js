"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var site = require('../config/site');
module.exports = function (req, res) {
    var lang = req.lang();
    res.render('index.ejs', { lang: JSON.stringify(res.locals.lang), urlapplication: site.urlapp });
};
