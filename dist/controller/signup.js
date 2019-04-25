"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//afficher la page signup
function page(req, res) {
    res.render('signup.ejs');
}
exports.page = page;
//création de nouvelle utilisateur 
function create(req, res) {
    res.render('signup.ejs');
}
exports.create = create;
