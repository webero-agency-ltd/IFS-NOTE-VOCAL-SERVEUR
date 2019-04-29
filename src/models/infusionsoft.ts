
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { UserInstance , UserAttributes } from './user';
import { NoteInstance , NoteAttributes } from './note';
   
export interface InfusionsoftAttributes {
    id?: number;
    name?: string;
    accessToken?: string;
    unique?: string;
  	urlid?: string;
};

export interface InfusionsoftInstance extends Sequelize.Instance<InfusionsoftAttributes>, InfusionsoftAttributes { 
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

export const InfusionsoftFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<InfusionsoftInstance, InfusionsoftAttributes> => {
  	const attributes: SequelizeAttributes<InfusionsoftAttributes> = {
    	name: {
      		type: DataTypes.STRING
    	},
      accessToken: {
          type: DataTypes.TEXT
      },
      unique: {
          type: DataTypes.STRING
      },
      urlid: {
          type: DataTypes.STRING
      }
  	};
  	const Infusionsoft = sequelize.define<InfusionsoftInstance, InfusionsoftAttributes>('Infusionsoft', attributes);
    Infusionsoft.associate = models => {
        Infusionsoft.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Infusionsoft.hasMany(models.Note);
    };
  	return Infusionsoft;
};