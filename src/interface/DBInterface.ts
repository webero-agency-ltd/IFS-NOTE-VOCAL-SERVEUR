import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../models/user';
import { NoteAttributes, NoteInstance } from '../models/note';
import { VocauxAttributes, VocauxInstance } from '../models/vocaux';
import { InfusionsoftAttributes, InfusionsoftInstance } from '../models/infusionsoft';
import { TeamAttributes, TeamInstance } from '../models/team';

export interface DBInterface {
  	sequelize: Sequelize.Sequelize;
  	Sequelize: Sequelize.SequelizeStatic;
  	User: Sequelize.Model<UserInstance, UserAttributes>;
  	Note: Sequelize.Model<NoteInstance, NoteAttributes>;
  	Vocaux: Sequelize.Model<VocauxInstance, VocauxAttributes>;
  	Infusionsoft: Sequelize.Model<InfusionsoftInstance, InfusionsoftAttributes>;
  	Team: Sequelize.Model<TeamInstance, TeamAttributes>;
}