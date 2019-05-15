"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forearch = /** @class */ (function () {
    function forearch(data, func) {
        if (typeof (data) == 'number') {
            var tempdata = [];
            for (var i = 0; i < data; i++) {
                tempdata.push(i);
            }
            data = tempdata;
        }
        else if (typeof (data) != 'object') {
            return false;
        }
        this.progressFuncs = [];
        this.beforeEndFuncs = [];
        this.firstFuncs = [];
        this.endFuncs = [];
        this.data = data;
        this.callFunction = func;
    }
    forearch.prototype.progress = function (callback) {
        if (typeof (callback) == 'function') {
            this.progressFuncs.push(callback);
        }
    };
    /*
    beforeEnd(callback){
        if (typeof(callback)=='function') {
            this.beforeEndFuncs.push(callback);
        }
    }*/
    forearch.prototype.first = function (callback) {
        if (typeof (callback) == 'function') {
            this.firstFuncs.push(callback);
        }
    };
    forearch.prototype.end = function (callback) {
        if (typeof (callback) == 'function') {
            this.endFuncs.push(callback);
        }
    };
    forearch.prototype.thisParcourWithFunc = function () {
        var _this = this;
        this.callFunction(this.data[this.compteur], function (res) {
            var isReady = true;
            if (_this.compteur == 0 && _this.firstFuncs.length > 0) {
                isReady = false;
                for (var a = 0; a < _this.firstFuncs.length; a++) {
                    if (typeof (_this.firstFuncs[a]) == 'function') {
                        _this.firstFuncs[a](res, _this.data[_this.compteur]);
                    }
                }
            }
            ;
            if ((_this.compteur >= _this.parcour - 1 && _this.endFuncs.length == 0) || (_this.compteur < _this.parcour - 1 && isReady)) {
                isReady = false;
                for (var a = 0; a < _this.progressFuncs.length; a++) {
                    if (typeof (_this.progressFuncs[a]) == 'function') {
                        _this.progressFuncs[a](res, _this.data[_this.compteur]);
                    }
                }
            }
            _this.compteur++;
            if (_this.compteur >= _this.parcour) {
                if (isReady) {
                    for (var a = 0; a < _this.endFuncs.length; a++) {
                        if (typeof (_this.endFuncs[a]) == 'function') {
                            _this.endFuncs[a](res, _this.data[_this.compteur - 1]);
                        }
                    }
                }
            }
            else {
                _this.thisParcourWithFunc();
            }
        });
    };
    //Lancement du foreach
    forearch.prototype.run = function () {
        if (this.data.length == 0) {
            for (var a = 0; a < this.endFuncs.length; a++) {
                if (typeof (this.endFuncs[a]) == 'function') {
                    this.endFuncs[a](null);
                }
            }
            return true;
        }
        this.parcour = this.data.length;
        this.compteur = 0;
        if (typeof (this.callFunction) == 'function') {
            this.thisParcourWithFunc();
        }
        else {
            for (var i = 0; i < this.parcour; i++) {
                var isReady = true;
                if (i == 0 && this.firstFuncs.length > 0) {
                    isReady = false;
                    for (var a = 0; a < this.firstFuncs.length; a++) {
                        if (typeof (this.firstFuncs[a]) == 'function') {
                            this.firstFuncs[a](this.data[i]);
                        }
                    }
                }
                ;
                if (isReady && i >= this.parcour - 1 && this.endFuncs.length > 0) {
                    isReady = false;
                    for (var a = 0; a < this.endFuncs.length; a++) {
                        if (typeof (this.endFuncs[a]) == 'function') {
                            this.endFuncs[a](this.data[i]);
                        }
                    }
                }
                if (isReady) {
                    for (var a = 0; a < this.progressFuncs.length; a++) {
                        if (typeof (this.progressFuncs[a]) == 'function') {
                            this.progressFuncs[a](this.data[i]);
                        }
                    }
                }
            }
        }
    };
    return forearch;
}());
function default_1(data, func) {
    return new forearch(data, func);
}
exports.default = default_1;
;
