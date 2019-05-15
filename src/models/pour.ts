/*
 * Tout les vocaux qui son enregistre dans la base de donner est enregistrer ICI 
 * et l'informarion du vocaux aussi. 
*/
 //@todo : Relier a un compte application trello 
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { UserInstance , UserAttributes } from './user';
   
export interface PourAttributes {
    id?: number;
  	name?: string;
    type?: string;
    appId?: string;
    cardId?: string;
};

export interface PourInstance extends Sequelize.Instance<PourAttributes>, PourAttributes {  
    getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes,UserInstance>; 
}; 

export const PourFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PourInstance, PourAttributes> => {
  	const attributes: SequelizeAttributes<PourAttributes> = {
	    name: {
	        type: DataTypes.STRING
	    },
    	type: {
      		type: DataTypes.STRING
    	},
      appId: {
          type: DataTypes.STRING
      },
      cardId: {
          type: DataTypes.STRING
      }
  	};
  	const Pour = sequelize.define<PourInstance, PourAttributes>('Pour', attributes);
    Pour.associate = models => {
        Pour.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' }); 
    };
  	return Pour;
};