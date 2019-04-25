/*
 * Tout les vocaux qui son enregistre dans la base de donner est enregistrer ICI 
 * et l'informarion du vocaux aussi. 
*/

import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
   
export interface VocauxAttributes {
    id?: number;
  	path?: string;
    size?: string;
    md5?: string;
};

export interface VocauxInstance extends Sequelize.Instance<VocauxAttributes>, VocauxAttributes {  
}; 

export const VocauxFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<VocauxInstance, VocauxAttributes> => {
  	const attributes: SequelizeAttributes<VocauxAttributes> = {
	    size: {
	        type: DataTypes.INTEGER
	    },
    	path: {
      		type: DataTypes.STRING
    	},
      md5: {
          type: DataTypes.STRING
      }
  	};
  	const Vocaux = sequelize.define<VocauxInstance, VocauxAttributes>('Vocaux', attributes);
    Vocaux.associate = models => {
        
    };
  	return Vocaux;
};