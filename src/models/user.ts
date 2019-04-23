import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { NoteInstance , NoteAttributes } from './note';

export interface UserAttributes {
  	id?: number;
    full_name?: string;
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

}; 

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  	const attributes: SequelizeAttributes<UserAttributes> = {
	    full_name: {
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
	};
  	return User;
};