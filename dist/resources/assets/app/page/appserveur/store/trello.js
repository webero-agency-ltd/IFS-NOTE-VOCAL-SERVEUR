"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = __importDefault(require("../libs/api"));
var trello = /** @class */ (function () {
    function trello() {
        this.stade = {
            boards: [],
            lists: [],
            labels: [],
        };
    }
    /*
     * Récupèration de tout les boards de trello
    */
    trello.prototype.allBoard = function (id) {
        var _a = yield api_1.default('/trello/boards/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.boards = data.map(function (_a) {
            var id = _a.id, name = _a.name, url = _a.url;
            return { id: id, title: name, url: url };
        });
        return [null, this.stade.boards];
    };
    /*
     * Récupération de tout les label de trello
    */
    trello.prototype.allList = function (id) {
        var _a = yield api_1.default('/trello/lists/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.lists = data.map(function (_a) {
            var id = _a.id, name = _a.name;
            return { value: id, text: name };
        });
        return [null, this.stade.lists];
    };
    /*
     * Récupération de label de trello
    */
    trello.prototype.allLabel = function (id) {
        var _a = yield api_1.default('/trello/label/' + id), err = _a[0], data = _a[1].data;
        if (err)
            return [err, null];
        this.stade.labels = data.map(function (_a) {
            var id = _a.id, name = _a.name;
            return { value: id, text: name };
        });
        return [null, this.stade.labels];
    };
    return trello;
}());
