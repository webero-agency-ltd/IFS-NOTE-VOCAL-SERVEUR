"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//mini plugin jquery pour ajouter un event play adu audio 
jQuery.createEventCapturing = (function () {
    var special = jQuery.event.special;
    return function (names) {
        if (!document.addEventListener) {
            return;
        }
        if (typeof names == 'string') {
            names = [names];
        }
        jQuery.each(names, function (i, name) {
            var handler = function (e) {
                e = jQuery.event.fix(e);
                return jQuery.event.dispatch.call(this, e);
            };
            special[name] = special[name] || {};
            if (special[name].setup || special[name].teardown) {
                return;
            }
            jQuery.extend(special[name], {
                setup: function () {
                    this.addEventListener(name, handler, true);
                },
                teardown: function () {
                    this.removeEventListener(name, handler, true);
                }
            });
        });
    };
})();
var listen = /** @class */ (function () {
    function listen(content, url, id) {
        var c = document.getElementById(content);
        if (c) {
            //var au = document.createElement('audio');
            //au.controls = true;
            //au.src = url;
            var tpl = this.init(id, url);
            c.innerHTML = tpl;
            return true;
        }
        return false;
    }
    listen.event = function () {
        /*
        * Pour tout les lecteurs audio de l'application
        * écoute evenement changement vitesse de lecteur audio
        * et faire les manipulation qui va avec
       */
        $('body').on('click', '.speed-fan', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var el = $(this);
            var id = el.data('id');
            var value = el.data('value');
            var od = document.getElementById(id);
            od.playbackRate = value;
            $('.' + id + 'core .speed-fan').removeClass('active');
            el.addClass('active');
        });
        //si le lécteur audio est en play, on affiche son 
        $.createEventCapturing(['play', 'pause']);
        $('body').on('play', 'audio', function () {
            var el = $(this);
            var id = el.data('id');
            var elCtrl = $('.' + id);
            elCtrl.show();
        });
        $('body').on('pause', 'audio', function () {
            var el = $(this);
            var id = el.data('id');
            var elCtrl = $('.' + id);
            elCtrl.hide();
        });
    };
    listen.prototype.init = function (id, url) {
        var tpl = "<div class=\"" + id + "core\"  class=\"audio-controller\" >\n            <audio data-id=\"" + id + "\" id=\"" + id + "\" style=\"width: 100%; margin-top: 20px;\" controls=\"\" >\n                <source  src=\"" + url + "\"  type=\"audio/mpeg\">\n            </audio>\n            <div class=\"" + id + "\" style=\"padding-left: 21px; display:none ; height: 30px;\" >\n                <a data-id=\"" + id + "\" data-value=\"1\" class=\"active speed-fan\" href=\"#\"><span>x 1</span></a>\n                <a data-id=\"" + id + "\" data-value=\"1.25\" class=\"speed-fan\" href=\"#\"><span>x 1.25</span></a>\n                <a data-id=\"" + id + "\" data-value=\"1.50\" class=\"speed-fan\" href=\"#\"><span>x 1.50</span></a>\n                <a data-id=\"" + id + "\" data-value=\"2\" class=\"speed-fan\" href=\"#\"><span>x 2</span></a>\n            </div>\n            <style>\n                a.speed-fan{\n                    color : #b5b5b5 ; \n                    display: inline-block;\n                    vertical-align: top;\n                    margin-left: 0.51rem;\n                    margin-right: 0.51rem;\n                }\n                a.speed-fan.active{\n                    color : #121212 ; \n                }\n            </style>\n        </div>";
        return tpl;
    };
    return listen;
}());
exports.listen = listen;
exports.default = listen;
