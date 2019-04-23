"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.UserFactory = function (sequelize, DataTypes) {
    var attributes = {
        full_name: {
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
    };
    return User;
};
