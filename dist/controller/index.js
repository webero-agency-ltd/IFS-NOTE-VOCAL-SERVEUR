"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var site = require('../config/site');
function index(req, res) {
    var lang = req.lang();
    res.render('index.ejs', { lang: JSON.stringify(res.locals.lang), urlapplication: site.urlapp, portapplication: site.port });
}
exports.index = index;
function vocalNote(req, res) {
    var lang = req.lang();
    res.render('noteVocal.ejs', { lang: JSON.stringify(res.locals.lang), urlapplication: site.urlapp, portapplication: site.port });
}
exports.vocalNote = vocalNote;
