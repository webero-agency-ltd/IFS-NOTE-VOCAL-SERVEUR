import Sequelize from 'sequelize';
import { DBInterface } from '../interface/DBInterface';
import { UserFactory } from './user';
import { NoteFactory } from './note';
import { VocauxFactory } from './vocaux';
import { ApplicationFactory } from './application';
import { TeamFactory } from './team';
import { ExternalFactory } from './external';
import { PourFactory } from './pour';
import { FormFactory } from './form';

export const createModels = (sequelizeConfig: any): DBInterface => {
    const { database, username, password, params } = sequelizeConfig;
    const sequelize = new Sequelize(database, username, password, params);
    const db: DBInterface = {
        sequelize,
        Sequelize,
        User: UserFactory(sequelize, Sequelize),
        Note: NoteFactory(sequelize, Sequelize),
        Vocaux: VocauxFactory(sequelize, Sequelize),
        Application: ApplicationFactory(sequelize, Sequelize), 
        Team: TeamFactory(sequelize, Sequelize),
        External: ExternalFactory(sequelize, Sequelize),
        Pour: PourFactory(sequelize, Sequelize),
        Form: FormFactory(sequelize, Sequelize),
    };
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    return db;
};