import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../models/user';
import { NoteAttributes, NoteInstance } from '../models/note';
import { VocauxAttributes, VocauxInstance } from '../models/vocaux';
import { ApplicationAttributes, ApplicationInstance } from '../models/application';
import { TeamAttributes, TeamInstance } from '../models/team';
import { ExternalAttributes, ExternalInstance } from '../models/external';
import { PourAttributes, PourInstance } from '../models/pour';

export interface DBInterface {
  	sequelize: Sequelize.Sequelize;
  	Sequelize: Sequelize.SequelizeStatic;
  	User: Sequelize.Model<UserInstance, UserAttributes>;
  	Note: Sequelize.Model<NoteInstance, NoteAttributes>;
  	Vocaux: Sequelize.Model<VocauxInstance, VocauxAttributes>;
  	Application: Sequelize.Model<ApplicationInstance, ApplicationAttributes>;
  	Team: Sequelize.Model<TeamInstance, TeamAttributes>;
  	External: Sequelize.Model<ExternalInstance, ExternalAttributes>;
  	Pour: Sequelize.Model<PourInstance, PourAttributes>;
}