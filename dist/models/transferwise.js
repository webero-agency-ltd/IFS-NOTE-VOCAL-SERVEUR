"use strict";
/*
 * Tout les traitements sur transwise
*/
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.TransferwiseFactory = function (sequelize, DataTypes) {
    var attributes = {
        name: {
            type: DataTypes.STRING
        },
        token: {
            type: DataTypes.STRING
        }
    };
    var Transferwise = sequelize.define('Transferwise', attributes);
    Transferwise.associate = function (models) {
    };
    return Transferwise;
};
