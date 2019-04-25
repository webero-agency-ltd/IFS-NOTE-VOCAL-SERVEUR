"use strict";
/*
 * Tout les vocaux qui son enregistre dans la base de donner est enregistrer ICI
 * et l'informarion du vocaux aussi.
*/
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.VocauxFactory = function (sequelize, DataTypes) {
    var attributes = {
        size: {
            type: DataTypes.INTEGER
        },
        path: {
            type: DataTypes.STRING
        },
        md5: {
            type: DataTypes.STRING
        }
    };
    var Vocaux = sequelize.define('Vocaux', attributes);
    Vocaux.associate = function (models) {
    };
    return Vocaux;
};
