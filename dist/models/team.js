"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.TeamFactory = function (sequelize, DataTypes) {
    var attributes = {
        role: {
            type: DataTypes.STRING
        },
        contactid: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN
        }
    };
    var Team = sequelize.define('Team', attributes);
    Team.associate = function (models) {
        Team.belongsTo(models.Application);
        Team.belongsTo(models.User);
    };
    return Team;
};
