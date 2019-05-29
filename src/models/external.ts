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

    };
  	return External;
};