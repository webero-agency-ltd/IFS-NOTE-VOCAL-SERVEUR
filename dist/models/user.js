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
        User.hasMany(models.Application, { foreignKey: 'AuthorId' });
        User.hasMany(models.Team);
        User.hasMany(models.Pour, { foreignKey: 'AuthorId' });
        /*User.belongsToMany(models.Team, {
          through: 'UserTeams',
          as: 'teamsFromUsers'
        });*/
    };
    return User;
};
