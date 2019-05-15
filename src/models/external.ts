/*
 * Tout les vocaux qui son enregistre dans la base de donner est enregistrer ICI 
 * et l'informarion du vocaux aussi. 
*/

import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { UserInstance , UserAttributes } from './user';
   
export interface ExternalAttributes {
    id?: number;
  	infusionsoft?: string;
    trello?: string;
};

export interface ExternalInstance extends Sequelize.Instance<ExternalAttributes>, ExternalAttributes {  
    getAuthor: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setAuthor: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createAuthor: Sequelize.BelongsToCreateAssociationMixin<UserAttributes,UserInstance>; 
}; 

export const ExternalFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<ExternalInstance, ExternalAttributes> => {
  	const attributes: SequelizeAttributes<ExternalAttributes> = {
	    infusionsoft: {
	        type: DataTypes.INTEGER
	    },
    	trello: {
      		type: DataTypes.STRING
    	}
  	};
  	const External = sequelize.define<ExternalInstance, ExternalAttributes>('External', attributes);
    External.associate = models => {
        External.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
    };
  	return External;
};