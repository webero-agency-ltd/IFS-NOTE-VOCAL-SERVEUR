"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.UserFactory = function (sequelize, DataTypes) {
    var attributes = {
        fullname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        rememberToken: {
            type: DataTypes.STRING
        },
    };
    var User = sequelize.define('User', attributes);
    User.associate = function (models) {
        User.hasMany(models.Note, { foreignKey: 'AuthorId' });
        User.hasMany(models.Infusionsoft, { foreignKey: 'AuthorId' });
        User.hasMany(models.Team);
        /*User.belongsToMany(models.Team, {
          through: 'UserTeams',
          as: 'teamsFromUsers'
        });*/
    };
    return User;
};
