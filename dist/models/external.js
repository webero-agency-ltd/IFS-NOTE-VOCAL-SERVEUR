"use strict";
/*
 * Tout les vocaux qui son enregistre dans la base de donner est enregistrer ICI
 * et l'informarion du vocaux aussi.
*/
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.ExternalFactory = function (sequelize, DataTypes) {
    var attributes = {
        infusionsoft: {
            type: DataTypes.INTEGER
        },
        trello: {
            type: DataTypes.STRING
        }
    };
    var External = sequelize.define('External', attributes);
    External.associate = function (models) {
        External.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
    };
    return External;
};
