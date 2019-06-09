
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { UserInstance , UserAttributes } from './user';
import { NoteInstance , NoteAttributes } from './note';
import { PourInstance , PourAttributes } from './pour';
   
export interface ApplicationAttributes {
    id?: number;
    name?: string;
    type?: string;
    url?: string;
    accessToken?: string;
    unique?: string;
  	compteId?: string;
};

export interface ApplicationInstance extends Sequelize.Instance<ApplicationAttributes>, ApplicationAttributes { 
    getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes,UserInstance>; 

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

export const ApplicationFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ApplicationInstance, ApplicationAttributes> => {
  	const attributes: SequelizeAttributes<ApplicationAttributes> = {
    	name: {
          type: DataTypes.STRING
      },
      type: {
          type: DataTypes.STRING
      },
      url: {
          type: DataTypes.TEXT
      },
      accessToken: {
          type: DataTypes.TEXT
      },
      unique: {
          type: DataTypes.STRING
      },
      compteId: {
          type: DataTypes.STRING
      }
  	};
  	const Application = sequelize.define<ApplicationInstance, ApplicationAttributes>('Application', attributes);
    Application.associate = models => {
        Application.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Application.hasMany(models.Note);
    };
  	return Application;
};