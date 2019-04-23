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
    };
    var Note = sequelize.define('Note', attributes);
    Note.associate = function (models) {
        Note.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Note.belongsTo(models.Vocaux);
    };
    return Note;
};
