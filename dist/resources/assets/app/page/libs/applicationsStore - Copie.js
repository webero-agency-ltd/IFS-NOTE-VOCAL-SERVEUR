"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var applicationsStore = /** @class */ (function (_super) {
    __extends(applicationsStore, _super);
    function applicationsStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //récupération de vos liste d'application 
    applicationsStore.prototype.finds = function () {
        var url = window.urlapplication + '/application/item/' + this.$route.params.id;
        var find = yield fetch(url);
        if (find.ok) {
            var data = yield find.json();
            this.application = data;
        }
    };
    //récupération de l'url de demande d'authorisation d'application 
    applicationsStore.prototype.authorize = function () {
        var url = window.urlapplication + '/application/reauthorize/' + this.application.type + '/' + this.application.id;
        var find = yield fetch(url);
        if (find.ok) {
            var data = yield find.json();
            if (data.success) {
                var win = window.open(data.success, '_blank');
                win.focus();
            }
        }
    };
    return applicationsStore;
}(Store));
exports.default = applicationsStore;
