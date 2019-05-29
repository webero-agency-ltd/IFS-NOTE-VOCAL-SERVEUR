"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.PourFactory = function (sequelize, DataTypes) {
    var attributes = {
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        appId: {
            type: DataTypes.STRING
        },
        cardId: {
            type: DataTypes.STRING
        }
    };
    var Pour = sequelize.define('Pour', attributes);
    Pour.associate = function (models) {
        Pour.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Pour.belongsTo(models.Application);
    };
    return Pour;
};
