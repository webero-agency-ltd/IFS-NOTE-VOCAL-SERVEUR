"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.InfusionsoftFactory = function (sequelize, DataTypes) {
    var attributes = {
        name: {
            type: DataTypes.STRING
        },
        accessToken: {
            type: DataTypes.TEXT
        },
        unique: {
            type: DataTypes.STRING
        },
        urlid: {
            type: DataTypes.STRING
        }
    };
    var Infusionsoft = sequelize.define('Infusionsoft', attributes);
    Infusionsoft.associate = function (models) {
        Infusionsoft.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Infusionsoft.hasMany(models.Note);
    };
    return Infusionsoft;
};
