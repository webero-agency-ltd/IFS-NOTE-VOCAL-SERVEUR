"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var env = 'prod'; //local
var host = '';
var code = '';
function parse(text, endmsg) {
    if (endmsg === void 0) { endmsg = 'END RECOMPTE'; }
    var str = text.split(/\n---EVENT:\n|\n---ENDEVENT;\n/);
    var count = str.length;
    var last = null;
    var endprocess = false;
    var map1 = str.filter(function (x, s) {
        if (x) {
            if (x.indexOf('---EVENTPROCESS---') !== -1) {
                endprocess = true;
            }
            ;
            return true;
        }
        return false;
    });
    var isjslast = '';
    if (endprocess) {
        isjslast = map1[map1.length - 1].replace("\n---EVENTPROCESS---\n", "").replace("---EVENTPROCESS---", "");
    }
    else {
        isjslast = map1[map1.length - 1];
    }
    try {
        var data = JSON.parse(isjslast);
        if (endprocess) {
            data = { steep: endmsg, data: data };
        }
        return data;
    }
    catch (error) {
        return {};
    }
}
function whm_check(serveur, cbl) {
    var url = window.urlapp + '/check';
    var formData = new FormData();
    formData.append("_method", 'post');
    formData.append("token", document.csrf_token);
    formData.append("username", serveur.username);
    formData.append("accesstoken", serveur.accesstoken);
    formData.append("url", serveur.url);
    formData.append("port", serveur.port);
    api_1.post(url, formData, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
        .then(function (res) {
        cbl(res.data.strength);
    })
        .catch(function () {
        cbl(0);
    });
    return url;
}
exports.whm_check = whm_check;
function whm_pass(data, cbl) {
    //@todo: Erreur sur les mots de passe qui on des ex : LojGAl#""bfM
    // console.log(document.getElementById('password').value);
    var url = window.urlapp + '/check';
    var formData = new FormData();
    formData.append("pass", data);
    return api_1.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
        cbl(response.data.strength);
    })
        .catch(function () {
        cbl(0);
    });
}
exports.whm_pass = whm_pass;
//installation de internetbs sur les domaine crée 
function internetbs(data, serveur, cbl) {
    console.log('internetbs - DATA send : ', data);
    var url = window.urlapp + '/site/internetbs';
    var formData = new FormData();
    formData.append("_method", 'post');
    formData.append("token", document.csrf_token);
    formData.append("internetbs", data.join("\n"));
    formData.append("serveur_id", serveur);
    return api_1.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl(false);
    });
}
exports.internetbs = internetbs;
function runscript(data, serveur, cbl) {
    console.log(' --- runscript - DATA send : ');
    var url = window.urlapp + '/site/runscript';
    var formData = new FormData();
    formData.append("_method", 'post');
    formData.append("token", document.csrf_token);
    formData.append("serveur_id", serveur);
    var dataSend = data.map(function (e) { return e.username; });
    formData.append("data", dataSend.join("\n"));
    return api_1.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) { })
        .catch(function () { });
}
exports.runscript = runscript;
function create(formData, categorie, serveur, cbl, clbsteep) {
    var url = window.urlapp + '/site';
    formData.append("_method", 'post');
    formData.append("token", document.csrf_token);
    formData.append("serveur_id", serveur);
    formData.append("categorie_id", categorie);
    var request = $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function e(ev) {
                var event = parse(ev.currentTarget.response);
                if (event.steep) {
                    clbsteep(event.steep);
                }
            };
            return xhr;
        }
    });
    request.done(function (e) {
        var event = parse(e);
        console.log(event);
        if (event && event.success) {
            return cbl(event.success);
        }
        cbl(null);
    });
    request.fail(function (e) {
        console.log(e);
        if (e.status == 200) {
            if (event.data && event.data.success && event.data.success.length > 0) {
                var event_1 = parse(e.responseText);
                return cbl(event_1.data, event_1.sh1unique);
            }
        }
        cbl(null);
    });
}
exports.create = create;
function wordpress(formData, categorie, serveur, cbl, clbsteep) {
    var url = window.urlapp + '/wp/install';
    formData.append("_method", 'post');
    formData.append("token", document.csrf_token);
    formData.append("serveur_id", serveur);
    formData.append("categorie_id", categorie);
    var request = $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.onprogress = function e(ev) {
                var event = parse(ev.currentTarget.response);
                if (event.steep) {
                    clbsteep(event.steep);
                }
            };
            return xhr;
        }
    });
    request.done(function (e) {
        var event = parse(e);
        if (event.success && event.success.data) {
            return cbl(event.success.data);
        }
        cbl(null);
    });
    request.fail(function (e) {
        console.log(e);
        if (e.status == 200) {
            if (event.data && event.data.success && event.data.success.length > 0) {
                var event_2 = parse(e.responseText);
                return cbl(event_2.data, event_2.sh1unique);
            }
        }
        cbl(null);
    });
}
exports.wordpress = wordpress;
function install_theme(data, cbl) {
    var url = window.urlapp + '/wp/theme';
    return api_1.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
}
exports.install_theme = install_theme;
function install_plugin(data, cbl) {
    var url = window.urlapp + '/wp/plugin';
    return api_1.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
}
exports.install_plugin = install_plugin;
function install_file(data, cbl) {
    var url = window.urlapp + '/wp/post';
    return api_1.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
}
exports.install_file = install_file;
/*
*	Récupération du log de crétion et supression de l'ancien log
*/
function log_create(data, cbl) {
    var url = window.urlapp + '/log/create';
    return api_1.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
        if (response.data.success) {
            return cbl(response.data.success);
        }
        cbl(null);
    })
        .catch(function () {
        cbl(null);
    });
}
exports.log_create = log_create;
