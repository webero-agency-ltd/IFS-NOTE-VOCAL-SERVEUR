"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fun_domain(data) {
    var datas = data.split(/\r|\n|\t| /);
    var temps = [];
    for (var i = 0; i < datas.length; i++) {
        if (datas[i]) {
            temps.push(datas[i].trim());
        }
    }
    return temps;
}
exports.fun_domain = fun_domain;
function fun_domainip(data) {
    var datas = data.split(/\r|\n|\t| /);
    var temps = [];
    var impaire = null;
    var paire = null;
    var falshed = false;
    datas = datas.filter(function (e) { return e; });
    for (var i = 0; i < datas.length; i++) {
        if (i % 2 == 1) {
            falshed = true;
            paire = datas[i].trim();
        }
        else {
            falshed = true;
            impaire = datas[i].trim();
        }
        if (impaire && paire) {
            temps.push({ domain: impaire, ip: paire });
            falshed = false;
            impaire = null;
            paire = null;
        }
    }
    if (falshed && datas.length > 0 && datas[datas.length - 1] != '') {
        return false;
    }
    if (temps.length == 0) {
        return false;
    }
    return temps;
}
exports.fun_domainip = fun_domainip;
function fun_ipvaluse() {
}
exports.fun_ipvaluse = fun_ipvaluse;
function fun_ipvalue() {
}
exports.fun_ipvalue = fun_ipvalue;
