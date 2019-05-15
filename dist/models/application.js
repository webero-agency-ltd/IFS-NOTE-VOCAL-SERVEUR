"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.ApplicationFactory = function (sequelize, DataTypes) {
    var attributes = {
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING
        },
        accessToken: {
            type: DataTypes.TEXT
        },
        unique: {
            type: DataTypes.STRING
        },
        compteId: {
            type: DataTypes.STRING
        }
    };
    var Application = sequelize.define('Application', attributes);
    Application.associate = function (models) {
        Application.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Application.hasMany(models.Note);
    };
    return Application;
};
