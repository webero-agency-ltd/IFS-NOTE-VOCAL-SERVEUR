
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { NoteInstance , NoteAttributes } from './note';
   
export interface FormAttributes {
    id?: number;
    name?: string;
    type?: string;
    value?: string;
};

export interface FormInstance extends Sequelize.Instance<FormAttributes>, FormAttributes { 

};  

export const FormFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<FormInstance, FormAttributes> => {
  	const attributes: SequelizeAttributes<FormAttributes> = {
    	name: {
          type: DataTypes.STRING
      },
      type: {
          type: DataTypes.STRING
      },
      value: {
          type: DataTypes.TEXT
      }
  	};
  	const Form = sequelize.define<FormInstance, FormAttributes>('Form', attributes);
    Form.associate = models => {
        //Form.belongsTo( models.Note );
    };
  	return Form;
};