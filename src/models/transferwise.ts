/*
 * Tout les traitements sur transwise 
*/

import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { UserInstance , UserAttributes } from './user';
   
export interface TransferwiseAttributes {
    id?: number;
  	name?: string;
    token?: string;
};

export interface TransferwiseInstance extends Sequelize.Instance<TransferwiseAttributes>, TransferwiseAttributes {  

}; 

export const TransferwiseFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TransferwiseInstance, TransferwiseAttributes> => {
  	const attributes: SequelizeAttributes<TransferwiseAttributes> = {
	    name: {
	        type: DataTypes.STRING
	    },
    	token: {
      		type: DataTypes.STRING
    	}
  	};
  	const Transferwise = sequelize.define<TransferwiseInstance, TransferwiseAttributes>('Transferwise', attributes);
    Transferwise.associate = models => {
    };
  	return Transferwise;
};