"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("./api");
var env = 'prod'; //local
var host = '';
var code = '';
var urlFormat = function () {
    var urlf = new URL(document.URL);
    return urlf.origin + urlf.pathname;
};
var auth = function () {
    var url = '';
    url = '?vps=vps486218.ovh.net:2087';
    url += '&user=root';
    url += '&pass=HeldinoDEV2018';
    return url;
};
function find_url() {
    return urlFormat;
}
exports.find_url = find_url;
function whm_pass(data, cbl) {
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/checkpass.php' + auth();
    }
    else {
        url = urlFormat();
        url += '?page=/compte/check';
    }
    url += '&password=' + data;
    api_1.get(url, {})
        .then(function (response) {
        cbl(response.data.strength);
    })
        .catch(function () {
        cbl(0);
    });
    return url;
}
exports.whm_pass = whm_pass;
function whm_create(data, cbl) {
    cbl({ domain: 'is note a domaine valide' });
}
exports.whm_create = whm_create;
function history(cbl) {
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/history.php' + auth();
    }
    else {
        url = urlFormat();
        url += '?page=/wp/history';
    }
    api_1.byMethode('get', url, {})
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
    return url;
}
exports.history = history;
function compte(cbl) {
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/user.php' + auth();
    }
    else {
        url = urlFormat();
        url += '?page=/compte/wpcompte';
    }
    api_1.byMethode('get', url, {})
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
    return url;
}
exports.compte = compte;
function liste(data, cbl) {
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/listing.php' + auth();
    }
    else {
        url = urlFormat();
        url += '?page=/wp/liste';
    }
    url += '&paged=' + data['paged'];
    url += '&domain=' + data['domain'];
    url += '&cpuser=' + data['cpuser'];
    api_1.byMethode('get', url, {})
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
    return url;
}
exports.liste = liste;
function item(data, cbl) {
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/view.php' + auth();
        url += '&cpanel=' + data;
    }
    else {
        url = urlFormat();
        url += '?page=/wp/item/' + data;
    }
    api_1.byMethode('get', url, {})
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
    return url;
}
exports.item = item;
function parse(text, endmsg) {
    if (endmsg === void 0) { endmsg = 'END RECOMPTE'; }
    var str = text.split(/\n---EVENT:\n|\n---ENDEVENT;\n/);
    var count = str.length;
    var last = null;
    var endprocess = false;
    var map1 = str.filter(function (x, s) {
        if (x) {
            if (x.indexOf('\n---EVENTPROCESS---\n') !== -1) {
                endprocess = true;
            }
            ;
            return true;
        }
        return false;
    });
    var isjslast = '';
    if (endprocess) {
        isjslast = map1[map1.length - 1].replace("\n---EVENTPROCESS---\n", "");
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
function create(data, cbl, clbsteep) {
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/create.php' + auth() + '&';
    }
    else {
        url = urlFormat();
        url += '?page=/api/create' + '&';
    }
    var myData = data;
    var out = [];
    for (var key in myData) {
        if (myData.hasOwnProperty(key)) {
            out.push(key + '=' + encodeURIComponent(myData[key]));
        }
    }
    out = out.join('&');
    url += out;
    var request = $.ajax({
        url: url,
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
        if (event.data && event.data.success && event.data.success.length > 0) {
            return cbl(event.data);
        }
        cbl(null);
    });
    request.fail(function (e) {
        if (e.status == 200) {
            if (event.data && event.data.success && event.data.success.length > 0) {
                var event_1 = parse(e.responseText);
                return cbl(event_1.data);
            }
        }
        cbl(null);
    });
}
exports.create = create;
function install_theme(data, cbl) {
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/create.php' + auth() + '&';
    }
    else {
        url = urlFormat();
        url += '?page=/wp/theme';
    }
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
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/create.php' + auth() + '&';
    }
    else {
        url = urlFormat();
        url += '?page=/wp/plugin';
    }
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
    var url = '';
    if (env == 'local') {
        url = 'http://localhost/whmapi/create.php' + auth() + '&';
    }
    else {
        url = urlFormat();
        url += '?page=/wp/upload';
    }
    return api_1.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(function (response) {
        cbl(response.data);
    })
        .catch(function () {
        cbl([]);
    });
}
exports.install_file = install_file;
