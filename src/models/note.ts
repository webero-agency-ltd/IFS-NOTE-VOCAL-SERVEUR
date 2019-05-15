/*
 * Enregistrement des inforations des notes qui a été crée avec la relation
*/
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { UserInstance , UserAttributes } from './user';
import { ApplicationInstance , ApplicationAttributes } from './application';
   
export interface NoteAttributes {
    id?: number;
  	title?: string;
    text?: string;
    type?: string;
    unique?: string;
    createdAt?: Date;
  	updatedAt?: Date;
};

export interface NoteInstance extends Sequelize.Instance<NoteAttributes>, NoteAttributes {  

    getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes,UserInstance>;

    getApplication: Sequelize.BelongsToGetAssociationMixin<ApplicationInstance>;
    setApplication: Sequelize.BelongsToSetAssociationMixin<ApplicationInstance, ApplicationInstance['id']>;
    createApplication: Sequelize.BelongsToCreateAssociationMixin<ApplicationAttributes,ApplicationInstance>;
}; 

export const NoteFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<NoteInstance, NoteAttributes> => {
  	const attributes: SequelizeAttributes<NoteAttributes> = {
	    title: {
	        type: DataTypes.STRING 
	    },
    	text: {
          type: DataTypes.TEXT
      },
      unique: { 
          type: DataTypes.STRING
      },
      type: { 
          type: DataTypes.STRING
      },
  	}; 
  	const Note = sequelize.define<NoteInstance, NoteAttributes>('Note', attributes);
    Note.associate = models => {
        Note.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Note.belongsTo(models.Vocaux);
        Note.belongsTo(models.Application);
    };
  	return Note;
};