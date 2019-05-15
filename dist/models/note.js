"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.NoteFactory = function (sequelize, DataTypes) {
    var attributes = {
        title: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.TEXT
        },
        unique: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
    };
    var Note = sequelize.define('Note', attributes);
    Note.associate = function (models) {
        Note.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Note.belongsTo(models.Vocaux);
        Note.belongsTo(models.Application);
    };
    return Note;
};
