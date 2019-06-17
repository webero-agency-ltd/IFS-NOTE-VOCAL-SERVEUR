"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
exports.FormFactory = function (sequelize, DataTypes) {
    var attributes = {
        name: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.TEXT
        }
    };
    var Form = sequelize.define('Form', attributes);
    Form.associate = function (models) {
        //Form.belongsTo( models.Note );
    };
    return Form;
};
