"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pauseall(length) {
    var audios = document.getElementsByTagName("audio");
    for (var i = 0; i < audios.length; i++) {
        audios[0].pause();
    }
}
exports.default = pauseall;
