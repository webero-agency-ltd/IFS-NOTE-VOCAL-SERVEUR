"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("../libs/api"));
var infusionsoft = /** @class */ (function () {
    function infusionsoft() {
        this.stade = {
            contacts: [],
        };
    }
    /*
     * Récupèration de tout les boards de trello
    */
    infusionsoft.prototype.allContact = function (id) {
        var _a = yield api_1.default('/infusionsoft/contacts/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.contacts = data.slice();
        return [null, this.stade.contacts];
    };
    return infusionsoft;
}());
