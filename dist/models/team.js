"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.TeamFactory = function (sequelize, DataTypes) {
    var attributes = {
        role: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN
        }
    };
    var Team = sequelize.define('Team', attributes);
    Team.associate = function (models) {
        Team.belongsTo(models.Infusionsoft);
        //Infusionsoft.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Team.belongsTo(models.User);
        /*Team.belongsToMany(models.User, {
            through: 'UserTeams',
            as: 'usersFromTeams'
        });*/
    };
    return Team;
};
