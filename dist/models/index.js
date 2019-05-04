"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var user_1 = require("./user");
var note_1 = require("./note");
var vocaux_1 = require("./vocaux");
var infusionsoft_1 = require("./infusionsoft");
var team_1 = require("./team");
exports.createModels = function (sequelizeConfig) {
    var database = sequelizeConfig.database, username = sequelizeConfig.username, password = sequelizeConfig.password, params = sequelizeConfig.params;
    var sequelize = new sequelize_1.default(database, username, password, params);
    var db = {
        sequelize: sequelize,
        Sequelize: sequelize_1.default,
        User: user_1.UserFactory(sequelize, sequelize_1.default),
        Note: note_1.NoteFactory(sequelize, sequelize_1.default),
        Vocaux: vocaux_1.VocauxFactory(sequelize, sequelize_1.default),
        Infusionsoft: infusionsoft_1.InfusionsoftFactory(sequelize, sequelize_1.default),
        Team: team_1.TeamFactory(sequelize, sequelize_1.default),
    };
    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    return db;
};