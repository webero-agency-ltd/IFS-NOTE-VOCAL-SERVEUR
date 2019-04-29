import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { NoteInstance , NoteAttributes } from './note';
import { InfusionsoftInstance , InfusionsoftAttributes } from './infusionsoft';
import { TeamInstance , TeamAttributes } from './team';

export interface UserAttributes {
  	id?: number;
    fullname?: string;
  	email: string;
    password: any;
    role: string;
  	rememberToken?: string;
  	createdAt?: Date;
  	updatedAt?: Date;
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {  

	getNotes: Sequelize.HasManyGetAssociationsMixin<NoteInstance>;
	setNotes: Sequelize.HasManySetAssociationsMixin<NoteInstance, NoteInstance['id']>;
	addNotes: Sequelize.HasManyAddAssociationsMixin<NoteInstance, NoteInstance['id']>;
	addNote: Sequelize.HasManyAddAssociationMixin<NoteInstance, NoteInstance['id']>;
	createNote: Sequelize.HasManyCreateAssociationMixin<NoteAttributes, NoteInstance>;
	removeNote: Sequelize.HasManyRemoveAssociationMixin<NoteInstance, NoteInstance['id']>;
	removeNotes: Sequelize.HasManyRemoveAssociationsMixin<NoteInstance, NoteInstance['id']>;
	hasNote: Sequelize.HasManyHasAssociationMixin<NoteInstance, NoteInstance['id']>;
	hasNotes: Sequelize.HasManyHasAssociationsMixin<NoteInstance, NoteInstance['id']>;
	countNotes: Sequelize.HasManyCountAssociationsMixin;

  getInfusionsofts: Sequelize.HasManyGetAssociationsMixin<InfusionsoftInstance>;
  setInfusionsofts: Sequelize.HasManySetAssociationsMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
  addInfusionsofts: Sequelize.HasManyAddAssociationsMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
  addInfusionsoft: Sequelize.HasManyAddAssociationMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
  createInfusionsoft: Sequelize.HasManyCreateAssociationMixin<InfusionsoftAttributes, InfusionsoftInstance>;
  removeInfusionsoft: Sequelize.HasManyRemoveAssociationMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
  removeInfusionsofts: Sequelize.HasManyRemoveAssociationsMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
  hasInfusionsoft: Sequelize.HasManyHasAssociationMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
  hasInfusionsofts: Sequelize.HasManyHasAssociationsMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
  countInfusionsofts: Sequelize.HasManyCountAssociationsMixin;

  getTeams: Sequelize.HasManyGetAssociationsMixin<TeamInstance>;
  setTeams: Sequelize.HasManySetAssociationsMixin<TeamInstance, TeamInstance['id']>;
  addTeams: Sequelize.HasManyAddAssociationsMixin<TeamInstance, TeamInstance['id']>;
  addTeam: Sequelize.HasManyAddAssociationMixin<TeamInstance, TeamInstance['id']>;
  createTeam: Sequelize.HasManyCreateAssociationMixin<TeamAttributes, TeamInstance>;
  removeTeam: Sequelize.HasManyRemoveAssociationMixin<TeamInstance, TeamInstance['id']>;
  removeTeams: Sequelize.HasManyRemoveAssociationsMixin<TeamInstance, TeamInstance['id']>;
  hasTeam: Sequelize.HasManyHasAssociationMixin<TeamInstance, TeamInstance['id']>;
  hasTeams: Sequelize.HasManyHasAssociationsMixin<TeamInstance, TeamInstance['id']>;
  countTeams: Sequelize.HasManyCountAssociationsMixin;

 /* getTeamsFromUsers: Sequelize.BelongsToManyGetAssociationsMixin<TeamInstance>;
  setTeamsFromUsers: Sequelize.BelongsToManySetAssociationsMixin<TeamInstance, TeamInstance['id'], 'PostUpvotes'>;
  addTeamsFromUsers: Sequelize.BelongsToManyAddAssociationsMixin<TeamInstance, TeamInstance['id'], 'PostUpvotes'>;
  addTeamsFromUser: Sequelize.BelongsToManyAddAssociationMixin<TeamInstance, TeamInstance['id'], 'PostUpvotes'>;
  createTeamsFromUser: Sequelize.BelongsToManyCreateAssociationMixin<TeamAttributes, TeamInstance['id'], 'PostUpvotes'>;
  removeTeamsFromUser: Sequelize.BelongsToManyRemoveAssociationMixin<TeamInstance, TeamInstance['id']>;
  removeTeamsFromUsers: Sequelize.BelongsToManyRemoveAssociationsMixin<TeamInstance, TeamInstance['id']>;
  hasTeamsFromUser: Sequelize.BelongsToManyHasAssociationMixin<TeamInstance, TeamInstance['id']>;
  hasTeamsFromUsers: Sequelize.BelongsToManyHasAssociationsMixin<TeamInstance, TeamInstance['id']>;
  countTeamsFromUsers: Sequelize.BelongsToManyCountAssociationsMixin;*/

}; 

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  	const attributes: SequelizeAttributes<UserAttributes> = {
	    fullname: {
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
  	const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);
  	User.associate = models => {
      User.hasMany(models.Note, { foreignKey: 'AuthorId' });
      User.hasMany(models.Infusionsoft, { foreignKey: 'AuthorId' });
	    User.hasMany(models.Team);
      /*User.belongsToMany(models.Team, {
        through: 'UserTeams',
        as: 'teamsFromUsers'
      });*/
	};
  	return User;
};