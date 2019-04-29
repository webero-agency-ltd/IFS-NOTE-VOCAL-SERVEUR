import Sequelize from 'sequelize';
import { DBInterface } from '../interface/DBInterface';
import { UserFactory } from './user';
import { NoteFactory } from './note';
import { VocauxFactory } from './vocaux';
import { InfusionsoftFactory } from './infusionsoft';
import { TeamFactory } from './team';

export const createModels = (sequelizeConfig: any): DBInterface => {
    const { database, username, password, params } = sequelizeConfig;
    const sequelize = new Sequelize(database, username, password, params);
    const db: DBInterface = {
        sequelize,
        Sequelize,
        User: UserFactory(sequelize, Sequelize),
        Note: NoteFactory(sequelize, Sequelize),
        Vocaux: VocauxFactory(sequelize, Sequelize),
        Infusionsoft: InfusionsoftFactory(sequelize, Sequelize),
        Team: TeamFactory(sequelize, Sequelize),
    };
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    return db;
};