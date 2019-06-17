"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var user_1 = require("./user");
var note_1 = require("./note");
var vocaux_1 = require("./vocaux");
var application_1 = require("./application");
var team_1 = require("./team");
var external_1 = require("./external");
var pour_1 = require("./pour");
var form_1 = require("./form");
exports.createModels = function (sequelizeConfig) {
    var database = sequelizeConfig.database, username = sequelizeConfig.username, password = sequelizeConfig.password, params = sequelizeConfig.params;
    var sequelize = new sequelize_1.default(database, username, password, params);
    var db = {
        sequelize: sequelize,
        Sequelize: sequelize_1.default,
        User: user_1.UserFactory(sequelize, sequelize_1.default),
        Note: note_1.NoteFactory(sequelize, sequelize_1.default),
        Vocaux: vocaux_1.VocauxFactory(sequelize, sequelize_1.default),
        Application: application_1.ApplicationFactory(sequelize, sequelize_1.default),
        Team: team_1.TeamFactory(sequelize, sequelize_1.default),
        External: external_1.ExternalFactory(sequelize, sequelize_1.default),
        Pour: pour_1.PourFactory(sequelize, sequelize_1.default),
        Form: form_1.FormFactory(sequelize, sequelize_1.default),
    };
    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    return db;
};
