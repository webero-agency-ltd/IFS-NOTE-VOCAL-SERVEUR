"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function recoder() {
    return "<div id=\"recorder-template\" style=\"display: flex;\">\n    \t<div style=\"display: flex;\">\n\t\t\t<div id=\"logo-recorded\" class=\"recorder-style\"></div>\n    \t\t<input id=\"counter-recorded\" class=\"fieldControlWidth\" style=\"width: 100px; margin-left: 6px;\" disabled=\"disabled\" id=\"timer\" name=\"timer\" type=\"text\" value=\"00:00\">\n    \t</div>\n        <div style=\"display: flex;\">\n        \t<input class=\"inf-button btn button-x\" id=\"run-recorded\" name=\"runrecorded\" type=\"button\" value=\"Enregistrer\">\n        \t<input disabled=\"disabled\" class=\"inf-button btn button-x\" id=\"delete-recorded\" name=\"resetrecorded\" type=\"button\" value=\"Effacer\">\n        \t<input class=\"inf-button btn button-x\" id=\"upload-file-btn\" type=\"button\" value=\"T\u00E9l\u00E9charger\">\n        \t<input style=\"position: absolute; top: -30000px; left: -30000px;\" type=\"file\" id=\"audio-upload\" name=\"avatar\" accept=\"audio/*\">\n        </div>\n    </div>\n    <div id=\"pre-ecoute-vocaux\" style=\"height: auto;  background: none; display:none;\" > </div>\n    <style>\n    \t.recorder-style{\n\t\t\twidth: 26px;\n\t\t\theight: 26px;\n\t\t\tborder-radius: 26px; \n\t\t\tbackground-color: #999 ; \n    \t}\n    \t.recorder-style.active{\n\t\t\tbackground-color: red ;\n    \t}\n    </style>";
}
exports.recoder = recoder;
function recordedTpl(tpl) {
    return "<div class=\"fieldContainer fieldContainerMargin\">\n\t\t\t    <div class=\"fieldLabel\">\n\t\t\t        <label class=\"action-label\" for=\"template\">Vocal </label>\n\t\t\t    </div>\n\t\t\t    <div class=\"fieldControl\">\n\t\t\t        " + tpl + "\n\t\t\t    </div>\n\t\t\t</div>";
}
exports.recordedTpl = recordedTpl;
function recordedTpltask(tpl) {
    return "<tr>\n\t    <td class=\"label-td\">\n\t        <label for=\"Task0ActionDescription\">Vocal </label>\n\t    </td>\n\t    <td class=\"field-td\" id=\"Task_vocal\">\n\t        <table cellpadding=\"0px\" cellspacing=\"0px\" border=\"0px\">\n\t            <tbody>\n\t                <tr>\n\t                    <td>\n\t                    \t" + tpl + "\n\t                   \t</td>\n\t                </tr>\n\t            </tbody>\n\t        </table>\n\t    </td>\n\t</tr>";
}
exports.recordedTpltask = recordedTpltask;
function lecteurTpl(url, id) {
    if (id === void 0) { id = ""; }
    return "<div class=\"" + id + "core\" class=\"audio-controller\" >\n\t\t<audio data-id=\"" + id + "\" id=\"" + id + "\" style=\"height: 30px;\" controls=\"\" >\n\t\t\t<source  src=\"" + url + "\"  type=\"audio/mpeg\">\n\t\t</audio>\n\t\t<div class=\"" + id + "\" style=\"padding-left: 21px; display:none ; height: 30px;\" >\n\t\t\t<a data-id=\"" + id + "\" data-value=\"1\" class=\"active speed-fan\" href=\"#\"><span>x 1</span></a>\n\t\t\t<a data-id=\"" + id + "\" data-value=\"1.25\" class=\"speed-fan\" href=\"#\"><span>x 1.25</span></a>\n\t\t\t<a data-id=\"" + id + "\" data-value=\"1.50\" class=\"speed-fan\" href=\"#\"><span>x 1.50</span></a>\n\t\t\t<a data-id=\"" + id + "\" data-value=\"2\" class=\"speed-fan\" href=\"#\"><span>x 2</span></a>\n\t\t</div>\n\t\t<style>\n\t\t\ta.speed-fan{\n\t\t\t\tcolor : #b5b5b5 ; \n\t\t\t\tdisplay: inline-block;\n\t\t\t    vertical-align: top;\n\t\t\t    margin-left: 0.51rem;\n\t\t\t    margin-right: 0.51rem;\n\t\t\t}\n\t\t\ta.speed-fan.active{\n\t\t\t\tcolor : #121212 ; \n\t\t\t}\n\t\t</style>\n\t</div>";
}
exports.lecteurTpl = lecteurTpl;
function selectTpl(title, option, id, multiple) {
    if (id === void 0) { id = ""; }
    if (multiple === void 0) { multiple = false; }
    return "<div class=\"fieldContainer fieldContainerMargin\">\n\t    <div class=\"fieldLabel fieldLabelVerticalAlignTop\">\n\t        <label class=\"action-label\" for=\"" + id + "\">" + title + "</label></div>\n\t    <div class=\"fieldControl\">\n\t        <select " + (multiple == true ? 'size="' + option.length + '"' : '') + "  id=\"" + id + "\" style=\"width:100%;\" class=\"inf-select is-component\" " + (multiple == true ? 'multiple="multiple"' : '') + "  name=\"" + id + "\" data-on=\"Component.Select\">\n\t        \t" + option + "\n\t        </select>\n\t    </div>\n\t</div>";
}
exports.selectTpl = selectTpl;
function areaTpl(title, value, id) {
    if (id === void 0) { id = ""; }
    return "<div class=\"fieldContainer fieldContainerMargin\">\n\t    <div class=\"fieldLabel fieldLabelVerticalAlignTop\">\n\t        <label class=\"action-label-area\" for=\"" + id + "\">" + title + "</label></div>\n\t    <div class=\"fieldControl\">\n\t        <textarea id=\"" + id + "\" class=\"fieldControlWidth fieldControlTextInputHeight clearable\" name=\"" + id + "\">" + value + "</textarea>\n\t    </div>\n\t</div>";
}
exports.areaTpl = areaTpl;
