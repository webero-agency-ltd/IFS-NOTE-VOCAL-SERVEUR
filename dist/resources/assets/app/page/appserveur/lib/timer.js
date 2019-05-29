"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
*	C'est une classe qui va généré le muniteur
*/
var timerClass = /** @class */ (function () {
    function timerClass() {
        //le temps total du timmer actuelle 
        this.totalSeconds = 0;
        //
        this.intervaleTimerRecorder = null;
        //pause 
        this.pause = false;
        this.cbl = null;
    }
    timerClass.prototype.setTime = function () {
        ++this.totalSeconds;
        var secondsLabel = this.pad(this.totalSeconds % 60);
        var minutesLabel = this.pad(parseInt(this.totalSeconds / 60));
        if (this.cbl) {
            this.cbl(minutesLabel + " : " + secondsLabel);
        }
    };
    timerClass.prototype.pad = function (val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        }
        else {
            return valString;
        }
    };
    timerClass.prototype.start = function () {
        var _this = this;
        this.stop();
        this.intervaleTimerRecorder = setInterval(function () {
            if (!_this.pause) {
                _this.setTime();
            }
        }, 1000);
    };
    timerClass.prototype.stop = function () {
        clearInterval(this.intervaleTimerRecorder);
        this.totalSeconds = 0;
    };
    timerClass.prototype.reset = function () {
        this.totalSeconds = 0;
        var secondsLabel = this.pad(this.totalSeconds % 60);
        var minutesLabel = this.pad(parseInt(this.totalSeconds / 60));
        clearInterval(this.intervaleTimerRecorder);
        if (this.cbl) {
            this.cbl(minutesLabel + " : " + secondsLabel);
        }
    };
    timerClass.prototype.pause = function () {
        this.pause = true;
    };
    timerClass.prototype.play = function () {
        this.pause = false;
    };
    timerClass.prototype.setcallback = function (cbl) {
        this.cbl = cbl;
    };
    return timerClass;
}());
function timer(length) {
    return new timerClass();
}
exports.default = timer;
